from pydantic import BaseModel
from typing import Optional, List
from datetime import date, datetime
from app.models.assignment import AssignmentStatus

class AssignmentBase(BaseModel):
    title: str
    description: str
    assigned_date: date
    due_date: date
    max_score: float

class AssignmentCreate(AssignmentBase):
    subject_id: int
    created_by: int

class Assignment(AssignmentBase):
    id: int
    subject_id: int
    created_by: int
    created_at: datetime

    class Config:
        from_attributes = True

class AssignmentSubmissionBase(BaseModel):
    status: AssignmentStatus
    score: Optional[float] = None
    feedback: Optional[str] = None

class AssignmentSubmissionCreate(AssignmentSubmissionBase):
    assignment_id: int
    student_id: int
    submitted_date: Optional[date] = None
    graded_by: Optional[int] = None

class AssignmentSubmission(AssignmentSubmissionBase):
    id: int
    assignment_id: int
    student_id: int
    submitted_date: Optional[date]
    graded_by: Optional[int]
    graded_at: Optional[datetime]

    class Config:
        from_attributes = True
