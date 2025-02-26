import asyncio
from dataclasses import dataclass
from typing import Optional

from ai01.agent import Agent, AgentOptions
from ai01.providers.gemini.gemini_realtime import GeminiOptions, GeminiRealtime
from ai01.providers.openai import AudioTrack
from ai01.rtc import (
    HuddleClientOptions,
    ProduceOptions,
    Role,
    RoomEvents,
    RoomEventsData,
    RTCOptions,
)

from backend.utils import env, logger


@dataclass
class VoiceAgentOptions:
    room_id: str
    """
    Room Id of the Room, where the Agent is going to join
    """

    role: Optional[Role] = Role.HOST
    """
    Role of the Agent in the Room, Default is HOST
    """

    metadata: Optional[dict[str, str]] = None
    """
    Metadata of the Agent, Default is None
    """

    huddle_client_options: Optional[HuddleClientOptions] = None
    """
    Huddle Client Options of the Agent, Default is to (
        volatileMessaging=False, autoConsume=True
    )
    """


class VoiceAgent:
    def __init__(self, options: VoiceAgentOptions):
        self._options: VoiceAgentOptions = options

        self._agent, self._llm = self._setup_agent()

    @property
    def peer_id(self):
        """
        peer_id is the unique identifier of the Agent in the Room where its going to be connected.
        """
        local_peer = self._agent.rtc.local_peer

        if local_peer is None:
            return None

        return local_peer.peer_id

    @property
    def room_id(self):
        """
        room_id is the unique identifier of the Room where the Agent is going to be connected.
        """
        return self._options.room_id

    @property
    def role(self):
        return self._options.role

    @property
    def agent(self):
        return self._agent

    @property
    def llm(self):
        return self._llm

    def __str__(self):
        """
        String Representation of the Voice Agent
        """
        return f"VoiceAgent(room_id={self.room_id}, role={self.role})"

    def _setup_agent(self):
        """
        Setup the Agent with the provided options
        """
        rtc_options = RTCOptions(
            api_key=env.huddle_api_key,
            project_id=env.huddle_project_id,
            room_id=self.room_id,
            role=self.role if self.role is not None else Role.BOT,
            metadata=self._options.metadata
            if self._options.metadata is not None
            else {},
            huddle_client_options=self._options.huddle_client_options
            if self._options.huddle_client_options is not None
            else HuddleClientOptions(volatileMessaging=False, autoConsume=True),
        )

        # Create an agent with the RTC options and an audio track
        agent = Agent(
            AgentOptions(rtc_options=rtc_options, audio_track=AudioTrack()),
        )

        # Create a Gemini Realtime instance with the agent and Gemini options
        llm = GeminiRealtime(
            agent=agent,
            options=GeminiOptions(
                gemini_api_key=env.gemini_api_key,
                system_instruction="""### Role
                    You are an AI Customer Support Agent named Sophie, who is responsible for handling customer queries and providing support,
                    Greet the user as they join and ask them how you can help them today, based on the conversation, provide accurate 
                    help and reports, dont start talking bullshit with them which is outside the context of the conversation.
                    ### Context
                    - User: Hi, I have a problem with my order
                    - Sophie: Hi, I'm Sophie, how can I help you today?
                    - User: I ordered a product and it's not working
                    - Sophie: I'm sorry to hear that, can you provide me with the order number?
                    - User: Sure, it's
                    - Sophie: Thank you, let me check that for you
                    - User: ...
                    - Sophie: I see the issue, I'll escalate this to the technical team and they will get back to you soon
                    - User: Thank you
                    """,
            ),
        )

        return agent, llm

    async def join_room(self):
        """
        Joins the Room, setups the required event listeners and produces the audio track if available.

        Returns:
            str: `peer_id` of the Agent in the Room
        """
        # Connect the agent to the room
        await self.llm.connect()

        # Agent Joins the Room
        room = await self.agent.join()

        @room.on(RoomEvents.RemoteProducerAdded)
        def on_remote_producer_added(data: RoomEventsData.RemoteProducerAdded):
            logger.info(f"Remote Producer Added: {data['producer_id']}")
            if data["label"] == "audio":
                asyncio.create_task(
                    self.agent.rtc.consume(
                        peer_id=data["remote_peer_id"], producer_id=data["producer_id"]
                    )
                )

        @room.on(RoomEvents.NewConsumerAdded)
        def on_remote_consumer_added(data: RoomEventsData.NewConsumerAdded):
            logger.info(f"Remote Consumer Added: {data}")

            if data["kind"] == "audio":
                track = data["consumer"].track

                if track is None:
                    logger.error("Consumer Track is None, This should never happen.")
                    return

                self.llm.conversation.add_track(data["consumer_id"], track)

        # Room Events
        @room.on(RoomEvents.RoomJoined)
        def on_room_joined():
            logger.info("Room Joined")

        await self.agent.connect()

        # Produce the audio track if available for the agent.
        if self.agent.audio_track is not None:
            await self.agent.rtc.produce(
                options=ProduceOptions(
                    label="audio",
                    track=self.agent.audio_track,
                )
            )

        peer_id = self.peer_id

        if peer_id is None:
            raise ValueError("Peer Id is None, This should never happen.")

        return peer_id
