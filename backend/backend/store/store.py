import asyncio
from typing import Dict, List, Optional

from backend.agent import VoiceAgent


# Store class to manage agents
class Store:
    """
    Manages agents, providing thread-safe (asyncio-context safe) access.
    """

    def __init__(self):
        self._agents: Dict[str, VoiceAgent] = {}
        self._lock = asyncio.Lock()  # Asyncio lock for concurrency control

    async def get_agent(self, room_id: str) -> Optional[VoiceAgent]:
        """Retrieves an agent by room_id if it exists, None otherwise."""
        async with self._lock:
            return self._agents.get(room_id)

    async def agent_exists(self, room_id: str) -> bool:
        """Checks if an agent exists for a given room_id."""
        async with self._lock:
            return room_id in self._agents

    async def set_agent(self, room_id: str, agent: VoiceAgent):
        """Stores an agent, associated with a room_id."""
        async with self._lock:
            if room_id in self._agents:
                raise ValueError(f"Agent already exists for room_id {room_id}")

            self._agents[room_id] = agent

    async def remove_agent(self, room_id: str):
        """Removes an agent associated with a room_id, if it exists."""
        async with self._lock:
            if room_id in self._agents:
                del self._agents[room_id]

    async def list_rooms_with_agents(self) -> List[str]:
        """Returns a list of room_ids for which agents are currently active."""
        async with self._lock:
            return list(self._agents.keys())


store = Store()
