from sqlalchemy.orm import Session
from app.models.student import Student
from app.models.attendance import Attendance
from app.models.academic import AcademicRecord
from app.models.assignment import AssignmentSubmission, AssignmentStatus
from app.models.fee import Fee, FeeStatus
from app.models.intervention import Intervention, InterventionStatus
from app.models.signal import Signal, SignalSeverity, SignalStatus
from datetime import datetime, timedelta

def attendance_rate(db: Session, student_id: int, weeks: int = 4) -> float:
    cutoff = datetime.utcnow() - timedelta(days=weeks*7)
    records = db.query(Attendance).filter(Attendance.student_id == student_id, Attendance.date >= cutoff.date()).all()
    if not records:
        return 1.0
    present = sum(1 for r in records if r.status in ["present", "late"])
    return present / len(records)

def late_count(db: Session, student_id: int, weeks: int = 2) -> int:
    cutoff = datetime.utcnow() - timedelta(days=weeks*7)
    return db.query(Attendance).filter(Attendance.student_id == student_id, Attendance.date >= cutoff.date(), Attendance.status == "late").count()

def generate_signals(db: Session):
    students = db.query(Student).all()
    
    for student in students:
        # Check Attendance Decline
        rate = attendance_rate(db, student.id, 4)
        if rate < 0.85:
            existing = db.query(Signal).filter(Signal.entity_id == student.id, Signal.signal_type == 'attendance_decline', Signal.status == SignalStatus.open).first()
            if not existing:
                sig = Signal(
                    signal_type='attendance_decline',
                    severity=SignalSeverity.high,
                    entity_type='student',
                    entity_id=student.id,
                    title=f'Attendance decline detected for {student.first_name} {student.last_name}',
                    description='Attendance is below 85% over the past 4 weeks.',
                    explanation=f'Attendance has declined to {rate*100:.1f}% over the past 4 weeks.',
                    trigger_data={"rate": rate},
                )
                db.add(sig)
        
        # Check Repeated Late
        lates = late_count(db, student.id, 2)
        if lates >= 3:
            existing = db.query(Signal).filter(Signal.entity_id == student.id, Signal.signal_type == 'repeated_late', Signal.status == SignalStatus.open).first()
            if not existing:
                sig = Signal(
                    signal_type='repeated_late',
                    severity=SignalSeverity.medium,
                    entity_type='student',
                    entity_id=student.id,
                    title=f'Repeated late arrivals for {student.first_name} {student.last_name}',
                    description='3 or more late arrivals in the past 2 weeks.',
                    explanation=f'{lates} late arrivals recorded in the past 2 weeks.',
                    trigger_data={"late_count": lates},
                )
                db.add(sig)
        
        # Check Academic Trend
        # Need to check across terms. Simplification for now: check latest 2 terms if they exist.
        academic_records = db.query(AcademicRecord).filter(AcademicRecord.student_id == student.id).order_by(AcademicRecord.term.desc()).all()
        # Group by subject
        subject_scores = {}
        for r in academic_records:
            if r.subject_id not in subject_scores:
                subject_scores[r.subject_id] = []
            subject_scores[r.subject_id].append(r)
            
        for subj_id, records in subject_scores.items():
            if len(records) >= 2:
                # Assuming records[0] is latest term, records[1] is previous
                latest = records[0].score
                previous = records[1].score
                if previous - latest > 15:
                    existing = db.query(Signal).filter(Signal.entity_id == student.id, Signal.signal_type == 'academic_decline', Signal.status == SignalStatus.open).first()
                    if not existing:
                        db.add(Signal(
                            signal_type='academic_decline',
                            severity=SignalSeverity.high,
                            entity_type='student',
                            entity_id=student.id,
                            title=f'Academic decline detected for {student.first_name}',
                            description='Score dropped by >15% between terms.',
                            explanation=f'Score dropped from {previous} to {latest}.',
                            trigger_data={"latest": latest, "previous": previous}
                        ))
        
        # Check Missing Assignments
        cutoff_2w = datetime.utcnow() - timedelta(days=14)
        from app.models.assignment import Assignment
        missing_count = db.query(AssignmentSubmission).join(Assignment).filter(
            AssignmentSubmission.student_id == student.id, 
            AssignmentSubmission.status == 'missing',
            Assignment.due_date >= cutoff_2w.date()
        ).count()
        if missing_count >= 3:
            existing = db.query(Signal).filter(Signal.entity_id == student.id, Signal.signal_type == 'assignment_incomplete', Signal.status == SignalStatus.open).first()
            if not existing:
                db.add(Signal(
                    signal_type='assignment_incomplete',
                    severity=SignalSeverity.medium,
                    entity_type='student',
                    entity_id=student.id,
                    title=f'Missing assignments for {student.first_name}',
                    description='3 or more missing assignments in last 2 weeks.',
                    explanation=f'{missing_count} missing assignments recently.',
                    trigger_data={"count": missing_count}
                ))
                
    # Check Fees
    cutoff_30d = datetime.utcnow() - timedelta(days=30)
    overdue_fees = db.query(Fee).filter(Fee.status == 'overdue', Fee.due_date <= cutoff_30d.date()).all()
    for fee in overdue_fees:
        existing = db.query(Signal).filter(Signal.entity_id == fee.id, Signal.signal_type == 'fee_overdue', Signal.status == SignalStatus.open).first()
        if not existing:
            db.add(Signal(
                signal_type='fee_overdue',
                severity=SignalSeverity.medium,
                entity_type='fee',
                entity_id=fee.id,
                title=f'Fee overdue > 30 days',
                description='Fee is significantly overdue.',
                explanation='Fee is overdue for more than 30 days.',
                trigger_data={"fee_id": fee.id}
            ))
            
    # Check Interventions
    cutoff_14d = datetime.utcnow() - timedelta(days=14)
    old_interventions = db.query(Intervention).filter(Intervention.status == 'open', Intervention.created_at <= cutoff_14d).all()
    for inv in old_interventions:
        existing = db.query(Signal).filter(Signal.entity_id == inv.id, Signal.signal_type == 'unresolved_intervention', Signal.status == SignalStatus.open).first()
        if not existing:
            db.add(Signal(
                signal_type='unresolved_intervention',
                severity=SignalSeverity.low,
                entity_type='intervention',
                entity_id=inv.id,
                title=f'Unresolved intervention',
                description='Intervention open > 14 days.',
                explanation='This intervention has been open for more than 2 weeks.',
                trigger_data={"intervention_id": inv.id}
            ))
            
    # Check Communications
    # Assuming Communication model has created_at and is_read
    from app.models.communication import Communication
    cutoff_3d = datetime.utcnow() - timedelta(days=3)
    unread_comms = db.query(Communication).filter(Communication.is_read == False, Communication.created_at <= cutoff_3d).all()
    for comm in unread_comms:
        existing = db.query(Signal).filter(Signal.entity_id == comm.id, Signal.signal_type == 'communication_pending', Signal.status == SignalStatus.open).first()
        if not existing:
            db.add(Signal(
                signal_type='communication_pending',
                severity=SignalSeverity.low,
                entity_type='communication',
                entity_id=comm.id,
                title=f'Unread communication',
                description='Communication unread > 3 days.',
                explanation='This message has not been read for more than 3 days.',
                trigger_data={"communication_id": comm.id}
            ))

    db.commit()
