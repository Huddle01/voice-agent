import os

from dotenv import load_dotenv

load_dotenv()

ENV_SPEC = {
    "environment": {
        "env_name": "ENVIRONMENT",
        "required": True,
        "type": str,
    },
    "listen_port": {
        "env_name": "LISTEN_PORT",
        "required": True,
        "type": int,
    },
    "log_level": {
        "env_name": "LOG_LEVEL",
        "required": False,
        "type": str,
    },
    "huddle_api_key": {
        "env_name": "HUDDLE_API_KEY",
        "required": True,
        "type": str,
    },
    "huddle_project_id": {
        "env_name": "HUDDLE_PROJECT_ID",
        "required": True,
        "type": str,
    },
    "gemini_api_key": {
        "env_name": "GEMINI_API_KEY",
        "required": True,
        "type": str,
    },
    "room_id": {
        "env_name": "ROOM_ID",
        "required": True,
        "type": str,
    },
}


# Helper Class to hold loaded environment variables
class EnvironmentVariables:
    """
    A class to hold loaded environment variables, providing attribute-style access and auto-completion.
    """

    def __init__(self, env_vars_dict):
        self._env_vars = env_vars_dict

    @property
    def log_level(self) -> str:
        return self._env_vars["log_level"]

    @property
    def environment(self) -> str:
        return self._env_vars["environment"]

    @property
    def is_development(self) -> bool:
        return self.environment == "development"

    @property
    def huddle_api_key(self) -> str:
        return self._env_vars["huddle_api_key"]

    @property
    def huddle_project_id(self) -> str:
        return self._env_vars["huddle_project_id"]

    @property
    def gemini_api_key(self) -> str:
        return self._env_vars["gemini_api_key"]

    @property
    def room_id(self) -> str:
        return self._env_vars["room_id"]

    @property
    def optional_feature_flag(self) -> bool:
        return self._env_vars["optional_feature_flag"]

    @property
    def listen_port(self) -> int:
        return self._env_vars["listen_port"]


# Function to load environment variables based on a declarative specification
def load_env_variables_declarative(env_spec) -> EnvironmentVariables:
    """
    Loads and validates environment variables based on a declarative specification.
    (Same as before - function remains unchanged)
    """
    loaded_vars = {}
    missing_vars = []

    for var_key, var_config in env_spec.items():
        env_name = var_config["env_name"]
        required = var_config.get("required", True)
        expected_type = var_config.get("type", str)
        default_value = var_config.get("default")

        env_value_str = os.getenv(env_name)

        if env_value_str is None:
            if required:
                missing_vars.append(env_name)
                continue
            else:
                env_value = default_value
        else:
            env_value = env_value_str

        if expected_type is not None:
            try:
                if expected_type is bool:
                    env_value = (
                        env_value_str.lower() in ("true", "1", "yes")
                        if env_value_str
                        else False
                    )
                elif expected_type is int:
                    env_value = int(env_value_str) if env_value_str else None
                elif expected_type is float:
                    env_value = float(env_value_str) if env_value_str else None
                else:
                    env_value = expected_type(env_value_str)
            except (ValueError, TypeError):
                raise TypeError(
                    f"Environment variable '{env_name}' should be of type '{expected_type.__name__}', but got value '{env_value_str}' which cannot be converted."
                )

        loaded_vars[var_key] = env_value

    if missing_vars:
        raise ValueError(
            f"The following required environment variables are not set: {', '.join(missing_vars)}"
        )

    return EnvironmentVariables(loaded_vars)


env = load_env_variables_declarative(ENV_SPEC)
