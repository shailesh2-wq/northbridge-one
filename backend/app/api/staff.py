from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.staff import Staff
from app.schemas.staff import Staff as StaffSchema

router = APIRouter()

@router.get("/", response_model=List[StaffSchema])
def list_staff(db: Session = Depends(get_db)):
    return db.query(Staff).all()

@router.get("/{id}", response_model=StaffSchema)
def get_staff(id: int, db: Session = Depends(get_db)):
    staff = db.query(Staff).filter(Staff.id == id).first()
    if not staff:
        raise HTTPException(status_code=404, detail="Staff not found")
    return staff
