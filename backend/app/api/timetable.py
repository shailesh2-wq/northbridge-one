from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from app.database import get_db
from app.models.timetable import TimetableSlot
from app.schemas.timetable import TimetableSlot as TimetableSlotSchema

router = APIRouter()

@router.get("/class/{grade}/{section}", response_model=List[TimetableSlotSchema])
def get_class_timetable(grade: str, section: str, db: Session = Depends(get_db)):
    return db.query(TimetableSlot).filter(TimetableSlot.grade == grade, TimetableSlot.section == section).all()

@router.get("/teacher/{staff_id}", response_model=List[TimetableSlotSchema])
def get_teacher_timetable(staff_id: int, db: Session = Depends(get_db)):
    return db.query(TimetableSlot).filter(TimetableSlot.teacher_id == staff_id).all()

@router.get("/today/{grade}/{section}", response_model=List[TimetableSlotSchema])
def get_today_timetable(grade: str, section: str, db: Session = Depends(get_db)):
    today_weekday = datetime.today().weekday()
    if today_weekday > 4:
        today_weekday = 0 # Default to monday if weekend
    return db.query(TimetableSlot).filter(
        TimetableSlot.grade == grade,
        TimetableSlot.section == section,
        TimetableSlot.day_of_week == today_weekday
    ).all()
