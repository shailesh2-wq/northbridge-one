from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class TimetableSlot(Base):
    __tablename__ = "timetable_slots"

    id = Column(Integer, primary_key=True, index=True)
    grade = Column(String)
    section = Column(String)
    day_of_week = Column(Integer)
    period_number = Column(Integer)
    start_time = Column(String)
    end_time = Column(String)
    subject_id = Column(Integer, ForeignKey("subjects.id"))
    teacher_id = Column(Integer, ForeignKey("staff.id"))
    room = Column(String)

    subject = relationship("Subject")
    teacher = relationship("Staff")
