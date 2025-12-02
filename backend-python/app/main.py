from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine, SessionLocal
from app.schemas.auth import RegisterRequest, LoginRequest, ApiResponse, LoginResponse
from app.services.auth_service import register_user, login_user

Base.metadata.create_all(bind=engine)

app = FastAPI()

# ---- ADD CORS HERE ----
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# -----------------------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/auth/register", response_model=ApiResponse)
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    return register_user(db, req)

@app.post("/auth/login", response_model=LoginResponse)
def login(req: LoginRequest, db: Session = Depends(get_db)):
    token = login_user(db, req)
    if token is None:
        raise HTTPException(status_code=400, detail="Sai email hoặc mật khẩu!")
    return token
