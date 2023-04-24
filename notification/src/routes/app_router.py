from fastapi import APIRouter;
from . import notification_router

router = APIRouter();

router.include_router(notification_router.router, prefix="/", tags=["notification"])