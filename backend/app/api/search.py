from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.student import Student
from app.models.user import User
from app.models.signal import Signal
from app.models.intervention import Intervention
from app.models.communication import Communication

router = APIRouter()

@router.get("/")
def global_search(q: str, db: Session = Depends(get_db)):
    results = {"students": [], "staff": [], "signals": [], "interventions": [], "communications": []}
    
    if not q:
        return results

    # Search students
    students = db.query(Student).filter(
        (Student.first_name.ilike(f"%{q}%")) | 
        (Student.last_name.ilike(f"%{q}%"))
    ).limit(10).all()
    
    for s in students:
        # Get active signals count for student
        active_signals_count = db.query(Signal).filter(
            Signal.entity_type == "student",
            Signal.entity_id == s.id, 
            Signal.status == "open"
        ).count()
        results["students"].append({
            "id": s.id,
            "name": f"{s.first_name} {s.last_name}",
            "grade": s.grade,
            "section": s.section,
            "active_signals_count": active_signals_count
        })
    
    # Search staff by user name
    staff_users = db.query(User).filter(
        User.name.ilike(f"%{q}%"),
        User.role.in_(["teacher", "principal", "administrator"])
    ).limit(10).all()
    results["staff"] = [
        {"id": u.id, "name": u.name, "role": u.role.value, "email": u.email} for u in staff_users
    ]
    
    # Search signals by title
    signals = db.query(Signal).filter(Signal.title.ilike(f"%{q}%")).limit(10).all()
    results["signals"] = [
        {"id": sig.id, "title": sig.title, "severity": sig.severity, "status": sig.status} for sig in signals
    ]
    
    # Search interventions by title/description
    interventions = db.query(Intervention).filter(
        (Intervention.title.ilike(f"%{q}%")) | 
        (Intervention.description.ilike(f"%{q}%"))
    ).limit(10).all()
    results["interventions"] = [
        {"id": i.id, "title": i.title, "status": i.status} for i in interventions
    ]
    
    # Search communications by subject
    communications = db.query(Communication).filter(Communication.subject.ilike(f"%{q}%")).limit(10).all()
    results["communications"] = [
        {"id": c.id, "subject": c.subject, "status": c.status if hasattr(c, 'status') else "sent"} for c in communications
    ]
    
    return results
