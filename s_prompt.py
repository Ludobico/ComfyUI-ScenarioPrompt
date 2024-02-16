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
          "default": ""
        }),
        "Face" : ("STRING", {
          "multiline" : True,
          "default": ""
        }),
        "Body_type" : ("STRING", {
          "multiline" : True,
          "default": ""
        }),
        "Fashion" : ("STRING", {
          "multiline" : True,
          "default": ""
        }),
        "Accessory" : ("STRING", {
          "multiline" : True,
          "default": ""
        }),
        "Action" : ("STRING", {
          "multiline" : True,
          "default": ""
        }),
        "point_of_view" : ("STRING", {
          "multiline" : True,
          "default": ""
        }),
        "Background" : ("STRING", {
          "multiline" : True,
          "default": ""
        }),
        "Light" : ("STRING", {
          "multiline" : True,
          "default": ""
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
    
    result_prompt = f"{Base}, {Character}, {Face}, {Body_type}, {Fashion}, {Accessory}, {Action}, {point_of_view}, {Background}, {Light}"

    result_prompt = merge_commas(result_prompt)
    print(result_prompt)
    return (result_prompt)


NODE_CLASS_MAPPINGS = {
  "ScenarioPrompt": ScenarioPrompt,
}

NODE_DISPLAY_NAME_MAPPINGS = {
  "ScenarioPrompt": "Scenario Prompt"
}