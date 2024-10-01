from pydantic import BaseModel

# Model for creating a new user
class UserCreate(BaseModel):
    username: str  
    password: str  

# Model for a user with an ID
class User(BaseModel):
    id: int  
    username: str  

    class Config:
        # Allows the model to be populated from ORM objects or other objects with attributes
        from_attributes = True  # Configures model behavior

# Base model for animals
class AnimalBase(BaseModel):
    name: str  
    species: str  

# Model for creating a new animal, inherits from AnimalBase
class AnimalCreate(AnimalBase):
    pass  # No additional fields, just inherits from AnimalBase

# Model for an animal with an ID, inherits from AnimalBase
class Animal(BaseModel):
    id: int  
    name: str
    species: str

    class Config:
        # Allows the model to be populated from ORM objects or other objects with attributes
        from_attributes = True  # Configures model behavior
