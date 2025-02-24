from pydantic import BaseModel


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
