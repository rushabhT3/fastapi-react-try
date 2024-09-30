# FastAPI and Uvicorn Guide

## Introduction to Uvicorn

Uvicorn is an ASGI (Asynchronous Server Gateway Interface) web server implementation for Python. It is designed to serve fast, asynchronous web applications.

## Setting Up the Environment

### Create a Virtual Environment

Navigate to your project directory and create a new virtual environment:

```bash
virtualenv venv
```

### Activate the Virtual Environment

Activate the virtual environment using the appropriate command for your operating system:

- Windows (Command Prompt):
  ```bash
  venv\Scripts\activate
  ```

- Windows (PowerShell):
  ```bash
  venv\Scripts\Activate.ps1
  ```

- Unix or MacOS:
  ```bash
  source venv/bin/activate
  ```

## Running the Application

Assuming your app folder contains `main.py` with the app instance:

```bash
uvicorn app.main:app --reload
```

## API Data Flow

### 1. API Request Flow
- Incoming data is validated against Pydantic models.
- Valid data is used to create or update SQLAlchemy model instances.

### 2. API Response Flow
- Data retrieved from the database (SQLAlchemy models) is converted to Pydantic models.
- Pydantic models are serialized to JSON for API responses.

## Serialization and Deserialization

Serialization and deserialization are processes of converting data between different formats:

- **Serialization**: Converting Python objects (like ORM models) into a format that can be easily transmitted or stored, typically JSON.
- **Deserialization**: Converting received data (typically JSON) into Python objects that your application can work with.

Pydantic acts as an intermediary layer between JSON and the database, ensuring data validity and consistent formatting.

## SQLAlchemy Session

### What is a Session?

A SQLAlchemy Session is an object that manages database connections and transactions. It's the primary interface for persisting and loading data in SQLAlchemy ORM.

### Using Session in FastAPI

Example code:

```python
from sqlalchemy.orm import Session
from .database import get_db

@router.post("/items/", response_model=schemas.Item)
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    return crud.create_item(db=db, item=item)
```

### Session Lifecycle

1. **Creation**: A new session is created for each request via `get_db`.
2. **Usage**: The session is used in route functions and passed to CRUD operations.
3. **Closure**: FastAPI ensures the session is closed after the response is sent.

### Benefits of Session as a Dependency

1. **Request Scoping**: Each request gets its own isolated session.
2. **Automatic Cleanup**: FastAPI handles closing the session, preventing resource leaks.
3. **Testability**: Easy to mock or replace the session in tests.

## Partial Updates with `exclude_unset=True`

### Example Scenario

#### Initial Data in Database

```python
db_item = {
    "id": 1,
    "name": "Old Name",
    "description": "Old Description",
    "price": 10.0
}
```

#### Update with `exclude_unset=True`

```python
item_update = ItemUpdate(name="New Name")
update_data = item_update.dict(exclude_unset=True)
# update_data will be {'name': 'New Name'}
```

Result after update:
```python
db_item = {
    "id": 1,
    "name": "New Name",
    "description": "Old Description",
    "price": 10.0
}
```

#### Update without `exclude_unset=True`

```python
update_data = item_update.dict()
# update_data will be {'name': 'New Name', 'description': None, 'price': None}
```

Result after update:
```python
db_item = {
    "id": 1,
    "name": "New Name",
    "description": None,
    "price": None
}
```

### Summary

- **With `exclude_unset=True`**: Only explicitly set fields are updated, preserving other fields.
- **Without `exclude_unset=True`**: All fields are included in the update, potentially overwriting existing values with `None` or defaults.

Using `exclude_unset=True` is crucial for performing partial updates without unintentionally affecting unspecified fields.