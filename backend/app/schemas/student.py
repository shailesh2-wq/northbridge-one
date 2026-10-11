from pydantic import BaseModel
from typing import Optional, List
from datetime import date, datetime
from app.schemas.user import User

class StudentBase(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: date
    gender: str
    grade: str
    section: str
    enrollment_date: date
    status: str = "active"
    emergency_contact: str
    medical_notes: Optional[str] = None
    nationality: str

class StudentCreate(StudentBase):
    user_id: Optional[int] = None
    parent_id: int

class Student(StudentBase):
    id: int
    user_id: Optional[int]
    parent_id: int
    created_at: datetime
    user: Optional[User] = None
    parent: Optional[User] = None

    class Config:
        from_attributes = True
