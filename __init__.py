import importlib.util
import os
from aiohttp import web
from server import PromptServer
from .s_prompt import NODE_CLASS_MAPPINGS, NODE_DISPLAY_NAME_MAPPINGS

cur_dir = os.getcwd()
server_path = os.path.join(cur_dir, 'ComfyUI', 'server.py')

WEB_DIRECTORY = './web'
__all__ = ['NODE_CLASS_MAPPINGS', 'NODE_DISPLAY_NAME_MAPPINGS', 'WEB_DIRECTORY']

