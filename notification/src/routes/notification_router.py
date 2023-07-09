from fastapi import APIRouter, Depends, HTTPException;
from typing import Any, Optional
import matplotlib.pyplot as plt

router = APIRouter(
    prefix="/notification",
    tags=["notification"],
    # dependencies=[Depends(get_header_token)],
    responses={404: {"description": "Not Found"}}
);

fake_items_db = {"plumbus": {"name": "Plumbus"}, "gun": {"name": "Portal Gun"}}


@router.get("/all_messages")
async def get_all_notification()->dict[str, dict[str, str]]:
    return fake_items_db

@router.get("/all_messages/{item_id}")
async def get_notification_by_id(item_id:int)->None:
    return {"item_id":item_id}