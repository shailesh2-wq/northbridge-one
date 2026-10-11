from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime
from app.models.attendance import AttendanceStatus

class AttendanceBase(BaseModel):
    date: date
    status: AttendanceStatus
    period: Optional[str] = None
    notes: Optional[str] = None

class AttendanceCreate(AttendanceBase):
    student_id: int
    marked_by: int

class Attendance(AttendanceBase):
    id: int
    student_id: int
    marked_by: int
    created_at: datetime

    class Config:
        from_attributes = True

class AttendanceBatch(BaseModel):
    student_id: int
    status: AttendanceStatus
