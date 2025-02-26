from typing import Optional

from pydantic import BaseModel

from backend.agent.persona_prompts import PersonaType


# Request and response bodies for creating a room
class JoinRoomRequest(BaseModel):
    """
    Request body for joining a room
    """

    room_id: str
    """
    Room ID to join
    """

    persona: PersonaType = "Comedian"
    """
    Persona type of the Agent (Professor, Doctor, etc.)
    """

    initial_query: Optional[str] = None
    """
    Initial query from the user (if available)
    """


class JoinRoomResponse(BaseModel):
    """
    Response body for joining a room
    """

    room_id: str

    agent_peer_id: str


# ---------- END ----------


class VoiceAgentFlushRequest(BaseModel):
    """
    Request body for getting agent info
    """

    room_id: str


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
