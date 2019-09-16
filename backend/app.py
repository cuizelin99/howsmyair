"""

Deploying to EB through dockerhub

Dockerhub Credentials:
username: cs373group3
password: cs3732019!docker 

sources: 

Using Flask Restless
https://flask-restless.readthedocs.io/en/stable/quickstart.html

Setting up Docker and Flask
https://medium.com/@mtngt/docker-flask-a-simple-tutorial-bbcb2f4110b5

"""

from flask import Flask
import psycopg2
from flask_sqlalchemy import SQLAlchemy
from flask_restless import APIManager
from flask_cors import CORS

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = (
	"postgresql://"
	+ "cs373group3"
	+ ":"
	+ "cs3732019!"
	+ "@aaza6m24wn7h5w.ckvneof7llxk.us-east-2.rds.amazonaws.com:5432/ebdb"
)
db = SQLAlchemy(app)
CORS(app)

class Location(db.Model):
	__tablename__ = "location"
	id = db.Column(db.Integer, primary_key = True)
	city = db.Column(db.Unicode)
	state_id = db.Column(db.Unicode)
	state_name = db.Column(db.Unicode)
	county_name =db.Column(db.Unicode)
	latitude = db.Column(db.Float)
	longitude = db.Column(db.Float)
	population = db.Column(db.Integer)
	density = db.Column(db.Float)	
	timezone = db.Column(db.Unicode)
	related_illnesses = db.relationship('IllnessLocations', backref='location', lazy=True)
	related_pollutants = db.relationship('LocationPollutants', backref='location', lazy=True)

class IllnessLocations(db.Model):
	__tablename__ = "illnesslocations"
	illnesslocations_id = db.Column(db.Integer, primary_key = True)
	location_id = db.Column(db.Integer, db.ForeignKey('location.id'))
	illness_name = db.Column(db.Unicode, db.ForeignKey('illness.illness_name'))
	city_name = db.Column(db.Unicode)

class Illness(db.Model):
	__tablename__ = "illness"
	illness_name = db.Column(db.Unicode, primary_key = True)
	illness_desc = db.Column(db.Unicode)
	illness_lethality = db.Column(db.Unicode)
	illness_symptoms = db.Column(db.Unicode)
	illness_contagious = db.Column(db.Unicode)
	illness_treatable = db.Column(db.Unicode)
	illness_image = db.Column(db.Unicode)
	illness_genetic = db.Column(db.Unicode)
	related_locations = db.relationship('IllnessLocations', backref='illness', lazy=True)
	related_pollutants = db.relationship('PollutantIllnesses', backref='illness', lazy=True)

class PollutantIllnesses(db.Model):
	__tablename__ = "pollutantillnesses"
	pollutantillnesses_id = db.Column(db.Integer, primary_key = True)
	pollutant_name = db.Column(db.Unicode, db.ForeignKey('pollutants.chemical_name'))
	illness_name = db.Column(db.Unicode, db.ForeignKey('illness.illness_name'))


class Pollutants(db.Model):
	__tablename__ = "pollutants"
	chemical_name = db.Column(db.Unicode, primary_key = True) 
	CAS_or_EDF_Substance_ID = db.Column(db.Unicode)
	inhalation_cancer_potency = db.Column(db.Float)
	inhalation_cancer_potency_units = db.Column(db.Unicode)
	inhalation_cancer_potency_source = db.Column(db.Unicode)
	inhalation_reference_concentration = db.Column(db.Float)
	inhalation_reference_concentration_units = db.Column(db.Unicode)
	inhalation_reference_concentration_source = db.Column(db.Unicode)
	national_ambient_air_quality_std = db.Column(db.Float)
	national_ambient_air_quality_std_units = db.Column(db.Unicode)
	national_ambient_air_quality_std_source = db.Column(db.Unicode)
	Nat_Agg_PV = db.Column(db.Unicode)
	chemspider_id = db.Column(db.Unicode)
	related_locations = db.relationship('LocationPollutants', backref='pollutants', lazy=True)
	related_illnesses = db.relationship('PollutantIllnesses', backref='pollutants', lazy=True)


class LocationPollutants(db.Model):
	__tablename__ = "locationpollutants"
	locationpollutants_id = db.Column(db.Integer, primary_key = True)
	pollutant_name = db.Column(db.Unicode, db.ForeignKey('pollutants.chemical_name'))
	location_id = db.Column(db.Integer, db.ForeignKey('location.id'))
	city_name = db.Column(db.Unicode)


# Create the database tables.
db.create_all()

@app.route("/")
def get_valid_apis():
    return '<b><a href="https://documenter.getpostman.com/view/8053610/SVSDQXCC?version=latest">Click here for our API Documentation</a></b>'

# Create the Flask-Restless API manager.
manager = APIManager(app, flask_sqlalchemy_db=db)

# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
manager.create_api(Location, methods=['GET'], url_prefix="", collection_name="location",results_per_page = 18, max_results_per_page = 18)
manager.create_api(IllnessLocations, methods=['GET'], url_prefix="",collection_name="illnesslocations",results_per_page = 9,max_results_per_page = 9)
manager.create_api(Illness, methods=['GET'], url_prefix="", collection_name="illness",results_per_page = 9,max_results_per_page = 9)
manager.create_api(PollutantIllnesses, methods=['GET'], url_prefix="", collection_name="pollutantillnesses",results_per_page = 9,max_results_per_page = 9)
manager.create_api(Pollutants, methods=['GET'], url_prefix="",collection_name="pollutants",results_per_page = 9,max_results_per_page = 9)
manager.create_api(LocationPollutants, methods=['GET'], url_prefix="",collection_name="locationpollutants",results_per_page = 9,max_results_per_page = 9)

if __name__ == '__main__':
		app.run(debug=False, host='0.0.0.0')

