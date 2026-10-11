from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime
from app.models.intervention import InterventionStatus, InterventionPriority

class InterventionBase(BaseModel):
    type: str
    title: str
    description: str
    status: InterventionStatus = InterventionStatus.open
    priority: InterventionPriority
    due_date: date
    outcome: Optional[str] = None
    notes: Optional[str] = None
    follow_up_required: bool = False
    follow_up_date: Optional[date] = None

class InterventionCreate(InterventionBase):
    signal_id: Optional[int] = None
    student_id: int
    assigned_to: int
    created_by: int

class Intervention(InterventionBase):
    id: int
    signal_id: Optional[int]
    student_id: int
    assigned_to: int
    created_by: int
    completed_date: Optional[date]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
