from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship

from .database import Base

user_favorite_animals = Table(
    'user_favorite_animals',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('animal_id', Integer, ForeignKey('animals.id'))
)

class UserInDB(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    favorite_animals = relationship("AnimalInDB", secondary=user_favorite_animals, back_populates="favorited_by")

class AnimalInDB(Base):
    __tablename__ = "animals"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    species = Column(String, index=True)
    favorited_by = relationship("UserInDB", secondary=user_favorite_animals, back_populates="favorite_animals")