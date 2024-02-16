import re
class ScenarioPrompt:
  def __init__(self):
    pass

  @classmethod
  def INPUT_TYPES(s):
    return {
      "required" : {
          "Base" : ("STRING", {
          "multiline" : True,
          "default": ""
        }),
      },
      "optional": {
        "Character" : ("STRING", {
          "multiline" : True,
        }),
        "Face" : ("STRING", {
          "multiline" : True,
        }),
        "Body_type" : ("STRING", {
          "multiline" : True,
        }),
        "Fashion" : ("STRING", {
          "multiline" : True,
        }),
        "Accessory" : ("STRING", {
          "multiline" : True,
        }),
        "Action" : ("STRING", {
          "multiline" : True,
        }),
        "point_of_view" : ("STRING", {
          "multiline" : True,
        }),
        "Background" : ("STRING", {
          "multiline" : True,
        }),
        "Light" : ("STRING", {
          "multiline" : True,
        }),
      }
    }
  
  RETURN_TYPES = ("STRING",)
  RETURN_NAMES = ("prompt",)
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
    print("-"*40)
    print(result_prompt)
    print("-"*40)
    return (result_prompt,)


NODE_CLASS_MAPPINGS = {
  "ScenarioPrompt": ScenarioPrompt,
}

NODE_DISPLAY_NAME_MAPPINGS = {
  "ScenarioPrompt": "Scenario Prompt"
}