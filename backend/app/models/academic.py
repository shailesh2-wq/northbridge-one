from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class AcademicRecord(Base):
    __tablename__ = "academic_records"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    subject_id = Column(Integer, ForeignKey("subjects.id"))
    term = Column(String)
    assessment_type = Column(String)
    score = Column(Float)
    max_score = Column(Float)
    grade_letter = Column(String, nullable=True)
    remarks = Column(String, nullable=True)
    recorded_by = Column(Integer, ForeignKey("users.id"))
    recorded_at = Column(DateTime, default=datetime.utcnow)

    student = relationship("Student")
    subject = relationship("Subject")
    recorder = relationship("User")
