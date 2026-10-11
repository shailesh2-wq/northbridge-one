from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.intervention import Intervention
from app.models.user import User
from app.schemas.intervention import Intervention as InterventionSchema, InterventionCreate

router = APIRouter()

@router.get("/")
def list_interventions(status: Optional[str] = None, priority: Optional[str] = None, assigned_to: Optional[int] = None, student_id: Optional[int] = None, role: Optional[str] = None, user_id: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(Intervention)
    if status:
        query = query.filter(Intervention.status == status)
    if priority:
        query = query.filter(Intervention.priority == priority)
    if assigned_to:
        query = query.filter(Intervention.assigned_to == assigned_to)
    if student_id:
        query = query.filter(Intervention.student_id == student_id)
        
    if role == 'administrator':
        query = query.filter(Intervention.type.in_(['attendance_review', 'behavior_plan', 'other']))
    elif role == 'teacher' and user_id:
        query = query.filter((Intervention.assigned_to == user_id) | (Intervention.created_by == user_id))
    elif role == 'parent':
        pass

    interventions = query.all()
    
    # Batch-resolve assigned user names
    user_ids = set(i.assigned_to for i in interventions if i.assigned_to)
    users = db.query(User).filter(User.id.in_(user_ids)).all() if user_ids else []
    user_map = {u.id: u.name for u in users}
    
    return [
        {
            "id": i.id,
            "signal_id": i.signal_id,
            "student_id": i.student_id,
            "type": i.type,
            "title": i.title,
            "description": i.description,
            "assigned_to": i.assigned_to,
            "assignedToName": user_map.get(i.assigned_to, "Unassigned") if i.assigned_to else None,
            "created_by": i.created_by,
            "status": i.status.value if hasattr(i.status, 'value') else str(i.status),
            "priority": i.priority.value if hasattr(i.priority, 'value') else str(i.priority),
            "due_date": i.due_date.isoformat() if i.due_date else None,
            "completed_date": i.completed_date.isoformat() if i.completed_date else None,
            "outcome": i.outcome,
            "notes": i.notes,
            "follow_up_required": i.follow_up_required,
            "follow_up_date": i.follow_up_date.isoformat() if i.follow_up_date else None,
            "created_at": i.created_at.isoformat() if i.created_at else None,
            "updated_at": i.updated_at.isoformat() if i.updated_at else None,
        }
        for i in interventions
    ]

@router.post("/", response_model=InterventionSchema)
def create_intervention(intervention: InterventionCreate, db: Session = Depends(get_db)):
    db_int = Intervention(**intervention.model_dump())
    db.add(db_int)
    db.commit()
    db.refresh(db_int)
    return db_int

@router.get("/stats")
def get_intervention_stats(db: Session = Depends(get_db)):
    return {
        "open": db.query(Intervention).filter(Intervention.status == "open").count(),
        "in_progress": db.query(Intervention).filter(Intervention.status == "in_progress").count(),
        "completed": db.query(Intervention).filter(Intervention.status == "completed").count()
    }

@router.get("/{id}", response_model=InterventionSchema)
def get_intervention(id: int, db: Session = Depends(get_db)):
    intervention = db.query(Intervention).filter(Intervention.id == id).first()
    if not intervention:
        raise HTTPException(status_code=404, detail="Intervention not found")
    return intervention

@router.put("/{id}")
def update_intervention(id: int, status: Optional[str] = None, outcome: Optional[str] = None, notes: Optional[str] = None, db: Session = Depends(get_db)):
    intervention = db.query(Intervention).filter(Intervention.id == id).first()
    if not intervention:
        raise HTTPException(status_code=404, detail="Intervention not found")
    if status:
        intervention.status = status
    if outcome:
        intervention.outcome = outcome
    if notes:
        intervention.notes = notes
    db.commit()
    db.refresh(intervention)
    return intervention
