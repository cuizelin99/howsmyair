from unittest import main,TestCase
import json
import requests
base_url = 'https://api.howsmyair.me/'
class TestBackend(TestCase):

	# Add unit tests here
	# Postman already tests for OK status and is part of the Gitlab CI YAML

	# Test that API Json payload matches the DB Schema

	def test_locations(self):
		response = requests.request('GET', base_url + 'location')
		js = response.json()

		# Are there records in the db?
		self.assertNotEqual(len(js['objects']),0)

		respkeys = set(js['objects'][1].keys())

		# Do the returned objects keys match the schema?
		self.assertEqual(respkeys,{'latitude', 'city', 'state_name', 'density', 'county_name', 'timezone', 
			'related_illnesses', 'id', 'related_pollutants', 'state_id', 'population', 'longitude'})

	def test_illnesslocations(self):
		response = requests.request('GET', base_url + 'illnesslocations')
		js = response.json()

		# Are there records in the db?
		self.assertNotEqual(len(js['objects']),0)

		respkeys = set(js['objects'][1].keys())

		# Do the returned objects keys match the schema?
		self.assertEqual(respkeys,{'city_name', 'illness', 'illnesslocations_id', 'location_id', 'location', 'illness_name'})

	def test_illnesses(self):
		response = requests.request('GET', base_url + 'illness')
		js = response.json()

		# Are there records in the db?
		self.assertNotEqual(len(js['objects']),0)

		respkeys = set(js['objects'][1].keys())

		# Do the returned objects keys match the schema?
		self.assertEqual(respkeys,{'illness_contagious', 'illness_desc', 'related_pollutants', 'illness_image', 
			'related_locations', 'illness_symptoms', 'illness_treatable', 'illness_lethality', 'illness_name','illness_genetic'})

	def test_pollutantillnesses(self):
		response = requests.request('GET', base_url + 'pollutantillnesses')
		js = response.json()

		# Are there records in the db?
		self.assertNotEqual(len(js['objects']),0)

		respkeys = set(js['objects'][1].keys())

		# Do the returned objects keys match the schema?		
		self.assertEqual(respkeys,{'pollutants', 'illness_name', 'pollutant_name', 'illness', 'pollutantillnesses_id'})

	def test_pollutants(self):
		response = requests.request('GET', base_url + 'pollutants')
		js = response.json()
		respkeys = set(js['objects'][1].keys())

		# Are there records in the db?
		self.assertNotEqual(len(js['objects']),0)

		# Do the returned objects keys match the schema?				
		self.assertEqual(respkeys,{'related_locations', 'inhalation_cancer_potency_source', 'inhalation_reference_concentration_units',
			'inhalation_reference_concentration', 'national_ambient_air_quality_std', 'national_ambient_air_quality_std_source', 
			'national_ambient_air_quality_std_units', 'CAS_or_EDF_Substance_ID', 'chemical_name', 'inhalation_cancer_potency_units', 
			'related_illnesses', 'inhalation_cancer_potency', 'chemspider_id', 'inhalation_reference_concentration_source','Nat_Agg_PV'})

	def test_locationpollutants(self):
		response = requests.request('GET', base_url + 'locationpollutants')
		js = response.json()

		# Are there records in the db?
		self.assertNotEqual(len(js['objects']),0)

		respkeys = set(js['objects'][1].keys())

		# Do the returned objects keys match the schema?				
		self.assertEqual(respkeys,{'pollutants', 'location_id', 'city_name', 'locationpollutants_id', 'location', 'pollutant_name'})


	### Test for support of additional query paramters. Query params are formed as json objects: filters and order_by


	def test_location_filter(self):

		# Filter object with filtering for all
		q = "?q={%22filters%22:[{%22name%22:%22city%22,%22op%22:%22like%22,%22val%22:%22%25%25%22}]}"
		response = requests.request('GET', base_url + 'location'+q)
		js = response.json()

		# Are there records in the db?
		self.assertNotEqual(len(js['objects']),0)

		respkeys = set(js['objects'][1].keys())

		# Do the returned objects keys match the schema?
		self.assertEqual(respkeys,{'latitude', 'city', 'state_name', 'density', 'county_name', 'timezone', 
			'related_illnesses', 'id', 'related_pollutants', 'state_id', 'population', 'longitude'})

	def test_location_orderby(self):

		# Filter object with filtering for all
		q = "?q={%22order_by%22:[{%22field%22:%22city%22,%22direction%22:%22asc%22}]}"
		response = requests.request('GET', base_url + 'location'+q)
		js = response.json()

		# Are there records in the db?
		self.assertNotEqual(len(js['objects']),0)

		respkeys = set(js['objects'][1].keys())

		# Do the returned objects keys match the schema?
		self.assertEqual(respkeys,{'latitude', 'city', 'state_name', 'density', 'county_name', 'timezone', 
			'related_illnesses', 'id', 'related_pollutants', 'state_id', 'population', 'longitude'})

	def test_location_filter_orderby(self):

		# Filter object with filtering for all
		q = "?q={%22filters%22:[{%22name%22:%22city%22,%22op%22:%22like%22,%22val%22:%22%25%25%22}],%22order_by%22:[{%22field%22:%22city%22,%22direction%22:%22asc%22}]}"
		response = requests.request('GET', base_url + 'location'+q)
		js = response.json()

		# Are there records in the db?
		self.assertNotEqual(len(js['objects']),0)

		respkeys = set(js['objects'][1].keys())

		# Do the returned objects keys match the schema?
		self.assertEqual(respkeys,{'latitude', 'city', 'state_name', 'density', 'county_name', 'timezone', 
			'related_illnesses', 'id', 'related_pollutants', 'state_id', 'population', 'longitude'})

	### illnesses

	def test_illness_filter(self):

		# Filter object with filtering for all
		q = "?q={%22filters%22:[{%22name%22:%22illness_name%22,%22op%22:%22like%22,%22val%22:%22%25%25%22}]}"
		response = requests.request('GET', base_url + 'illness'+q)
		js = response.json()

		# Are there records in the db?
		self.assertNotEqual(len(js['objects']),0)

		respkeys = set(js['objects'][1].keys())

		# Do the returned objects keys match the schema?
		self.assertEqual(respkeys,{'illness_contagious', 'illness_desc', 'related_pollutants', 'illness_image', 
			'related_locations', 'illness_symptoms', 'illness_treatable', 'illness_lethality', 'illness_name', 'illness_genetic'})

	def test_illness_orderby(self):

		# Filter object with filtering for all
		q = "?q={%22order_by%22:[{%22field%22:%22illness_name%22,%22direction%22:%22asc%22}]}"
		response = requests.request('GET', base_url + 'illness'+q)
		js = response.json()

		# Are there records in the db?
		self.assertNotEqual(len(js['objects']),0)

		respkeys = set(js['objects'][1].keys())

		# Do the returned objects keys match the schema?
		self.assertEqual(respkeys,{'illness_contagious', 'illness_desc', 'related_pollutants', 'illness_image', 
			'related_locations', 'illness_symptoms', 'illness_treatable', 'illness_lethality', 'illness_name', 'illness_genetic'})

	def test_illness_filter_orderby(self):

		# Filter object with filtering for all
		q = "?q={%22filters%22:[{%22name%22:%22illness_name%22,%22op%22:%22like%22,%22val%22:%22%25%25%22}],%22order_by%22:[{%22field%22:%22illness_name%22,%22direction%22:%22asc%22}]}"
		response = requests.request('GET', base_url + 'illness'+q)
		js = response.json()

		# Are there records in the db?
		self.assertNotEqual(len(js['objects']),0)

		respkeys = set(js['objects'][1].keys())

		# Do the returned objects keys match the schema?
		self.assertEqual(respkeys,{'illness_contagious', 'illness_desc', 'related_pollutants', 'illness_image', 
			'related_locations', 'illness_symptoms', 'illness_treatable', 'illness_lethality', 'illness_name', 'illness_genetic'})

	### pollutants

	def test_pollutant_filter(self):

		# Filter object with filtering for all
		q = "?q={%22filters%22:[{%22name%22:%22chemical_name%22,%22op%22:%22like%22,%22val%22:%22%25%25%22}]}"
		response = requests.request('GET', base_url + 'pollutants'+q)
		js = response.json()

		# Are there records in the db?
		self.assertNotEqual(len(js['objects']),0)

		respkeys = set(js['objects'][1].keys())

		# Do the returned objects keys match the schema?
		self.assertEqual(respkeys,{'related_locations', 'inhalation_cancer_potency_source', 'inhalation_reference_concentration_units',
			'inhalation_reference_concentration', 'national_ambient_air_quality_std', 'national_ambient_air_quality_std_source', 
			'national_ambient_air_quality_std_units', 'CAS_or_EDF_Substance_ID', 'chemical_name', 'inhalation_cancer_potency_units', 
			'related_illnesses', 'inhalation_cancer_potency', 'chemspider_id', 'inhalation_reference_concentration_source','Nat_Agg_PV'})

	def test_pollutant_orderby(self):

		# Filter object with filtering for all
		q = "?q={%22order_by%22:[{%22field%22:%22chemical_name%22,%22direction%22:%22asc%22}]}"
		response = requests.request('GET', base_url + 'pollutants'+q)
		js = response.json()

		# Are there records in the db?
		self.assertNotEqual(len(js['objects']),0)

		respkeys = set(js['objects'][1].keys())

		# Do the returned objects keys match the schema?
		self.assertEqual(respkeys,{'related_locations', 'inhalation_cancer_potency_source', 'inhalation_reference_concentration_units',
			'inhalation_reference_concentration', 'national_ambient_air_quality_std', 'national_ambient_air_quality_std_source', 
			'national_ambient_air_quality_std_units', 'CAS_or_EDF_Substance_ID', 'chemical_name', 'inhalation_cancer_potency_units', 
			'related_illnesses', 'inhalation_cancer_potency', 'chemspider_id', 'inhalation_reference_concentration_source','Nat_Agg_PV'})

	def test_pollutant_filter_orderby(self):

		# Filter object with filtering for all
		q = "?q={%22filters%22:[{%22name%22:%22chemical_name%22,%22op%22:%22like%22,%22val%22:%22%25%25%22}],%22order_by%22:[{%22field%22:%22chemical_name%22,%22direction%22:%22asc%22}]}"
		response = requests.request('GET', base_url + 'pollutants'+q)
		js = response.json()

		# Are there records in the db?
		self.assertNotEqual(len(js['objects']),0)

		respkeys = set(js['objects'][1].keys())

		# Do the returned objects keys match the schema?
		self.assertEqual(respkeys,{'related_locations', 'inhalation_cancer_potency_source', 'inhalation_reference_concentration_units',
			'inhalation_reference_concentration', 'national_ambient_air_quality_std', 'national_ambient_air_quality_std_source', 
			'national_ambient_air_quality_std_units', 'CAS_or_EDF_Substance_ID', 'chemical_name', 'inhalation_cancer_potency_units', 
			'related_illnesses', 'inhalation_cancer_potency', 'chemspider_id', 'inhalation_reference_concentration_source','Nat_Agg_PV'})

	### We have set max result sizes in app.py, test that those are enforced

	def test_maxresults_location(self):

		# max results is 18
		response = requests.request('GET', base_url + 'location?results_per_page=30"')
		js = response.json()

		# Are there records in the db?
		self.assertNotEqual(len(js['objects']),0)

		if(js['num_results'] > 18):			
			self.assertEqual(len(js['objects']),18)

		self.assertTrue(len(js['objects']) <= 18)

	def test_maxresults_illnesslocations(self):

		# max results is 9
		response = requests.request('GET', base_url + 'illnesslocations?results_per_page=30"')
		js = response.json()

		# Are there records in the db?
		self.assertNotEqual(len(js['objects']),0)

		if(js['num_results'] > 9):			
			self.assertEqual(len(js['objects']),9)
			
		self.assertTrue(len(js['objects']) <= 9)

	def test_maxresults_illnesses(self):

		# max results is 9
		response = requests.request('GET', base_url + 'illness?results_per_page=30"')
		js = response.json()

		# Are there records in the db?
		self.assertNotEqual(len(js['objects']),0)

		if(js['num_results'] > 9):			
			self.assertEqual(len(js['objects']),9)
			
		self.assertTrue(len(js['objects']) <= 9)

	def test_maxresults_pollutantillnesses(self):

		# max results is 9
		response = requests.request('GET', base_url + 'pollutantillnesses?results_per_page=30"')
		js = response.json()

		# Are there records in the db?
		self.assertNotEqual(len(js['objects']),0)

		if(js['num_results'] > 9):			
			self.assertEqual(len(js['objects']),9)
			
		self.assertTrue(len(js['objects']) <= 9)

	def test_maxresults_pollutants(self):

		# max results is 9
		response = requests.request('GET', base_url + 'pollutants?results_per_page=30"')
		js = response.json()

		# Are there records in the db?
		self.assertNotEqual(len(js['objects']),0)

		if(js['num_results'] > 9):			
			self.assertEqual(len(js['objects']),9)
			
		self.assertTrue(len(js['objects']) <= 9)

	def test_maxresults_locationpollutants(self):

		# max results is 9
		response = requests.request('GET', base_url + 'locationpollutants?results_per_page=30"')
		js = response.json()

		# Are there records in the db?
		self.assertNotEqual(len(js['objects']),0)

		if(js['num_results'] > 9):			
			self.assertEqual(len(js['objects']),9)
			
		self.assertTrue(len(js['objects']) <= 9)						

if __name__ == '__main__':
	main()