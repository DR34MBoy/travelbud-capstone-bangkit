from flask import Flask, jsonify, request
from urllib.request import urlopen
import pandas as pd
import json

url_1 = "http://localhost:8080/api/places"
response_1 = urlopen(url_1)
data_json_1 = json.loads(response_1.read())
place = pd.DataFrame(data_json_1)

url_2 = "http://localhost:8080/api/ratings"
response_2 = urlopen(url_2)
data_json_2 = json.loads(response_2.read())
rating = pd.DataFrame(data_json_2)

app = Flask(__name__)

@app.route('/api', methods=['POST'])
def post_data():
    data = request.get_json() 
    query_field = data.get('Place_Name')

    query_result = place[place['Place_Name'] == query_field]
    

    queried_data = query_result.to_dict(orient='records')

    return jsonify(queried_data[0])

if __name__ == '__main__':
    app.run()