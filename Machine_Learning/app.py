from flask import Flask, jsonify, request
import pandas as pd
import numpy as np
import tensorflow as  tf
from tensorflow import keras
from tensorflow.keras import layers
import json
from urllib.request import urlopen
from tensorflow.keras.models import load_model

app = Flask(__name__)

# Load model
model = load_model('./model')
print('test')
#Load Dataset
place = pd.read_csv('../Cloud_Computing/dataset/place.csv')
rating = pd.read_csv('../Cloud_Computing/dataset/rating.csv')
df = rating.copy()
place_df = place[['Place_Id','Place_Name','Category','Rating','Price']]

def dict_encoder(col, data=df):

  # Mengubah kolom suatu dataframe menjadi list tanpa nilai yang sama
  unique_val = data[col].unique().tolist()

  # Melakukan encoding value kolom suatu dataframe ke angka
  val_to_val_encoded = {x: i for i, x in enumerate(unique_val)}

  # Melakukan proses encoding angka ke value dari kolom suatu dataframe
  val_encoded_to_val = {i: x for i, x in enumerate(unique_val)}
  return val_to_val_encoded, val_encoded_to_val

@app.route('/predict/<id>')
def predict(id):
    int_id = int(id)
    place_to_place_encoded, place_encoded_to_place = dict_encoder('Place_Id')
    user_to_user_encoded, user_encoded_to_user = dict_encoder('User_Id')
    place_visited_by_user = df[df.User_Id == int_id]
    place_not_visited = place_df[~place_df['Place_Id'].isin(place_visited_by_user.Place_Id.values)]['Place_Id'] 
    place_not_visited = list(set(place_not_visited).intersection(set(place_to_place_encoded.keys())))
 
    # place_not_visited = [[place_to_place_encoded.get(x)] for x in place_not_visited]
    user_encoder = user_to_user_encoded.get(int_id)
    place_not_visited = np.array([[place_to_place_encoded.get(x)] for x in place_not_visited], dtype=np.int64)
    user_encoder_list = [[user_encoder]] * len(place_not_visited)
    user_encoder_array = np.array(user_encoder_list,dtype=np.int64)
    # user_place_array = np.hstack(([[user_encoder]] * len(place_not_visited), place_not_visited), dtype=np.int64)
    user_place_array = np.hstack((user_encoder_array,place_not_visited))

    tipe = np.dtype(user_place_array[0][0])
    print(tipe)
    ratings = model.predict(user_place_array).flatten()
    top_ratings_indices = ratings.argsort()[-7:][::-1]
    recommended_place_ids = [
        place_encoded_to_place.get(place_not_visited[x][0]) for x in top_ratings_indices
    ]
    # json_place = json.dumps(recommended_place_ids)
    list_json = []
    for i in recommended_place_ids:
       list_json.append({'Place_Id':i})
    return jsonify(list_json)
    

if __name__ == '__main__':
    app.run(debug=True)