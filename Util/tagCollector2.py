import os
import pandas as pd

full_path = os.path.dirname(os.path.realpath(__file__))

df = pd.read_csv(os.path.join(full_path, '..', 'data', 'csv', 'NovelAI - 태그[기본].csv'), encoding='utf-8')
df = df.dropna(subset=[df.columns[0]])
df = df.rename(columns={df.columns[3] : 'tag', df.columns[2] : 'desc', df.columns[0] : 'class' })

point_of_view_rows = df[df['class'] == '초점']
background_rows = df[df['class'] == '장소']

new_df1 = point_of_view_rows[['tag', 'desc']]
new_df2 = background_rows[['tag', 'desc']]

json_file_name = 'NovelAI - 태그[시점].json'
new_df1.to_json(os.path.join(full_path, '..', 'data', json_file_name), orient='records', force_ascii=False, indent=4)

json_file_name = 'NovelAI - 태그[장소].json'
new_df2.to_json(os.path.join(full_path, '..', 'data', json_file_name), orient='records', force_ascii=False, indent=4)

print("done!")