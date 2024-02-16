import importlib.util
import os
from .s_prompt import NODE_CLASS_MAPPINGS, NODE_DISPLAY_NAME_MAPPINGS

cur_dir = os.getcwd()
server_path = os.path.join(cur_dir, )

__all__ = ['NODE_CLASS_MAPPINGS', 'NODE_DISPLAY_NAME_MAPPINGS']

