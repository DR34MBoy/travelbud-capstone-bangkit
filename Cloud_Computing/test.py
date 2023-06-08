from urllib.request import urlopen
import pandas as pd
import json

url_1 = "http://localhost:8080/api/places"
response = urlopen(url_1)
data_json = json.loads(response.read())
place = pd.DataFrame(data_json)

url_2 = "http://localhost:8080/api/ratings"
response = urlopen(url_2)
data_json = json.loads(response.read())
rating = pd.DataFrame(data_json)

print(place)
print(rating)




