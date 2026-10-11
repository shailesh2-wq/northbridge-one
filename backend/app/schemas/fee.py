from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime
from app.models.fee import FeeStatus

class FeeBase(BaseModel):
    fee_type: str
    description: str
    amount: float
    due_date: date
    status: FeeStatus = FeeStatus.pending
    term: str
    academic_year: str

class FeeCreate(FeeBase):
    student_id: int

class Fee(FeeBase):
    id: int
    student_id: int
    paid_amount: float
    paid_date: Optional[date]
    payment_method: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
