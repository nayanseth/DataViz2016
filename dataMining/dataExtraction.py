import json

with open('data_new.json') as data_file:
	data=json.load(data_file)
	print(data[4])
