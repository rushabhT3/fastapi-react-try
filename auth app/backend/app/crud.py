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
    db_animal = models.AnimalInDB(**animal.dict())
    db.add(db_animal)
    db.commit()
    db.refresh(db_animal)
    return db_animal

def get_animals(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.AnimalInDB).offset(skip).limit(limit).all()

def add_favorite_animal(db: Session, user_id: int, animal_id: int):
    user = db.query(models.UserInDB).filter(models.UserInDB.id == user_id).first()
    animal = db.query(models.AnimalInDB).filter(models.AnimalInDB.id == animal_id).first()
    if user and animal:
        user.favorite_animals.append(animal)
        db.commit()
        return True
    return False

def remove_favorite_animal(db: Session, user_id: int, animal_id: int):
    user = db.query(models.UserInDB).filter(models.UserInDB.id == user_id).first()
    animal = db.query(models.AnimalInDB).filter(models.AnimalInDB.id == animal_id).first()
    if user and animal and animal in user.favorite_animals:
        user.favorite_animals.remove(animal)
        db.commit()
        return True
    return False

def get_favorite_animals(db: Session, user_id: int):
    user = db.query(models.UserInDB).filter(models.UserInDB.id == user_id).first()
    if user:
        return user.favorite_animals
    return []
