from pydantic import BaseModel

class SubjectBase(BaseModel):
    name: str
    code: str
    grade: str
    department: str

class SubjectCreate(SubjectBase):
    teacher_id: int

class Subject(SubjectBase):
    id: int
    teacher_id: int

    class Config:
        from_attributes = True
