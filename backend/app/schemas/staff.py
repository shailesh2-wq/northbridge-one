from pydantic import BaseModel
from typing import Optional, List
from datetime import date
from app.schemas.user import User

class StaffBase(BaseModel):
    department: str
    designation: str
    join_date: date
    subjects: List[str] = []
    grades_assigned: List[str] = []
    is_class_teacher: bool = False
    class_teacher_grade: Optional[str] = None
    class_teacher_section: Optional[str] = None

class StaffCreate(StaffBase):
    user_id: int

class Staff(StaffBase):
    id: int
    user_id: int
    user: Optional[User] = None

    class Config:
        from_attributes = True
