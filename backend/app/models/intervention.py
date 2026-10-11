from sqlalchemy import Column, Integer, String, Date, DateTime, Enum, Boolean, ForeignKey
from sqlalchemy.orm import relationship
import enum
from datetime import datetime
from app.database import Base

class InterventionStatus(str, enum.Enum):
    open = "open"
    in_progress = "in_progress"
    completed = "completed"
    cancelled = "cancelled"

class InterventionPriority(str, enum.Enum):
    critical = "critical"
    high = "high"
    medium = "medium"
    low = "low"

class Intervention(Base):
    __tablename__ = "interventions"

    id = Column(Integer, primary_key=True, index=True)
    signal_id = Column(Integer, ForeignKey("signals.id"), nullable=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    type = Column(String)
    title = Column(String)
    description = Column(String)
    assigned_to = Column(Integer, ForeignKey("users.id"))
    created_by = Column(Integer, ForeignKey("users.id"))
    status = Column(Enum(InterventionStatus), default=InterventionStatus.open)
    priority = Column(Enum(InterventionPriority))
    due_date = Column(Date)
    completed_date = Column(Date, nullable=True)
    outcome = Column(String, nullable=True)
    notes = Column(String, nullable=True)
    follow_up_required = Column(Boolean, default=False)
    follow_up_date = Column(Date, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    signal = relationship("Signal")
    student = relationship("Student")
    assignee = relationship("User", foreign_keys=[assigned_to])
    creator = relationship("User", foreign_keys=[created_by])
