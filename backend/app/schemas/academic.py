from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AcademicRecordBase(BaseModel):
    term: str
    assessment_type: str
    score: float
    max_score: float
    grade_letter: Optional[str] = None
    remarks: Optional[str] = None

class AcademicRecordCreate(AcademicRecordBase):
    student_id: int
    subject_id: int
    recorded_by: int

class AcademicRecord(AcademicRecordBase):
    id: int
    student_id: int
    subject_id: int
    recorded_by: int
    recorded_at: datetime

    class Config:
        from_attributes = True
