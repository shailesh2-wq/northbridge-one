from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from sqlalchemy.orm import relationship
import enum
from datetime import datetime
from app.database import Base

class RoleEnum(str, enum.Enum):
    principal = "principal"
    administrator = "administrator"
    teacher = "teacher"
    finance = "finance"
    parent = "parent"
    student = "student"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    role = Column(Enum(RoleEnum))
    avatar_url = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
