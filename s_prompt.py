import re, json, os
from server import PromptServer
from aiohttp import web
class ScenarioPrompt:
  def __init__(self):
    pass

  @classmethod
  def INPUT_TYPES(s):
    """
    Character : NovelAI - 태그[인물]
    Face : NovelAI - 태그[외모]
    Body_type : NovelAI - 태그[체형]
    Fashion : NovelAI - 태그[의상]
    Accessory : NovelAI - 태그[장신구]
    Action : NovelAI - 태그[동작 1] , NovelAI - 태그[동작 2], NovelAI - 태그[행동]
    """
    fields = ["Character", "Face", "Body_type", "Fashion", "Accessory", "Action", "point_of_view", "Background", "Light"]
    
    required = {"Base": ("STRING", {"multiline": True, "default": ""})}
    optional = {field: ("STRING", {"multiline": True}) for field in fields}
    
    return {"required": required, "optional": optional}
  
  RETURN_TYPES = ("STRING",)
  RETURN_NAMES = ("text",)
  OUTPUT_NODE = False
  FUNCTION = "executor"
  CATEGORY = "utils"

  def executor(self,Base,Character,Face,Body_type,Fashion,Accessory,Action,point_of_view,Background,Light):
    def merge_commas(string):
      pattern = r',\s*,|,\s*,\s*,'
      modified_string = re.sub(pattern, ',', string)
      return modified_string
    
    result_components = [Base, Character, Face, Body_type, Fashion, Accessory, Action, point_of_view, Background, Light]
    result_prompt = ', '.join(component for component in result_components if component)

    result_prompt = merge_commas(result_prompt)
    return (result_prompt,)


NODE_CLASS_MAPPINGS = {
  "ScenarioPrompt": ScenarioPrompt,
}

NODE_DISPLAY_NAME_MAPPINGS = {
  "ScenarioPrompt": "Scenario Prompt"
}