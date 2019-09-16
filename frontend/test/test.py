from selenium import webdriver
from unittest import main, TestCase
import time

class GUITests(TestCase):
	def setUp(self):
		self.driver = webdriver.Chrome("/Users/davidbomm/SWE/cs373-airpollution/frontend/test/chromedriver")
	def test_name(self):
		driver = self.driver
		driver.get("https://www.howsmyair.me")
		self.assertEqual(driver.title, "How's My Air?")
	def test_navbar_Locations(self):
		driver = self.driver
		driver.get("https://www.howsmyair.me/")
		link = driver.find_element_by_link_text("Locations")
		link.click()
		self.assertIn("Locations", driver.current_url)
	def test_navbar_Illnesses(self):
		self.driver.get("https://www.howsmyair.me/")
		link = self.driver.find_element_by_link_text("Illnesses")
		link.click()
		self.assertIn("Illnesses", self.driver.current_url)
	def test_navbar_Pollutants(self):
		self.driver.get("https://www.howsmyair.me/")
		link = self.driver.find_element_by_link_text("Pollutants")
		link.click()
		self.assertIn("Pollutants", self.driver.current_url)
	def test_navbar_about(self):
		self.driver.get("https://www.howsmyair.me/")
		link = self.driver.find_element_by_link_text("About")
		link.click()
		self.assertIn("About", self.driver.current_url)
	def test_location_instance(self):
		driver = self.driver
		self.driver.get("https://www.howsmyair.me/")
		link = self.driver.find_element_by_link_text("Locations")
		link.click()
		link = self.driver.find_element_by_class_name('card-header')
		link.click()
		self.assertIn("1840000791", self.driver.current_url)

if __name__ == "__main__":
	main()
