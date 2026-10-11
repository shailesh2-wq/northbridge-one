from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.assignment import Assignment, AssignmentSubmission
from app.schemas.assignment import Assignment as AssignmentSchema, AssignmentCreate, AssignmentSubmissionCreate

router = APIRouter()

@router.get("/")
def list_assignments(subject_id: Optional[int] = None, teacher_id: Optional[int] = None, student_id: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(Assignment)
    if subject_id:
        query = query.filter(Assignment.subject_id == subject_id)
    if teacher_id:
        query = query.filter(Assignment.created_by == teacher_id)
        
    if student_id:
        # Get assignments where this student has a submission record
        query = query.join(AssignmentSubmission).filter(AssignmentSubmission.student_id == student_id)
        
    assignments = query.all()
    result = []
    for a in assignments:
        total_subs = db.query(AssignmentSubmission).filter(AssignmentSubmission.assignment_id == a.id).count()
        submitted = db.query(AssignmentSubmission).filter(AssignmentSubmission.assignment_id == a.id, AssignmentSubmission.status == 'submitted').count()
        
        # If student_id is provided, check their specific status
        student_status = None
        if student_id:
            sub = db.query(AssignmentSubmission).filter(AssignmentSubmission.assignment_id == a.id, AssignmentSubmission.student_id == student_id).first()
            if sub:
                student_status = sub.status.value if hasattr(sub.status, 'value') else str(sub.status)
        
        a_dict = {
            "id": a.id,
            "title": a.title,
            "subject_id": a.subject_id,
            "description": a.description,
            "assigned_date": a.assigned_date.isoformat() if a.assigned_date else None,
            "due_date": a.due_date.isoformat() if a.due_date else None,
            "max_score": a.max_score,
            "created_by": a.created_by,
            "submitted_count": submitted,
            "total_count": total_subs,
            "student_status": student_status
        }
        result.append(a_dict)
    
    return result

@router.post("/", response_model=AssignmentSchema)
def create_assignment(assignment: AssignmentCreate, db: Session = Depends(get_db)):
    db_assignment = Assignment(**assignment.model_dump())
    db.add(db_assignment)
    db.commit()
    db.refresh(db_assignment)
    return db_assignment

@router.get("/{id}")
def get_assignment(id: int, db: Session = Depends(get_db)):
    assignment = db.query(Assignment).filter(Assignment.id == id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    submissions = db.query(AssignmentSubmission).filter(AssignmentSubmission.assignment_id == id).all()
    return {"assignment": assignment, "submissions": submissions}

@router.put("/{id}/submissions/{student_id}")
def grade_submission(id: int, student_id: int, submission: AssignmentSubmissionCreate, db: Session = Depends(get_db)):
    sub = db.query(AssignmentSubmission).filter(AssignmentSubmission.assignment_id == id, AssignmentSubmission.student_id == student_id).first()
    if not sub:
        sub = AssignmentSubmission(**submission.model_dump())
        db.add(sub)
    else:
        for k, v in submission.model_dump().items():
            setattr(sub, k, v)
    db.commit()
    db.refresh(sub)
    return sub
