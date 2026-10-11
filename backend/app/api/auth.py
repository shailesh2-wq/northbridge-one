from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user import User as UserSchema
from typing import List

router = APIRouter()

from pydantic import BaseModel

class LoginRequest(BaseModel):
    email: str

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    response = {
        "token": str(user.id), 
        "user": {
            "id": user.id, 
            "email": user.email, 
            "name": user.name, 
            "role": user.role.value
        }
    }
    
    if user.role.value == "parent":
        from app.models.student import Student
        student = db.query(Student).filter(Student.parent_id == user.id).first()
        if student:
            response["student_id"] = student.id
            
    return response

@router.get("/me", response_model=UserSchema)
def get_me(x_user_id: str = Header(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == int(x_user_id)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/demo-accounts", response_model=List[UserSchema])
def get_demo_accounts(db: Session = Depends(get_db)):
    # Return one of each role for demo purposes
    roles = ["principal", "teacher", "parent", "student", "finance", "administrator"]
    accounts = []
    for role in roles:
        user = db.query(User).filter(User.role == role).first()
        if user:
            accounts.append(user)
    return accounts
