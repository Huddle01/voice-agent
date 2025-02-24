import asyncio

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


async def join_room(room_id: str):
    rtc_options = RTCOptions(
        api_key=env.huddle_api_key,
        project_id=env.huddle_project_id,
        room_id=room_id,
        role=Role.HOST,
        metadata={"displayName": "Host"},
        huddle_client_options=HuddleClientOptions(
            autoConsume=False, volatileMessaging=False
        ),
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

    # Connect the agent to the room
    await llm.connect()

    # Agent Joins the Room
    room = await agent.join()

    @room.on(RoomEvents.RemoteProducerAdded)
    def on_remote_producer_added(data: RoomEventsData.RemoteProducerAdded):
        logger.info(f"Remote Producer Added: {data['producer_id']}")
        if data["label"] == "audio":
            asyncio.create_task(
                agent.rtc.consume(
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

            llm.conversation.add_track(data["consumer_id"], track)

    # Room Events
    @room.on(RoomEvents.RoomJoined)
    def on_room_joined():
        logger.info("Room Joined")

    await agent.connect()

    if agent.audio_track is not None:
        await agent.rtc.produce(
            options=ProduceOptions(
                label="audio",
                track=agent.audio_track,
            )
        )
