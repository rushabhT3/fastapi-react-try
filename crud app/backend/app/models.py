from sqlalchemy import Column, Integer, String  # Import necessary classes from SQLAlchemy

from .database import Base  # Import the Base class from the local database module

class Item(Base):  # Define the Item class, inheriting from Base
    __tablename__ = "items"  # Specify the name of the database table

    id = Column(Integer, primary_key=True, index=True)  # Define the id column as an integer, primary key, and indexed
    title = Column(String, index=True)  # Define the title column as a string and indexed
    description = Column(String, index=True)  # Define the description column as a string and indexed


