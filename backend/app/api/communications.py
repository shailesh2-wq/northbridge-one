from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from app.database import get_db
from app.models.communication import Communication
from app.schemas.communication import Communication as CommunicationSchema, CommunicationCreate

router = APIRouter()

@router.get("/", response_model=List[CommunicationSchema])
def list_communications(user_id: int, db: Session = Depends(get_db)):
    return db.query(Communication).filter((Communication.to_user_id == user_id) | (Communication.from_user_id == user_id)).all()

@router.post("/", response_model=CommunicationSchema)
def create_communication(comm: CommunicationCreate, db: Session = Depends(get_db)):
    db_comm = Communication(**comm.model_dump())
    db.add(db_comm)
    db.commit()
    db.refresh(db_comm)
    return db_comm

@router.get("/unread-count")
def get_unread_count(user_id: int, db: Session = Depends(get_db)):
    count = db.query(Communication).filter(Communication.to_user_id == user_id, Communication.is_read == False).count()
    return {"unread_count": count}

@router.get("/{id}", response_model=CommunicationSchema)
def get_communication(id: int, db: Session = Depends(get_db)):
    comm = db.query(Communication).filter(Communication.id == id).first()
    if not comm:
        raise HTTPException(status_code=404, detail="Communication not found")
    return comm

@router.put("/{id}/read")
def mark_read(id: int, db: Session = Depends(get_db)):
    comm = db.query(Communication).filter(Communication.id == id).first()
    if not comm:
        raise HTTPException(status_code=404, detail="Communication not found")
    comm.is_read = True
    comm.read_at = datetime.utcnow()
    db.commit()
    return {"status": "success"}
