from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Create an instance of the FastAPI class
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

# Define a route for the root URL ("/")
# The 'tags' parameter is used for grouping routes in the API documentation
# grouping them by tags like “users,” “items,” or “auth” can significantly improve the readability and usability of the API documentation
@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your FastAPI app!"}