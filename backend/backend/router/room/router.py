from fastapi import APIRouter, HTTPException, status

from backend.agent import Role, VoiceAgent, VoiceAgentOptions
from backend.store import store

from .schema import (
    JoinRoomRequest,
    JoinRoomResponse,
    VoiceAgentFlushRequest,
    VoiceAgentInfoResponse,
)

router = APIRouter(
    prefix="/flow",
    tags=["flow"],
    responses={404: {"description": "Flow for an Agent to Join a Room."}},
)


@router.put(
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
            room_id=room_id,
            role=Role.HOST,
            metadata={"displayName": "Agent"},
            persona=item.persona,
            initial_query=item.initial_query,
        )

        agent = VoiceAgent(voice_agent_options)

        await store.set_agent(room_id, agent)

        peer_id = await agent.join_room()

        return JoinRoomResponse(room_id=room_id, agent_peer_id=peer_id)

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post(
    "/flush-audio",
    status_code=status.HTTP_200_OK,
    response_model=VoiceAgentInfoResponse,
)
async def flush_audio(
    item: VoiceAgentFlushRequest,
):
    """
    Flush Audio, to clear the audio buffer for the agent
    """

    try:
        agent = await store.get_agent(item.room_id)
        if agent is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Agent does not exist"
            )
        if agent.agent.audio_track is not None:
            agent.agent.audio_track.flush_audio()

        return VoiceAgentInfoResponse(room_id=item.room_id, agent_peer_id=agent.peer_id)

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get(
    "/agent-info", status_code=status.HTTP_200_OK, response_model=VoiceAgentInfoResponse
)
async def get_agent_info(
    room_id: str,
):
    """
    Get Agent Info
    """
    try:
        print(room_id)
        agent = await store.get_agent(room_id)
        if agent is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Agent does not exist"
            )

        return VoiceAgentInfoResponse(room_id=room_id, agent_peer_id=agent.peer_id)

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
