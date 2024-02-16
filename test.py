import re
from typing import Optional
def executor(Base = "",Character= "",Face= "",Body_type= "",Fashion= "",Accessory= "",Action= "",point_of_view= "",Background= "",Light= ""):
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

if __name__ == "__main__":
  executor(Base="masterpiece", Character="llama", point_of_view="front view", Background="look at the viewer, many books on the table")