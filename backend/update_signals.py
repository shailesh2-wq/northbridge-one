import sys
import os

# Add the parent directory to sys.path to allow imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal
from app.models.signal import Signal

def main():
    db = SessionLocal()

    # Update Signal 16
    sig16 = db.query(Signal).filter(Signal.id == 16).first()
    if sig16:
        sig16.description = '322 submissions pending review across 113 assignments'
        sig16.title = 'High workload alert: Ms. Priya Sharma'

    # Update Signal 15
    sig15 = db.query(Signal).filter(Signal.id == 15).first()
    if sig15:
        sig15.signal_type = 'attendance_followup_overdue'

    db.commit()
    print('Database updated successfully for signals 15 and 16.')

if __name__ == '__main__':
    main()
