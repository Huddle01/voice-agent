from fastapi import APIRouter, HTTPException, status

from backend.agent import Role, VoiceAgent, VoiceAgentOptions
from backend.store import store

from .schema import JoinRoomRequest, JoinRoomResponse

router = APIRouter(
    prefix="/flow",
    tags=["flow"],
    responses={404: {"description": "Flow for an Agent to Join a Room."}},
)


@router.get(
    "/join-room", status_code=status.HTTP_200_OK, response_model=JoinRoomResponse
)
async def agent_join_room(item: JoinRoomRequest):
    """
    Flow for an Agent to Join a Room.
    """
    try:
        room_id = item.room_id

        agent_exists = await store.get_agent(room_id)
        if agent_exists is not None and agent_exists.peer_id is None:
            return ValueError(
                "Agent is not created, make sure to create the Agent before joining the Room"
            )

        if agent_exists is not None and agent_exists.peer_id is not None:
            return JoinRoomResponse(room_id=room_id, agent_peer_id=agent_exists.peer_id)

        voice_agent_options = VoiceAgentOptions(
            room_id=room_id, role=Role.HOST, metadata={"displayName": "Agent"}
        )

        agent = VoiceAgent(voice_agent_options)

        await store.set_agent(room_id, agent)

        peer_id = await agent.join_room()

        return JoinRoomResponse(room_id=room_id, agent_peer_id=peer_id)

    except ValueError as e:
        return HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        return HTTPException(status_code=500, detail=str(e))
