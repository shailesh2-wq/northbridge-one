from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from app.database import get_db
from app.models.signal import Signal, SignalStatus
from app.schemas.signal import Signal as SignalSchema
from app.services import signal_engine

router = APIRouter()

@router.get("/", response_model=List[SignalSchema])
def list_signals(severity: Optional[str] = None, status: Optional[str] = None, entity_type: Optional[str] = None, role: Optional[str] = None, user_id: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(Signal)
    if severity:
        query = query.filter(Signal.severity == severity)
    if status:
        query = query.filter(Signal.status == status)
    if entity_type:
        query = query.filter(Signal.entity_type == entity_type)
        
    if role == 'administrator':
        # Admin sees operational signals
        query = query.filter(Signal.signal_type.in_(['attendance_decline', 'attendance_followup_overdue', 'teacher_workload', 'high_workload', 'system_alert']))
    elif role == 'finance':
        # Finance sees fee signals
        query = query.filter(Signal.signal_type.in_(['fee_overdue']))
    elif role == 'teacher' and user_id:
        # Teacher sees academic and behavioral assigned to them, plus workload alerts
        query = query.filter(Signal.signal_type.in_(['academic_decline', 'assignment_incomplete', 'repeated_late', 'communication_pending', 'behavioral_concern', 'teacher_workload', 'high_workload']))
        query = query.filter(Signal.assigned_to == user_id)
    elif role == 'parent':
        # Mock parent specific filtering logic
        pass

    return query.order_by(Signal.id.desc()).all()

@router.get("/summary")
def get_signal_summary(db: Session = Depends(get_db)):
    # Basic summary counts
    return {
        "critical": db.query(Signal).filter(Signal.severity == "critical", Signal.status == "open").count(),
        "high": db.query(Signal).filter(Signal.severity == "high", Signal.status == "open").count(),
        "medium": db.query(Signal).filter(Signal.severity == "medium", Signal.status == "open").count(),
        "low": db.query(Signal).filter(Signal.severity == "low", Signal.status == "open").count(),
    }

@router.get("/{id}", response_model=SignalSchema)
def get_signal(id: int, db: Session = Depends(get_db)):
    signal = db.query(Signal).filter(Signal.id == id).first()
    if not signal:
        raise HTTPException(status_code=404, detail="Signal not found")
    return signal

@router.put("/{id}/status")
def update_signal_status(id: int, status: str, user_id: int, db: Session = Depends(get_db)):
    signal = db.query(Signal).filter(Signal.id == id).first()
    if not signal:
        raise HTTPException(status_code=404, detail="Signal not found")
    signal.status = status
    if status in [SignalStatus.resolved, SignalStatus.dismissed]:
        signal.resolved_at = datetime.utcnow()
        signal.resolved_by = user_id
    db.commit()
    db.refresh(signal)
    return signal

@router.put("/{id}/assign")
def assign_signal(id: int, user_id: int, db: Session = Depends(get_db)):
    signal = db.query(Signal).filter(Signal.id == id).first()
    if not signal:
        raise HTTPException(status_code=404, detail="Signal not found")
    signal.assigned_to = user_id
    db.commit()
    db.refresh(signal)
    return signal

@router.post("/generate")
def trigger_signals(db: Session = Depends(get_db)):
    signal_engine.generate_signals(db)
    return {"status": "success", "message": "Signals generated successfully"}
