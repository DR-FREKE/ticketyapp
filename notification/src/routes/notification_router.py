from fastapi import APIRouter, Depends, Request, HTTPException;
from typing import Any, Optional


router = APIRouter(
    prefix="/notification",
    tags=["notification"],
    # dependencies=[Depends(get_header_token)],
    responses={404: {"description": "Not Found"}}
);


fake_items_db = {"plumbus": {"name": "Plumbus"}, "gun": {"name": "Portal Gun"}}


@router.get("/all_messages")
async def get_all_notification(req: Request):
    return {"req": req.currentUser}

@router.get("/all_messages/{item_id}")
async def get_notification_by_id(item_id:int)->None:
    return {"item_id":item_id}