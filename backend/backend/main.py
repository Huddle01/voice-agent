import asyncio

from backend.utils import env


async def main():
    print(env.huddle_api_key)
    print(env.huddle_project_id)
    print(env.gemini_api_key)
    print(env.room_id)

if __name__ == "__main__":
    asyncio.run(main())
    