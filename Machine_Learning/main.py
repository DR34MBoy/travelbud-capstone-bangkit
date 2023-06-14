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
url_1 = "https://asia-southeast2-travelbud-c23ps150.cloudfunctions.net/api/places"
response_1 = urlopen(url_1)
data_json_1 = json.loads(response_1.read())
place = pd.DataFrame(data_json_1)

url_2 = "https://asia-southeast2-travelbud-c23ps150.cloudfunctions.net/api/ratings"
response_2 = urlopen(url_2)
data_json_2 = json.loads(response_2.read())
rating = pd.DataFrame(data_json_2)

df = rating.copy()
place_df = place[['Place_Id','Place_Name','Category','Rating','Price']]

def dict_encoder(col, data=df):

    unique_val = data[col].unique().tolist()

    val_to_val_encoded = {x: i for i, x in enumerate(unique_val)}

    val_encoded_to_val = {i: x for i, x in enumerate(unique_val)}
    return val_to_val_encoded, val_encoded_to_val

## Routes
@app.route('/predict/<id>', methods=['POST'])
def predict(id):
    int_id = int(id)
    place_to_place_encoded, place_encoded_to_place = dict_encoder('Place_Id')
    user_to_user_encoded, user_encoded_to_user = dict_encoder('User_Id')
    place_visited_by_user = df[df.User_Id == int_id]
    place_not_visited = place_df[~place_df['Place_Id'].isin(place_visited_by_user.Place_Id.values)]['Place_Id'] 
    place_not_visited = list(set(place_not_visited).intersection(set(place_to_place_encoded.keys())))
 
    user_encoder = user_to_user_encoded.get(int_id)
    place_not_visited = np.array([[place_to_place_encoded.get(x)] for x in place_not_visited], dtype=np.int64)
    user_encoder_list = [[user_encoder]] * len(place_not_visited)
    user_encoder_array = np.array(user_encoder_list,dtype=np.int64)
    user_place_array = np.hstack((user_encoder_array,place_not_visited))

    ratings = model.predict(user_place_array).flatten()
    top_ratings_indices = ratings.argsort()[-10:][::-1]
    recommended_place_ids = [
        place_encoded_to_place.get(place_not_visited[x][0]) for x in top_ratings_indices
    ]
    print(recommended_place_ids)
    df_response = place[place['Place_Id'].isin(recommended_place_ids)]
    list_json = []
    for i in df_response.index:
        place_id = int(df_response['Place_Id'][i])
        price = int(df_response['Price'][i])
        rating = float(df_response['Rating'][i])
        list_json.append({"Place_Id":place_id,"Place_Name":df_response['Place_Name'][i],
                        "Category":df_response['Category'][i],"Description":df_response['Description'][i],
                        "Price":price,"Rating":rating})

    return jsonify(list_json)


@app.route('/search', methods=['POST'])
def post_data():
    data = request.get_json() 
    query_field = data.get('Place_Name')
    query_result = place[place['Place_Name'] == query_field]
    queried_data = query_result.to_dict(orient='records')

    return jsonify(queried_data[0])


@app.route('/filter', methods=['POST'])
def filter_data():
    filter_data = request.get_json()  

    price_low = filter_data.get('Price_low')
    price_high = filter_data.get('Price_high')
    category = filter_data.get('Category')

    filtered_destinations = []
    length = len(place)

    for i in range(0,length):
        if place.Price[i]>= price_low and place.Price[i] <= price_high and place.Category[i] == category:
            Place_Id = float(place.Place_Id[i])
            Rating = float(place.Rating[i])
            Price = int(place.Price[i])
            destination = {
                'Place_Id': Place_Id,
                'Place_Name': place.Place_Name[i],
                'City': place.City[i],
                'Category': place.Category[i],
                'Description': place.Description[i],
                'Price': Price,
                'Rating': Rating
            }
            filtered_destinations.append(destination)
    
    return jsonify(filtered_destinations)

if __name__ == '__main__':
    app.run(debug=True)