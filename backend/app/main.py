from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base, SessionLocal
from app.api import auth, dashboard, students, staff, attendance, academics, assignments, signals, interventions, communications, fees, events, timetable, search
from app.seed.seed_data import seed_db

app = FastAPI(
    title="NorthBridge One API",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def ensure_db_initialized():
    try:
        import app.models  # noqa: F401 - ensure all tables are registered
        Base.metadata.create_all(bind=engine)
        db = SessionLocal()
        try:
            from app.models.user import User
            if db.query(User).count() == 0:
                seed_db(db)
        finally:
            db.close()
    except Exception as e:
        print(f"Database initialization error: {e}")

# Run DB initialization
ensure_db_initialized()

@app.on_event("startup")
def startup_event():
    ensure_db_initialized()

@app.get("/api")
@app.get("/api/health")
def api_root():
    return {"status": "ok", "app": "NorthBridge One API"}

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
