from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CommunicationBase(BaseModel):
    subject: str
    body: str
    message_type: str
    related_student_id: Optional[int] = None

class CommunicationCreate(CommunicationBase):
    from_user_id: int
    to_user_id: int

class Communication(CommunicationBase):
    id: int
    from_user_id: int
    to_user_id: int
    is_read: bool
    read_at: Optional[datetime]
    created_at: datetime

    class Config:
        from_attributes = True
