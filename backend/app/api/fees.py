from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date
from app.database import get_db
from app.models.fee import Fee, FeeStatus
from app.schemas.fee import Fee as FeeSchema

router = APIRouter()

@router.get("/", response_model=List[FeeSchema])
def list_fees(status: Optional[str] = None, student_id: Optional[int] = None, term: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Fee)
    if status:
        query = query.filter(Fee.status == status)
    if student_id:
        query = query.filter(Fee.student_id == student_id)
    if term:
        query = query.filter(Fee.term == term)
    return query.all()

@router.get("/stats")
def get_fee_stats(db: Session = Depends(get_db)):
    total = db.query(Fee).count()
    paid = db.query(Fee).filter(Fee.status == "paid").count()
    overdue = db.query(Fee).filter(Fee.status == "overdue").count()
    return {"total": total, "paid": paid, "overdue": overdue}

@router.get("/student/{student_id}", response_model=List[FeeSchema])
def get_student_fees(student_id: int, db: Session = Depends(get_db)):
    return db.query(Fee).filter(Fee.student_id == student_id).all()

@router.put("/{id}/pay")
def pay_fee(id: int, amount: float, method: str, db: Session = Depends(get_db)):
    fee = db.query(Fee).filter(Fee.id == id).first()
    if not fee:
        raise HTTPException(status_code=404, detail="Fee not found")
    fee.paid_amount += amount
    if fee.paid_amount >= fee.amount:
        fee.status = FeeStatus.paid
    else:
        fee.status = FeeStatus.partial
    fee.paid_date = date.today()
    fee.payment_method = method
    db.commit()
    db.refresh(fee)
    return fee
