from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TeacherObservationBase(BaseModel):
    observation_type: str
    content: str
    is_private: bool = False

class TeacherObservationCreate(TeacherObservationBase):
    student_id: int
    teacher_id: int

class TeacherObservation(TeacherObservationBase):
    id: int
    student_id: int
    teacher_id: int
    created_at: datetime

    class Config:
        from_attributes = True
