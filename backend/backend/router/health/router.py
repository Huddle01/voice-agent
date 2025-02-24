from fastapi import APIRouter

router = APIRouter(
    prefix="/healthz",
    tags=["health"],
    responses={404: {"description": "Method Not found"}},
)


@router.get("/")
async def read_items():
    return {"message": "Server is running"}
