from pydantic import BaseModel
from typing import Optional

class TimetableSlotBase(BaseModel):
    grade: str
    section: str
    day_of_week: int
    period_number: int
    start_time: str
    end_time: str
    room: str

class TimetableSlotCreate(TimetableSlotBase):
    subject_id: int
    teacher_id: int

class TimetableSlot(TimetableSlotBase):
    id: int
    subject_id: int
    teacher_id: int

    class Config:
        from_attributes = True
