from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from . import schemas, crud, models
from .database import get_db
from .utils import verify_password, create_access_token, get_current_user

router = APIRouter()

@router.post("/signup", response_model=schemas.User)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    print("Received Data:", user.dict())
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db=db, user=user)

@router.post("/login")
def login(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, username=user.username)
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": db_user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/animals", response_model=schemas.Animal)
def create_animal(
    animal: schemas.AnimalCreate,
    db: Session = Depends(get_db),
    current_user: models.UserInDB = Depends(get_current_user)
):
    # We still use get_current_user to ensure only authenticated users can add animals
    return crud.create_animal(db=db, animal=animal)

@router.get("/animals", response_model=list[schemas.Animal])
def read_animals(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    # No authentication required to view animals
    animals = crud.get_animals(db, skip=skip, limit=limit)
    return animals