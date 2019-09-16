import requests
from sys import stdout
import json

titleList = ["acute_bronchitis",
			"acute_respiratory_distress_syndrome",
			"asbestosis",
			"asthma",
			"bronchiectasis",
			"bronchiolitis",
			"byssinosis",
			"coccidioidomycosis",
			"cystic_fibrosis",
			"emphysema",
			"hantavirus_pulmonary_syndrome",
			"histoplasmosis",
			"human_metapneumovirus",
			"hypersensitivity_peumonitis",
			"influenza",
			"lung_cancer",
			"lymphangioleiomyomatosis",
			"mesothelioma",
			"middle_eastern_respiratory_syndrome",
			"nontuberculosis_mycobacteria",
			"pneumonia",
			"primary_ciliary_dyskinesia",
			"respiratory_syncytial_virus",
			"sarcoidosis",
			"severe_acute_respiratory_syndrome",
			"silicosis",
			"sleep_apnea",
			"sudden_infant_death_syndrome",
			"tuberculosis",
			]

def gatherDiseaseInfo(title):
	url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&redirects=1&titles=Acute_bronchitis"
	response = requests.get(url)
	response.json()
	answer = json.loads(response.text)
	return answer.get('query')

i = 0
while i < len(titleList):

	f = open("disease_" + titleList[i] + ".csv", "w+")
	json.dump(gatherDiseaseInfo(titleList[i]), f)
	i += 1
	f.close()
