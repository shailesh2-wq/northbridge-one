from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, case
from typing import List, Optional
from app.database import get_db
from app.models.student import Student
from app.models.attendance import Attendance
from app.models.academic import AcademicRecord
from app.models.signal import Signal
from app.schemas.student import Student as StudentSchema
from app.services import student360_service

router = APIRouter()

@router.get("/")
def list_students(grade: Optional[str] = None, section: Optional[str] = None, status: Optional[str] = None, search: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Student)
    if grade:
        query = query.filter(Student.grade == grade)
    if section:
        query = query.filter(Student.section == section)
    if status:
        query = query.filter(Student.status == status)
    if search:
        query = query.filter(
            (Student.first_name.ilike(f"%{search}%")) | 
            (Student.last_name.ilike(f"%{search}%"))
        )
    students = query.all()
    
    # Batch attendance rates
    att_stats = db.query(
        Attendance.student_id,
        func.count(Attendance.id).label('total'),
        func.sum(case((Attendance.status.in_(['present', 'late']), 1), else_=0)).label('present')
    ).group_by(Attendance.student_id).all()
    att_map = {row.student_id: round(row.present / row.total * 100, 1) if row.total > 0 else 100.0 for row in att_stats}

    # Batch academic averages  
    acad_stats = db.query(
        AcademicRecord.student_id,
        func.avg(AcademicRecord.score).label('avg_score')
    ).group_by(AcademicRecord.student_id).all()
    acad_map = {row.student_id: round(float(row.avg_score), 1) if row.avg_score else None for row in acad_stats}

    # Batch signal counts
    sig_stats = db.query(
        Signal.entity_id,
        func.count(Signal.id).label('count')
    ).filter(Signal.entity_type == 'student', Signal.status == 'open').group_by(Signal.entity_id).all()
    sig_map = {row.entity_id: row.count for row in sig_stats}
    
    result = []
    for s in students:
        result.append({
            "id": s.id,
            "first_name": s.first_name,
            "last_name": s.last_name,
            "grade": s.grade,
            "section": s.section,
            "status": s.status or "active",
            "attendanceRate": att_map.get(s.id, 100.0),
            "gpa": acad_map.get(s.id),
            "recentSignals": sig_map.get(s.id, 0)
        })
    return result

@router.get("/{id}", response_model=StudentSchema)
def get_student(id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@router.get("/{id}/360")
def get_student_360(id: int, db: Session = Depends(get_db)):
    return student360_service.get_student_360(db, id)

@router.get("/{id}/attendance")
def get_student_attendance(id: int, db: Session = Depends(get_db)):
    return student360_service.get_student_attendance(db, id)

@router.get("/{id}/academics")
def get_student_academics(id: int, db: Session = Depends(get_db)):
    return student360_service.get_student_academics(db, id)

@router.get("/{id}/assignments")
def get_student_assignments(id: int, db: Session = Depends(get_db)):
    return student360_service.get_student_assignments(db, id)

@router.get("/{id}/interventions")
def get_student_interventions(id: int, db: Session = Depends(get_db)):
    return student360_service.get_student_interventions(db, id)

@router.get("/{id}/communications")
def get_student_communications(id: int, db: Session = Depends(get_db)):
    return student360_service.get_student_communications(db, id)

@router.get("/{id}/timeline")
def get_student_timeline(id: int, db: Session = Depends(get_db)):
    return student360_service.get_student_timeline(db, id)
