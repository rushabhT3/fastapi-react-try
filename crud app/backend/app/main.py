from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from .database import engine, Base
from .routes import router

# Temporary code to drop and recreate the database schema
# Base.metadata.drop_all(bind=engine)
# Base.metadata.create_all(bind=engine)

# models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the router
app.include_router(router)