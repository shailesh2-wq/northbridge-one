from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.user import RoleEnum

class UserBase(BaseModel):
    email: str
    name: str
    role: RoleEnum
    avatar_url: Optional[str] = None
    is_active: bool = True

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
