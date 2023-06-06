# import urllib library
from urllib.request import urlopen
import pandas as pd
# import json
import json
# store the URL in url as
# parameter for urlopen
url = "http://localhost:8080/api/places"

# store the response of URL
response = urlopen(url)

# storing the JSON response
# from url in data
data_json = json.loads(response.read())

# print the json response
# print(data_json[0])

df = pd.DataFrame(data_json)

print(df)



