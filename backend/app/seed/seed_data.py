import random
from sqlalchemy.orm import Session
from datetime import date, timedelta, datetime
import json
from app.models.user import User, RoleEnum
from app.models.student import Student
from app.models.staff import Staff
from app.models.attendance import Attendance, AttendanceStatus
from app.models.subject import Subject
from app.models.academic import AcademicRecord
from app.models.assignment import Assignment, AssignmentSubmission, AssignmentStatus
from app.models.signal import Signal, SignalSeverity, SignalStatus
from app.models.intervention import Intervention, InterventionStatus, InterventionPriority
from app.models.communication import Communication
from app.models.fee import Fee, FeeStatus
from app.models.event import Event
from app.models.timetable import TimetableSlot
from app.models.observation import TeacherObservation
import math

FIRST_NAMES = ["James", "Sarah", "Priya", "Michael", "David", "Alex", "Emma", "Liam", "Olivia", "Noah", "William", "Ava", "Sophia", "Isabella", "Mia", "Oliver", "Elijah", "Lucas", "Mason", "Logan", "Alexander", "Ethan", "Jacob", "Michael", "Daniel", "Henry", "Jackson", "Sebastian", "Aiden", "Matthew", "Samuel", "David", "Joseph", "Carter", "Owen", "Wyatt", "John", "Jack", "Luke", "Jayden", "Dylan", "Grayson", "Levi", "Isaac", "Gabriel", "Julian", "Mateo", "Anthony", "Jaxon", "Lincoln", "Joshua", "Christopher", "Andrew", "Theodore", "Caleb", "Ryan", "Asher", "Nathan", "Thomas", "Leo", "Wei", "Li", "Min", "Chen", "Yong", "Hua", "Bo", "Mei", "Ling", "Jian", "Hassan", "Aisha", "Fatima", "Ali", "Omar", "Zainab", "Arjun", "Aditya", "Neha", "Rohan"]
LAST_NAMES = ["Chen", "Williams", "Sharma", "Torres", "Morgan", "Smith", "Johnson", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Tan", "Lim", "Ng", "Wong", "Goh", "Chua", "Ong", "Koh", "Teo", "Patel", "Singh", "Kumar", "Das", "Bose", "Rahman", "Hussain", "Ali", "Khan"]

def seed_db(db: Session):
    if db.query(User).count() > 0:
        print("Database already seeded.")
        return

    print("Seeding database...")
    random.seed(42)
    today = date.today()
    now = datetime.utcnow()

    # 1. Demo Accounts
    demo_users = [
        User(email="principal@northbridge.edu", name="Dr. James Chen", role=RoleEnum.principal),
        User(email="admin@northbridge.edu", name="Sarah Williams", role=RoleEnum.administrator),
        User(email="teacher@northbridge.edu", name="Ms. Priya Sharma", role=RoleEnum.teacher),
        User(email="finance@northbridge.edu", name="Michael Torres", role=RoleEnum.finance),
        User(email="parent@northbridge.edu", name="David Morgan", role=RoleEnum.parent)
    ]
    for u in demo_users:
        db.add(u)
    db.commit()

    principal = db.query(User).filter(User.email=="principal@northbridge.edu").first()
    admin_u = db.query(User).filter(User.email=="admin@northbridge.edu").first()
    teacher_u = db.query(User).filter(User.email=="teacher@northbridge.edu").first()
    finance_u = db.query(User).filter(User.email=="finance@northbridge.edu").first()
    parent_david = db.query(User).filter(User.email=="parent@northbridge.edu").first()

    # 2. Generate remaining Staff
    teachers = [teacher_u]
    for i in range(79):
        u = User(email=f"teacher{i}@northbridge.edu", name=f"{random.choice(FIRST_NAMES)} {random.choice(LAST_NAMES)}", role=RoleEnum.teacher)
        db.add(u)
        teachers.append(u)
    
    admins = [admin_u]
    for i in range(19):
        u = User(email=f"admin{i}@northbridge.edu", name=f"{random.choice(FIRST_NAMES)} {random.choice(LAST_NAMES)}", role=RoleEnum.administrator)
        db.add(u)
        admins.append(u)

    finances = [finance_u]
    for i in range(4):
        u = User(email=f"finance{i}@northbridge.edu", name=f"{random.choice(FIRST_NAMES)} {random.choice(LAST_NAMES)}", role=RoleEnum.finance)
        db.add(u)
        finances.append(u)
    
    db.commit()

    # Staff profiles
    for t in teachers:
        db.add(Staff(user_id=t.id, department="Academics", designation="Teacher", join_date=today - timedelta(days=random.randint(100, 2000)), subjects=json.dumps([]), grades_assigned=json.dumps([])))
    for a in admins:
        db.add(Staff(user_id=a.id, department="Administration", designation="Admin", join_date=today - timedelta(days=random.randint(100, 2000)), subjects=json.dumps([]), grades_assigned=json.dumps([])))
    for f in finances:
        db.add(Staff(user_id=f.id, department="Finance", designation="Finance Officer", join_date=today - timedelta(days=random.randint(100, 2000)), subjects=json.dumps([]), grades_assigned=json.dumps([])))
    db.commit()

    # 3. Subjects
    grade_levels = [6,7,8,9,10,11,12]
    subject_names = ["English", "Mathematics", "Science", "Social Studies", "Art", "Music", "Physical Education", "Second Language"]
    subjects_db = []
    
    for g in grade_levels:
        for sn in subject_names:
            s = Subject(name=sn, code=f"{sn[:3].upper()}{g}", grade=str(g), department="Academics", teacher_id=teachers[0].id)
            db.add(s)
            subjects_db.append(s)
    db.commit()

    # 4. Students & Parents (approx 200)
    sections = ["A", "B", "C"]
    
    student_alex = Student(
        first_name="Alex", last_name="Morgan", date_of_birth=date(2010, 5, 15), gender="Male", grade="8", section="B", 
        enrollment_date=date(2022, 1, 10), parent_id=parent_david.id, emergency_contact="98765432", nationality="American"
    )
    db.add(student_alex)
    db.commit()
    
    students_list = [student_alex]
    
    for g in grade_levels:
        for _ in range(28):
            if g == 8 and _ == 0: continue # Alex is here
            p = User(email=f"parent_{g}_{_}@example.com", name=f"{random.choice(FIRST_NAMES)} {random.choice(LAST_NAMES)}", role=RoleEnum.parent)
            db.add(p)
            db.flush()
            
            st = Student(
                first_name=random.choice(FIRST_NAMES),
                last_name=random.choice(LAST_NAMES),
                date_of_birth=today - timedelta(days=365*(g+5) + random.randint(0, 365)),
                gender=random.choice(["Male", "Female"]),
                grade=str(g),
                section=random.choice(sections),
                enrollment_date=today - timedelta(days=random.randint(100, 1000)),
                parent_id=p.id,
                emergency_contact="12345678",
                nationality="Singaporean"
            )
            db.add(st)
            students_list.append(st)
    db.commit()

    # 5. Attendance (60 days)
    # Alex: declining from 94% to 81%. Normal: 92-98%. Low: ~15 students 80-89%. Very Low: ~5 students <80%
    low_att_students = random.sample([s for s in students_list if s.id != student_alex.id], 15)
    vlow_att_students = random.sample([s for s in students_list if s.id not in [x.id for x in low_att_students] and s.id != student_alex.id], 5)
    
    for d in range(60):
        att_date = today - timedelta(days=d)
        if att_date.weekday() >= 5: continue
        
        for st in students_list:
            if st.id == student_alex.id:
                # older days = better attendance, recent days = worse
                prob = 0.94 if d > 28 else 0.70
                if d < 14 and random.random() < 0.4:
                    status = AttendanceStatus.late
                else:
                    status = AttendanceStatus.present if random.random() < prob else AttendanceStatus.absent
            elif st in vlow_att_students:
                status = AttendanceStatus.present if random.random() < 0.75 else AttendanceStatus.absent
            elif st in low_att_students:
                status = AttendanceStatus.present if random.random() < 0.85 else AttendanceStatus.absent
            else:
                status = AttendanceStatus.present if random.random() < 0.95 else AttendanceStatus.absent
                
            db.add(Attendance(student_id=st.id, date=att_date, status=status, marked_by=teachers[0].id))
    db.commit()

    # 6. Academic Records (Term 1, Term 2, Term 3)
    terms = ["Term 1", "Term 2", "Term 3"]
    declining_students = random.sample([s for s in students_list if s.id != student_alex.id], 10)
    
    for st in students_list:
        my_subjects = [s for s in subjects_db if s.grade == st.grade]
        for subj in my_subjects:
            base_score = random.randint(70, 95)
            for i, term in enumerate(terms):
                score = base_score + random.randint(-5, 5)
                if st.id == student_alex.id and subj.name == "Mathematics":
                    score = [85, 78, 62][i]
                elif st in declining_students and i > 0:
                    score = max(40, score - random.randint(5, 15))
                
                db.add(AcademicRecord(student_id=st.id, subject_id=subj.id, term=term, score=score, remarks="Graded"))
    db.commit()

    # 7. Assignments
    for subj in subjects_db:
        # Create 2 assignments per subject
        a1 = Assignment(title=f"{subj.name} Assignment 1", description="Chapter 1", due_date=today - timedelta(days=15), created_by=teachers[0].id, subject_id=subj.id)
        a2 = Assignment(title=f"{subj.name} Assignment 2", description="Chapter 2", due_date=today - timedelta(days=5), created_by=teachers[0].id, subject_id=subj.id)
        db.add(a1); db.add(a2)
        db.flush()
        
        # Students in this grade
        gr_students = [s for s in students_list if s.grade == subj.grade]
        for st in gr_students:
            status1 = AssignmentStatus.submitted if random.random() < 0.9 else AssignmentStatus.missing
            status2 = AssignmentStatus.submitted if random.random() < 0.9 else AssignmentStatus.missing
            if st.id == student_alex.id and subj.name == "Mathematics":
                status1 = AssignmentStatus.missing; status2 = AssignmentStatus.missing
            db.add(AssignmentSubmission(assignment_id=a1.id, student_id=st.id, status=status1, score=random.randint(60,100) if status1==AssignmentStatus.submitted else None, submitted_date=today - timedelta(days=16) if status1!=AssignmentStatus.missing else None))
            db.add(AssignmentSubmission(assignment_id=a2.id, student_id=st.id, status=status2, score=None, submitted_date=today - timedelta(days=6) if status2!=AssignmentStatus.missing else None))
    
    # Give Alex a 3rd missing assignment in some other subject
    a3 = Assignment(title=f"Science Project", description="Volcano", due_date=today - timedelta(days=2), created_by=teachers[0].id, subject_id=[s for s in subjects_db if s.name=="Science" and s.grade=="8"][0].id)
    db.add(a3); db.flush()
    db.add(AssignmentSubmission(assignment_id=a3.id, student_id=student_alex.id, status=AssignmentStatus.missing))
    db.commit()

    # 8. Signals
    # 1. Alex Attendance
    db.add(Signal(signal_type='attendance_decline', severity=SignalSeverity.high, entity_type='student', entity_id=student_alex.id, title='Attendance decline for Alex Morgan', description='Declining from 94% to 81%', explanation='Drop observed', trigger_data={}, status=SignalStatus.open, assigned_to=teachers[0].id))
    # 2. Alex Academic
    db.add(Signal(signal_type='academic_decline', severity=SignalSeverity.high, entity_type='student', entity_id=student_alex.id, title='Academic decline in Math for Alex Morgan', description='Math scores dropping', explanation='85 -> 78 -> 62', trigger_data={}, status=SignalStatus.open, assigned_to=teachers[0].id))
    # 3. Alex Assignments
    db.add(Signal(signal_type='assignment_incomplete', severity=SignalSeverity.medium, entity_type='student', entity_id=student_alex.id, title='Missing assignments for Alex Morgan', description='3 missing recently', explanation='', trigger_data={}, status=SignalStatus.open, assigned_to=teachers[0].id))
    # 4. Alex Lates
    db.add(Signal(signal_type='repeated_late', severity=SignalSeverity.medium, entity_type='student', entity_id=student_alex.id, title='Repeated late arrivals for Alex Morgan', description='4 recent lates', explanation='', trigger_data={}, status=SignalStatus.open, assigned_to=teachers[0].id))
    
    for st in low_att_students[:5]:
        db.add(Signal(signal_type='attendance_decline', severity=SignalSeverity.medium, entity_type='student', entity_id=st.id, title=f'Attendance decline for {st.first_name}', description='', explanation='', trigger_data={}, status=SignalStatus.open, assigned_to=teachers[0].id))
    for st in declining_students[:5]:
        db.add(Signal(signal_type='academic_decline', severity=SignalSeverity.high, entity_type='student', entity_id=st.id, title=f'Academic decline for {st.first_name}', description='', explanation='', trigger_data={}, status=SignalStatus.open, assigned_to=teachers[0].id))
    db.commit()

    # 9. Interventions
    db.add(Intervention(signal_id=None, student_id=student_alex.id, type="attendance_review", title="Attendance Review (Alex)", description="Check drop", assigned_to=teachers[0].id, created_by=principal.id, status=InterventionStatus.open, priority=InterventionPriority.high, due_date=today + timedelta(days=2)))
    db.add(Intervention(signal_id=None, student_id=student_alex.id, type="academic_support", title="Math Support (Alex)", description="Tutoring", assigned_to=teachers[0].id, created_by=principal.id, status=InterventionStatus.in_progress, priority=InterventionPriority.medium, due_date=today + timedelta(days=7)))
    
    # Adding ~18 more interventions
    for i in range(18):
        status = random.choice([InterventionStatus.open, InterventionStatus.in_progress, InterventionStatus.completed])
        st = random.choice(students_list)
        db.add(Intervention(signal_id=None, student_id=st.id, type="behavioral_plan", title=f"Support Plan for {st.first_name}", description="Follow up required", assigned_to=teachers[0].id, created_by=principal.id, status=status, priority=InterventionPriority.medium, due_date=today + timedelta(days=i)))
    db.commit()

    # 10. Communications
    # Alex parent messages
    for i in range(4):
        db.add(Communication(from_user_id=teachers[0].id, to_user_id=parent_david.id, subject=f"Update on Alex #{i+1}", body="Please let me know a good time to call.", is_read=(i%2==0)))
    
    for i in range(56):
        st = random.choice(students_list)
        db.add(Communication(from_user_id=teachers[0].id, to_user_id=st.parent_id, subject=f"Update on {st.first_name}", body="Message body", is_read=random.choice([True, False])))
    db.commit()

    # 11. Fees
    for st in students_list:
        stat = FeeStatus.paid if st.id == student_alex.id else random.choices([FeeStatus.paid, FeeStatus.pending, FeeStatus.overdue], weights=[0.8, 0.15, 0.05])[0]
        db.add(Fee(student_id=st.id, amount=1500.0, due_date=today - timedelta(days=40 if stat==FeeStatus.overdue else -10), status=stat))
    db.commit()

    # 12. Events
    for i in range(25):
        db.add(Event(title=f"School Event {i+1}", description="Activity", start_date=now + timedelta(days=i*2), end_date=now + timedelta(days=i*2, hours=2), location="Hall", event_type="Academic"))
    db.commit()

    # 13. Timetable (minimal representation)
    for i in range(5): # days
        for j in range(8): # periods
            db.add(TimetableSlot(day_of_week=i, period_number=j+1, start_time=(now + timedelta(hours=j)).time().strftime("%H:%M"), end_time=(now + timedelta(hours=j, minutes=45)).time().strftime("%H:%M"), subject_id=subjects_db[0].id, teacher_id=teachers[0].id, room="101"))
    db.commit()

    # 14. Observations
    db.add(TeacherObservation(student_id=student_alex.id, teacher_id=teachers[0].id, observation_type="concern", content="Declining focus"))
    db.add(TeacherObservation(student_id=student_alex.id, teacher_id=teachers[0].id, observation_type="academic", content="Struggling with algebra"))
    db.add(TeacherObservation(student_id=student_alex.id, teacher_id=teachers[0].id, observation_type="behavioral", content="Seeming withdrawn"))
    
    for i in range(37):
        st = random.choice(students_list)
        db.add(TeacherObservation(student_id=st.id, teacher_id=teachers[0].id, observation_type=random.choice(["positive", "concern", "academic", "behavioral"]), content="Observation notes"))
    db.commit()

    print("Database seeded successfully with ~200 students, 120 staff, and rich synthetic data.")
