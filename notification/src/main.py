from sys import prefix;
from fastapi import FastAPI, Depends, Request;
# import uvicorn;
from fastapi.middleware.cors import CORSMiddleware;
from .routes import app_router
from starlette.middleware.sessions import SessionMiddleware

# initialize fastapi
app = FastAPI(openapi_url="/api/v1/notification/openapi.json", docs_url="/api/v1/notification/docs");

"""handle cors error that might come up when a request is sent"""
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
];

# set app middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
);
app.add_middleware(SessionMiddleware, secret_key="SECRET_KEY")


@app.middleware("http")
async def some_middleware(request: Request, call_next):
    response = await call_next(request)
    session = request.cookies.get('session')
    if session:
        request.session["jwt"] = request.cookies.get('session')
        response.set_cookie(key='session', value=request.cookies.get('session'), httponly=False)
    return response


# set route middleware
app.include_router(app_router.router, prefix="/api/v1/notification", tags=["notification"])


@app.get("/api/v1/notification/welcome")
async def root(req: Request):
    return {"message": req.session.get("jwt")}

# not compulsory to do this; just gives us the option to run "python main.py" by other developers
# if __name__ == "__main__":
#     uvicorn.run(app)
