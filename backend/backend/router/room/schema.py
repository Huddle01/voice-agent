from typing import Optional

from pydantic import BaseModel


# Request and response bodies for creating a room
class JoinRoomRequest(BaseModel):
    """
    Request body for joining a room
    """

    room_id: str


class JoinRoomResponse(BaseModel):
    """
    Response body for joining a room
    """

    room_id: str

    agent_peer_id: str


# ---------- END ----------


class VoiceAgentInfoRequest(BaseModel):
    """
    Request body for getting agent info
    """

    room_id: str


class VoiceAgentInfoResponse(BaseModel):
    """
    Response body for getting agent info
    """

    room_id: str

    agent_peer_id: Optional[str]
