import os
import pandas as pd

full_path = os.path.dirname(os.path.realpath(__file__))
data_path = os.listdir(os.path.join(full_path,'..','data','csv'))

for data in data_path:
  df = pd.read_csv(os.path.join(full_path,'..','data','csv', data), encoding='utf-8')
  df = df.dropna(subset=[df.columns[0]])
  df = df.rename(columns={df.columns[3]: 'tag', df.columns[2]: 'desc'})

  new_df = df[['tag', 'desc']]

  json_file_name = f'{data.split(".")[0]}.json'
  new_df.to_json(os.path.join(full_path, '..', 'data', json_file_name), orient='records', force_ascii=False, indent=4)

print("done!")