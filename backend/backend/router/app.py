from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .health.router import router as health_router
from .room.router import router as room_router

app = FastAPI(
    title="i7E Server",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api/v1")
app.include_router(room_router, prefix="/api/v1")


@app.get("/")
async def root():
    return {"message": "Welcome to i7E"}
