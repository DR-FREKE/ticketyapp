from sys import prefix;
from fastapi import FastAPI, Depends;
import uvicorn;
from fastapi.middleware.cors import CORSMiddleware;
from .routes import notification_router

# initialize fastapi
app = FastAPI(openapi_url="/api/v1/notification/openapi.json", docs_url="/api/v1/notification/docs");

"""handle cors error that might come up when a request is sent"""
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
];

## set app middleware
app.add_middleware(
    CORSMiddleware, 
    allow_origins=origins, 
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"]
);

## set route middleware
app.include_router(notification_router.router, prefix="/api/v1", tags=["notification"])

@app.get("/api/v1/notification/welcome")
async def root():
    return {"message": "Hello Bigger Applications!"}

## not compulsory to do this; just gives us the option to run "python main.py" by other developers
if __name__ == "__main__":
    uvicorn.run(app)