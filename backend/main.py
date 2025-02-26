import asyncio

import uvicorn

from backend.router.app import app
from backend.utils import env, logger
from backend.utils.logger import get_log_level, setup_logging


async def main():
    try:
        setup_logging()

        config = uvicorn.Config(
            app=app,
            host=env.host,
            port=env.listen_port,
            workers=1,
            reload=True,
            log_level=get_log_level(),
        )

        logger.info(
            f"Starting server on {env.host}:{env.listen_port}, reload=True, workers=1"
        )

        server = uvicorn.Server(config)
        await server.serve()

    except KeyboardInterrupt:
        print("Exiting...")

    except Exception as e:
        logger.error(e)


if __name__ == "__main__":
    asyncio.run(main())
