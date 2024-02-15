import re
class ScenarioPrompt:
  def __init__():
    pass

  @classmethod
  def INPUT_TYPE(s):
    return {
      "optional": {
        "Base" : ("STRING", {
          "multiline" : True
        }),
        "Character" : ("STRING"),
        "Face" : ("STRING"),
        "Body_type" : ("STRING"),
        "Fashion" : ("STRING"),
        "Accessory" : ("STRING"),
        "Action" : ("STRING"),
        "point_of_view" : ("STRING"),
        "Background" : ("STRING"),
        "Light" : ("STRING"),
      }
    }
  
  RETURN_TYPES = ("STRING")
  RETURN_NAMES = ("prompt")
  OUTPUT_NODE = False
  FUNCTION = "executor"
  CATEGORY = "Scenario Prompt"

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
  "ScenarioPrompt": ScenarioPrompt
}

NODE_DISPLAY_NAME_MAPPINGS = {
  "ScenarioPrompt": "Scenario Prompt"
}