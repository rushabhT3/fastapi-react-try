# Some Info

Uvicorn is an ASGI (Asynchronous Server Gateway Interface) web server implementation for Python. It is designed to serve fast, asynchronous web applications.

## To Run
- Create a virtual environment Navigate to your project directory and create a new virtual environment. You can name it anything you like, but in this example, we’ll call it venv:
```bash
virtualenv venv
```
Activate the virtual environment Now, you can activate the virtual environment using the following command:
*On Windows:*
```bash
source ./venv/Scripts/activate
```
**On powershell:**
```bash
 venv\Scripts\activate
```
*On Unix or MacOS:*
```bash
source venv/bin/activate
```

following meaning that app folder contains main.py which will have the app instance that needs to run
```bash
uvicorn app.main:app --reload```

## 1. API Request Flow
- Incoming data is validated against Pydantic models.
- Valid data is then used to create or update SQLAlchemy model instances.

## 2. API Response Flow
- Data retrieved from the database (SQLAlchemy models) is converted to Pydantic models.
- Pydantic models are then serialized to JSON for API responses.

## Serialization and Deserialization

Serialization and deserialization are processes of converting data between different formats. In the context of web APIs:

- **Serialization**: Converting Python objects (like ORM models) into a format that can be easily transmitted or stored, typically JSON.
- **Deserialization**: Converting received data (typically JSON) into Python objects that your application can work with.

### Between JSON and Database

Pydantic acts as an intermediary layer. It ensures that data going into the database is valid and properly formatted. When retrieving data from the database, it helps structure the data for consistent API responses.

## What is a Session?

A SQLAlchemy Session is an object that manages database connections and transactions. It's the primary interface for persisting and loading data in SQLAlchemy ORM.

## How Session is Used in Your FastAPI App

In your code:

```python
from sqlalchemy.orm import Session
from .database import get_db

@router.post("/items/", response_model=schemas.Item)
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    return crud.create_item(db=db, item=item)
```

Here's what's happening:

1. `db: Session = Depends(get_db)`: This creates a new database session for each request.
2. `get_db` is a dependency that yields a session.
3. The session is passed to your CRUD functions (e.g., `crud.create_item`).

## The Lifecycle of a Session

1. **Creation**: When a request comes in, `get_db` creates a new session.
2. **Usage**: The session is used in your route function (passed to CRUD operations).
3. **Closure**: After the response is sent, FastAPI ensures the session is closed.

## Why Use Session as a Dependency?

1. **Scoped to the Request**: Each request gets its own session, ensuring isolation.
2. **Automatic Cleanup**: FastAPI handles closing the session, preventing resource leaks.
3. **Testability**: Easy to mock or replace the session in tests.
