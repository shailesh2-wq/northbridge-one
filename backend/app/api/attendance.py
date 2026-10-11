from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from datetime import date
from app.database import get_db
from app.models.attendance import Attendance
from app.models.student import Student
from app.schemas.attendance import AttendanceBatch, Attendance as AttendanceSchema

router = APIRouter()

@router.get("/class/{grade}/{section}/{date_val}")
def get_class_attendance(grade: str, section: str, date_val: date, db: Session = Depends(get_db)):
    students = db.query(Student).filter(Student.grade == grade, Student.section == section).all()
    student_ids = [s.id for s in students]
    attendances = db.query(Attendance).filter(Attendance.student_id.in_(student_ids), Attendance.date == date_val).all()
    return {"students": students, "attendances": attendances}

@router.post("/mark")
def mark_attendance(data: List[AttendanceBatch], date_val: date, marked_by: int, db: Session = Depends(get_db)):
    for item in data:
        att = Attendance(student_id=item.student_id, date=date_val, status=item.status, marked_by=marked_by)
        db.add(att)
    db.commit()
    return {"status": "success"}

@router.get("/stats")
def get_attendance_stats(db: Session = Depends(get_db)):
    # Basic stats
    total_records = db.query(Attendance).count()
    return {"total_records": total_records}

@router.get("/anomalies")
def get_attendance_anomalies(db: Session = Depends(get_db)):
    return []
