# Import uvicorn for running the app
import uvicorn

# Check if the script is run directly (not imported as a module)
if __name__ == "__main__":
    # Run the FastAPI app using uvicorn
    # 'app.api:app' specifies the module and app instance to run
    # 'host' and 'port' define the server's address and port
    # 'reload=True' enables auto-reloading of the server on code changes
    uvicorn.run("app.api:app", host="0.0.0.0", port=8000, reload=True)