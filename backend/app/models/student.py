from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    first_name = Column(String)
    last_name = Column(String)
    date_of_birth = Column(Date)
    gender = Column(String)
    grade = Column(String)
    section = Column(String)
    enrollment_date = Column(Date)
    status = Column(String, default="active")
    parent_id = Column(Integer, ForeignKey("users.id"))
    emergency_contact = Column(String)
    medical_notes = Column(String, nullable=True)
    nationality = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", foreign_keys=[user_id])
    parent = relationship("User", foreign_keys=[parent_id])
