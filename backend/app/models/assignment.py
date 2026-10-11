from sqlalchemy import Column, Integer, String, Float, Date, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
import enum
from datetime import datetime
from app.database import Base

class AssignmentStatus(str, enum.Enum):
    submitted = "submitted"
    pending = "pending"
    late = "late"
    missing = "missing"

class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(Integer, primary_key=True, index=True)
    subject_id = Column(Integer, ForeignKey("subjects.id"))
    title = Column(String)
    description = Column(String)
    assigned_date = Column(Date)
    due_date = Column(Date)
    max_score = Column(Float)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    subject = relationship("Subject")
    creator = relationship("User")

class AssignmentSubmission(Base):
    __tablename__ = "assignment_submissions"

    id = Column(Integer, primary_key=True, index=True)
    assignment_id = Column(Integer, ForeignKey("assignments.id"))
    student_id = Column(Integer, ForeignKey("students.id"))
    submitted_date = Column(Date, nullable=True)
    status = Column(Enum(AssignmentStatus))
    score = Column(Float, nullable=True)
    feedback = Column(String, nullable=True)
    graded_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    graded_at = Column(DateTime, nullable=True)

    assignment = relationship("Assignment")
    student = relationship("Student")
    grader = relationship("User")
