from fastapi import APIRouter, HTTPException
from app.models import RegisterRequest, LoginRequest, TokenResponse
from app.database import users_collection
from app.auth import hash_password, verify_password, create_token

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=TokenResponse)
def register(data: RegisterRequest):
    # Check if user already exists
    if users_collection.find_one({"email": data.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    # Save user to MongoDB
    users_collection.insert_one({
        "email": data.email,
        "password": hash_password(data.password)
    })

    token = create_token({"sub": data.email})
    return {"access_token": token}

@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest):
    user = users_collection.find_one({"email": data.email})

    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_token({"sub": data.email})
    return {"access_token": token}