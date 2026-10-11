from app.database import SessionLocal
from app.models.fee import Fee
from app.models.student import Student
from app.models.communication import Communication
from app.models.user import User
from app.models.signal import Signal
from app.models.intervention import Intervention
from app.models.attendance import Attendance
from app.models.assignment import Assignment, AssignmentSubmission
from sqlalchemy import func
import datetime

db = SessionLocal()

print("=" * 60)
print("FEE AUDIT")
print("=" * 60)
fees = db.query(Fee).all()
for f in fees[:3]:
    sv = f.status.value if hasattr(f.status, 'value') else str(f.status)
    print(f"  status={sv} amount={f.amount} paid={f.paid_amount}")

overdue = [f for f in fees if (f.status.value if hasattr(f.status, 'value') else str(f.status)) == 'overdue']
pending = [f for f in fees if (f.status.value if hasattr(f.status, 'value') else str(f.status)) == 'pending']
paid = [f for f in fees if (f.status.value if hasattr(f.status, 'value') else str(f.status)) == 'paid']
print(f"overdue={len(overdue)} pending={len(pending)} paid={len(paid)} total={len(fees)}")
total_outstanding = sum((f.amount or 0) - (f.paid_amount or 0) for f in overdue + pending)
print(f"Total outstanding: ${total_outstanding:.2f}")

for f in overdue:
    s = db.query(Student).filter(Student.id == f.student_id).first()
    name = f"{s.first_name} {s.last_name}" if s else "Unknown"
    print(f"  Overdue: {name} amt=${f.amount} paid=${f.paid_amount} due={f.due_date}")

for f in pending[:5]:
    s = db.query(Student).filter(Student.id == f.student_id).first()
    name = f"{s.first_name} {s.last_name}" if s else "Unknown"
    print(f"  Pending: {name} amt=${f.amount} paid=${f.paid_amount} due={f.due_date}")

print("\n" + "=" * 60)
print("COMMUNICATION AUDIT - David Morgan (parent)")
print("=" * 60)
david = db.query(User).filter(User.email == 'parent@northbridge.edu').first()
print(f"David user_id: {david.id}")
david_to = db.query(Communication).filter(Communication.to_user_id == david.id).all()
david_from = db.query(Communication).filter(Communication.from_user_id == david.id).all()
print(f"Messages TO David: {len(david_to)}")
for m in david_to:
    sender = db.query(User).filter(User.id == m.from_user_id).first()
    print(f"  from={sender.name if sender else 'unknown'} subj={m.subject} read={m.is_read} date={m.created_at}")
print(f"Messages FROM David: {len(david_from)}")
for m in david_from:
    recip = db.query(User).filter(User.id == m.to_user_id).first()
    print(f"  to={recip.name if recip else 'unknown'} subj={m.subject} date={m.created_at}")

print("\n" + "=" * 60)
print("DASHBOARD SERVICE AUDIT")
print("=" * 60)
from app.services.dashboard_service import get_teacher_dashboard, get_parent_dashboard, get_finance_dashboard
teacher_dash = get_teacher_dashboard(db, 3)
print(f"Teacher dashboard keys: {list(teacher_dash.keys())}")
for k, v in teacher_dash.items():
    if isinstance(v, (int, float, str)):
        print(f"  {k}: {v}")
    elif isinstance(v, list):
        print(f"  {k}: list({len(v)})")

parent_dash = get_parent_dashboard(db, 1)
print(f"\nParent dashboard keys: {list(parent_dash.keys())}")
for k, v in parent_dash.items():
    if isinstance(v, (int, float, str)):
        print(f"  {k}: {v}")
    elif isinstance(v, list):
        print(f"  {k}: list({len(v)})")

finance_dash = get_finance_dashboard(db)
print(f"\nFinance dashboard keys: {list(finance_dash.keys())}")
for k, v in finance_dash.items():
    if isinstance(v, (int, float, str)):
        print(f"  {k}: {v}")
    elif isinstance(v, list):
        print(f"  {k}: list({len(v)})")

print("\n" + "=" * 60)
print("STUDENT DIRECTORY AUDIT - checking what /api/students returns")
print("=" * 60)
students = db.query(Student).limit(5).all()
for s in students:
    att = db.query(Attendance).filter(Attendance.student_id == s.id).all()
    present = sum(1 for a in att if a.status in ('present', 'late'))
    total = len(att)
    rate = (present / total * 100) if total > 0 else 100
    print(f"  {s.first_name} {s.last_name} grade={s.grade} section={s.section} att_rate={rate:.1f}% ({present}/{total})")
