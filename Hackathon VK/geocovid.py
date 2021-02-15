import numpy as np
import pandas as pd
import googlemaps
import ujson
from datetime import date, timedelta

class Data():
    
    def __init__(self, google_key, path_to_csv):
        self.dataframe = pd.read_csv(path_to_csv, delimiter=';')
        self.gmaps = googlemaps.Client(key=google_key)
        self.all_regions_coordinates = self.get_region_coordinates()
        
    def get_region_names(self):
        region_names = set()
        for region_name in self.dataframe['Регион']:
            region_names.add(region_name)
        return region_names
    
    def get_region_coordinates(self, required_regions = None):
        regions_coordinates = dict()
        if isinstance(required_regions, str):
            region_names = [required_regions]
        elif isinstance(required_regions,(list, tuple, set)):
            region_names = required_regions
        else:
            region_names = self.get_region_names()  
        for region_name in region_names:
            region_geocode = self.gmaps.geocode(region_name)
            regions_coordinates[region_name] = [
                region_geocode[0]['geometry']['location']['lat'], 
                region_geocode[0]['geometry']['location']['lng']
            ] 
        return regions_coordinates
    
    def get_geocovid_json(self, time_span = None, required_regions = None, use_ascii = False):
        geocovid_json = {
            "type": "FeatureCollection",
            "features": []
        }
        if isinstance(time_span, (list, str)):
            if isinstance(time_span, str):
                time_span = [time_span, time_span]
            first_date = time_span[0].split('.')
            second_date = time_span[1].split('.')
            time_span = [
                date(int(first_date[2]), int(first_date[1]), int(first_date[0])),
                date(int(second_date[2]), int(second_date[1]), int(second_date[0]))
            ]
            if time_span[0] > time_span[1]:
                time_span = [time_span[1], time_span[0]]
        if isinstance(required_regions, str):
            region_names = [required_regions]
        elif isinstance(required_regions,(list, tuple, set)):
            region_names = required_regions
        else:
            region_names = self.get_region_names()
        for line_number in range(len(self.dataframe)):
            line = self.dataframe.loc[line_number]
            if isinstance(required_regions,(list, tuple, set, str)):
                if not (line["Регион"] in region_names):
                    continue
            if isinstance(time_span, list):
                date_information = line["Дата"].split('.')
                date_informatio = date(int(date_information[2]), int(date_information[1]), int(date_information[0]))
                if not (time_span[0] <= date_informatio <= time_span[1]):
                    if date_informatio > time_span[1]:
                        break
                    else:
                        continue 
            region_data = {
                "type": "Feature",
                "properties": {
                    "date": line["Дата"],
                    "region": line["Регион"],
                    "infected": {
                        "all": int(line["Заражений"]),
                        "per_day": int(line["Заражений за день"])
                    },
                    "recovered": {
                        "all": int(line["Выздоровлений"]),
                        "per_day": int(line["Выздоровлений за день"])
                    },
                    "dead": {
                        "all": int(line["Смертей"]),
                        "per_day": int(line["Смертей за день"])
                    }
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": self.all_regions_coordinates[line["Регион"]]
                }
            }
            geocovid_json["features"].append(region_data)  
        return ujson.dumps(geocovid_json, use_ascii)
    
    def save_json(self, json_string, path_to_folder, file_name):
        with open(path_to_folder + "/" + file_name + ".json", 'w') as json_file:
            json_file.write(json_string)
            
    def json_database_generation(self, base_folder, time_span = None, required_regions = None, use_ascii = False):
        if isinstance(time_span, (list, str)):
            if isinstance(time_span, str):
                time_span = [time_span, time_span]
        else:
            time_span = [self.dataframe["Дата"][0], self.dataframe["Дата"][len(self.dataframe["Дата"]) - 1]]
        
        first_date = time_span[0].split('.')
        second_date = time_span[1].split('.')
        time_span = [
            date(int(first_date[2]), int(first_date[1]), int(first_date[0])),
            date(int(second_date[2]), int(second_date[1]), int(second_date[0]))
        ]
        if time_span[0] > time_span[1]:
            time_span = [time_span[1], time_span[0]]
        time = time_span[0]
        while True:
            geocovid_json_string = self.get_geocovid_json((str(time.day) + '.' + str(time.month) + '.' + str(time.year)), required_regions, use_ascii)
            self.save_json(geocovid_json_string, base_folder, (str(time.day) + '.' + str(time.month) + '.' + str(time.year)))
            if time == time_span[1]:
                break
            time += timedelta(days=1)