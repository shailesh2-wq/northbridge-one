from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base, SessionLocal
from app.api import auth, dashboard, students, staff, attendance, academics, assignments, signals, interventions, communications, fees, events, timetable, search
from app.seed.seed_data import seed_db

app = FastAPI(title="NorthBridge One API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    seed_db(db)
    db.close()

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])
app.include_router(students.router, prefix="/api/students", tags=["students"])
app.include_router(staff.router, prefix="/api/staff", tags=["staff"])
app.include_router(attendance.router, prefix="/api/attendance", tags=["attendance"])
app.include_router(academics.router, prefix="/api/academics", tags=["academics"])
app.include_router(assignments.router, prefix="/api/assignments", tags=["assignments"])
app.include_router(signals.router, prefix="/api/signals", tags=["signals"])
app.include_router(interventions.router, prefix="/api/interventions", tags=["interventions"])
app.include_router(communications.router, prefix="/api/communications", tags=["communications"])
app.include_router(fees.router, prefix="/api/fees", tags=["fees"])
app.include_router(events.router, prefix="/api/events", tags=["events"])
app.include_router(timetable.router, prefix="/api/timetable", tags=["timetable"])
app.include_router(search.router, prefix="/api/search", tags=["search"])
