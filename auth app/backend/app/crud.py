from sqlalchemy.orm import Session
from . import models, schemas
from .utils import get_password_hash

def get_user_by_username(db: Session, username: str):
    return db.query(models.UserInDB).filter(models.UserInDB.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.UserInDB(username=user.username, hashed_password=get_password_hash(user.password))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_animal(db: Session, animal: schemas.AnimalCreate):
    db_animal = models.Animal(**animal.dict())
    db.add(db_animal)
    db.commit()
    db.refresh(db_animal)
    return db_animal

def get_animals(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Animal).offset(skip).limit(limit).all()