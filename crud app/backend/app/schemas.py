from pydantic import BaseModel  # Import the BaseModel class from Pydantic

class ItemBase(BaseModel):  # Define a base model class for items
    title: str  
    description: str

class ItemCreate(ItemBase):  # Define a model for creating items, inheriting from ItemBase
    pass  # No additional fields, just inherits from ItemBase

class Item(ItemBase):  # Define a model for items with an ID, inheriting from ItemBase
    id: int  # ID of the item, must be an integer

    class Config:  # Configuration class for the Item model
        orm_mode = True  # Enable ORM mode to allow compatibility with ORMs like SQLAlchemy
