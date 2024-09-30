from sqlalchemy import create_engine  # Import the create_engine function from SQLAlchemy
from sqlalchemy.ext.declarative import declarative_base  # Import the declarative_base function for ORM mapping
from sqlalchemy.orm import sessionmaker  # Import sessionmaker for creating database sessions
import os  # Import the os module for environment variable access
from dotenv import load_dotenv  # Import load_dotenv to load environment variables from a .env file

load_dotenv()  # Load environment variables from a .env file

DATABASE_URL = os.getenv("DATABASE_URL")  # Get the database URL from environment variables

engine = create_engine(DATABASE_URL)  # Create a new SQLAlchemy engine instance
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)  # Create a configured "Session" class
Base = declarative_base()  # Create a base class for declarative class definitions


def get_db():  # Define a function to get a database session
    db = SessionLocal()  # Create a new session
    try:
        yield db  # Yield the session to be used in a context
    finally:
        db.close()  # Ensure the session is closed after use
