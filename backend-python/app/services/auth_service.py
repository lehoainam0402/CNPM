from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.models.user import User
from app.schemas.auth import RegisterRequest, LoginRequest, ApiResponse, LoginResponse
from app.security.jwt import create_access_token

pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")

def register_user(db: Session, req: RegisterRequest):
    existing = db.query(User).filter(User.email == req.email).first()
    if existing:
        return ApiResponse(success=False, message="Email đã tồn tại!")

    hashed = pwd.hash(req.password)
    user = User(full_name=req.full_name, email=req.email, password=hashed)

    db.add(user)
    db.commit()
    db.refresh(user)

    return ApiResponse(success=True, message="Đăng ký thành công!")

def login_user(db: Session, req: LoginRequest):
    user = db.query(User).filter(User.email == req.email).first()
    if not user or not pwd.verify(req.password, user.password):
        return None

    token = create_access_token({"sub": user.email})
    return LoginResponse(access_token=token)
