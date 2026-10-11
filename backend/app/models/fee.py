from sqlalchemy import Column, Integer, String, Float, Date, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
import enum
from datetime import datetime
from app.database import Base

class FeeStatus(str, enum.Enum):
    paid = "paid"
    pending = "pending"
    overdue = "overdue"
    waived = "waived"
    partial = "partial"

class Fee(Base):
    __tablename__ = "fees"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    fee_type = Column(String)
    description = Column(String)
    amount = Column(Float)
    due_date = Column(Date)
    status = Column(Enum(FeeStatus), default=FeeStatus.pending)
    paid_amount = Column(Float, default=0)
    paid_date = Column(Date, nullable=True)
    payment_method = Column(String, nullable=True)
    term = Column(String)
    academic_year = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    student = relationship("Student")
