from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime
from app.models.signal import SignalSeverity, SignalStatus

class SignalBase(BaseModel):
    signal_type: str
    severity: SignalSeverity
    entity_type: str
    entity_id: int
    title: str
    description: str
    explanation: str
    trigger_data: Dict[str, Any]
    status: SignalStatus = SignalStatus.open

class SignalCreate(SignalBase):
    pass

class Signal(SignalBase):
    id: int
    assigned_to: Optional[int]
    created_at: datetime
    updated_at: datetime
    resolved_at: Optional[datetime]
    resolved_by: Optional[int]

    class Config:
        from_attributes = True
