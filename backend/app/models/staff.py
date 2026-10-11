from sqlalchemy import Column, Integer, String, Date, Boolean, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Staff(Base):
    __tablename__ = "staff"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    department = Column(String)
    designation = Column(String)
    join_date = Column(Date)
    subjects = Column(JSON)
    grades_assigned = Column(JSON)
    is_class_teacher = Column(Boolean, default=False)
    class_teacher_grade = Column(String, nullable=True)
    class_teacher_section = Column(String, nullable=True)

    user = relationship("User")
