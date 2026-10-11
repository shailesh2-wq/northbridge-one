from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.academic import AcademicRecord
from app.models.student import Student
from app.schemas.academic import AcademicRecordCreate

router = APIRouter()

@router.get("/grades/{grade}/{section}")
def get_class_academics(grade: str, section: str, db: Session = Depends(get_db)):
    students = db.query(Student).filter(Student.grade == grade, Student.section == section).all()
    student_ids = [s.id for s in students]
    records = db.query(AcademicRecord).filter(AcademicRecord.student_id.in_(student_ids)).all()
    return records

@router.get("/subject/{subject_id}")
def get_subject_performance(subject_id: int, db: Session = Depends(get_db)):
    records = db.query(AcademicRecord).filter(AcademicRecord.subject_id == subject_id).all()
    return records

@router.post("/record")
def record_grade(record: AcademicRecordCreate, db: Session = Depends(get_db)):
    db_record = AcademicRecord(**record.model_dump())
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record
