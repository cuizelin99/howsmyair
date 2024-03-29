import requests
from sys import stdout
import json

pollutantsList_=_["OZONE",
				"HYDRAZINE_SULFATE"
				"HYDROBROMIDE_ACID"
				"ETHYLBENZENE"
				"STYRENE"
				"BORI_ACID"
				"RADON"
				"BENZYL_CHLORIDE"
				"CHLORINE_DIOXIDE"
				"ALMOND_ARTIFICIAL_ESSENTIAL_OIL"
				"N-NITROSOPIPERIDINE"
				"SODIUM_SELENITE"
				"NITROGEN_DIOXIDE"
				"CAPROLACTAM"
				"SODIUM_BICHROMATE"
				"CHLORAMINE"
				"CARBENDAZIM"
				"P-XYLENE"
				"P-CRESOL"
				"P-PHENYLENEDIAMINE"
				"EPICHLOROHYDRIN"
				"ETHYLENEDIAMINE"
				"GLYPHOSATE"
				"ETHYLENE_GLYCOL"
				"CYANIDE_COMPOUNDS"
				"CHLOROMETHYL_METHYL_ETHER"
				"DIBENZOFURANS"
				"VINYL_ACETATE"
				"METHYL_ISOBUTYLKETONE"
				"MALEIC_ANHYDRIDE"
				"M-XYLENE"
				"M-CRESOL"
				"MESITYLENE"
				"TOLUENE"
				"CYCLOHEXYLAMINE"
				"CYCLOHEXANONE"
				"PHENOL"
				"MALONONITRILE"
				"ETHYLENE_GLYCOL_MONOMETHYL_ETHER"
				"FURAN"
				"ETHYLENE_GLYCOL_MONOMETHYL_ETHER_ACETATE"
				"N-HEXANE"
				"ETHYLENE_GLYCOL_MONOETHYL_ETHER"
				"PYRIDINE"
				"GASOLINE_VAPORS"
				"GLUTARALDHYDE"
				"DIETHANOLAMINE"
				"N-NITROSODIETHANOLAMINE"
				"ETHYLENE_GLYCOL_MONOBUTYL_ETHER"
				"PROPANE_SULTONE"
				"MINERAL_FIBERS"
				"PROPYLENE"
				"ENDOSULFAN"
				"SILICA"
				"NICKEL_SUBSULFIDE"
				"TRIETHYLAMINE"
				"MALATHION"
				"FENITROTHION"
				"DIPHENYLAMINE"
				"PHENYL_GLYCIDYL_ETHER"
				"HYDROQUINONE"
				"CROTONALDEHYDE",
				"DIMETHYLAMINE"
				"METHACRYLONITRILE"
				"TETRACHLOROETHYLENE"
				"DIMETHYL_PHTHALATE"
				"MOLYBDENUM_TRIOXIDE"
				"NICKEL_OXIDE"
				"VANADIUM_OXIDE"
				"ZINC_PHOSPHIDE"
				"XYLENE"
				"POLYCHLORINATED_BIPHENYLS"
				"METHYL_ETHYL_KETONE_PEROXIDE"
				"SODIUM_SELENATE"
				"PHENAZOPYRIDINE_HYDROCHLORIDE"
				"SODIUM_VANADIUM_OXIDE"
				"THIRAM"
				"LITHIUM_CHROMATE"
				"SODIUM_CYANIDE"
				"POTASSIUM_CYANIDE"
				"PROPACHLOR"
				"VINYLTOLUENE"
				"TOLUENE_DIISOCYANATE"]


def diagnosePollutants(chemical) :
	url = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compund/name/" + chemical + "/JSON"
	response = requests.get(url)
	response.json()
	answer = json.loads(response.text)
	return answer.get('query')


i = 0
f = open("pollutants.csv", "w+")
while i < len(latitude):
    json.dump(cityScrape(latitude[i], longitude[i]), f)
    i+=1
f.close()