from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class EventBase(BaseModel):
    title: str
    description: str
    event_type: str
    start_date: datetime
    end_date: datetime
    location: Optional[str] = None
    for_grades: Optional[List[str]] = None

class EventCreate(EventBase):
    created_by: int

class Event(EventBase):
    id: int
    created_by: int
    created_at: datetime

    class Config:
        from_attributes = True
