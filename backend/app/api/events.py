from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from app.database import get_db
from app.models.event import Event
from app.schemas.event import Event as EventSchema, EventCreate

router = APIRouter()

@router.get("/", response_model=List[EventSchema])
def list_events(type: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Event)
    if type:
        query = query.filter(Event.event_type == type)
    return query.all()

@router.get("/upcoming", response_model=List[EventSchema])
def upcoming_events(db: Session = Depends(get_db)):
    return db.query(Event).filter(Event.start_date >= datetime.utcnow()).order_by(Event.start_date.asc()).limit(10).all()

@router.post("/", response_model=EventSchema)
def create_event(event: EventCreate, db: Session = Depends(get_db)):
    db_event = Event(**event.model_dump())
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event
