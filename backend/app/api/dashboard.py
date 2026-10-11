from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.services import dashboard_service

router = APIRouter()

@router.get("/principal")
def get_principal_dashboard(db: Session = Depends(get_db)):
    return dashboard_service.get_principal_dashboard(db)

@router.get("/teacher")
def get_teacher_dashboard(teacher_id: int, db: Session = Depends(get_db)):
    return dashboard_service.get_teacher_dashboard(db, teacher_id)

@router.get("/admin")
def get_admin_dashboard(db: Session = Depends(get_db)):
    return dashboard_service.get_admin_dashboard(db)

@router.get("/parent/{student_id}")
def get_parent_dashboard(student_id: int, db: Session = Depends(get_db)):
    return dashboard_service.get_parent_dashboard(db, student_id)

@router.get("/finance")
def get_finance_dashboard(db: Session = Depends(get_db)):
    return dashboard_service.get_finance_dashboard(db)
