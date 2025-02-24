import logging
import os
from typing import Literal, Union

LogLevel = Literal["debug", "info", "warning", "error", "critical"]

logger = logging.getLogger("Server")


def get_log_level():
    """
    Get the log level.

    Returns:
        str: Log level.
    """
    return os.getenv("LOG_LEVEL", "info").lower()


def get_child_logger(name: str, level_str: LogLevel = "info") -> logging.Logger:
    """
    Get a child logger with the specified name and log level.

    Args:
        name: Name of the child logger
        level_str: Log level for the child logger

    Returns:
        logging.Logger: Child logger
    """
    child_logger = logger.getChild(name)
    child_logger.setLevel(convert_to_log_level(level_str))
    return child_logger


def convert_to_log_level(level_str: str) -> Union[int, str]:
    """
    Convert string log level to logging constant.

    Args:
        level_str: String representation of log level

    Returns:
        Logging level constant or original string for uvicorn

    Examples:
        >>> get_log_level("INFO")
        20
        >>> get_log_level("debug")
        10
    """
    level_map = {
        "debug": logging.DEBUG,
        "info": logging.INFO,
        "warning": logging.WARNING,
        "error": logging.ERROR,
        "critical": logging.CRITICAL,
    }

    normalized = level_str.lower()
    return level_map.get(normalized, logging.INFO)


def setup_logging():
    """Configure logging for the application."""
    log_level_str = get_log_level()

    log_level = convert_to_log_level(log_level_str)

    # Configure root logger
    logging.basicConfig(
        level=log_level,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )

    # Configure our app logger
    logger.setLevel(log_level)
    logger.info(f"Logging configured at level: {log_level_str.upper()}")
