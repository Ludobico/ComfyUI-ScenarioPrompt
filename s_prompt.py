class ScenarioPrompt:
  def __init__():
    pass

  @classmethod
  def INPUT_TYPE(s):
    return {
      "required": {
        "base" : ("STRING", {
          "multiline" : False
        }),
        "Character" : ("STRING"),
        "Face" : ("STRING"),
        "Body type" : ("STRING"),
        "Fashion" : ("STRING"),
        "Accessory" : ("STRING"),
        "Action" : ("STRING"),
        "point of view" : ("STRING"),
        "Background" : ("STRING"),
        "Light" : ("STRING"),
      }
    }
  
  RETURN_TYPES = ("STRING")
  RETURN_NAMES = ("text")

  