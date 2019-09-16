.DEFAULT_GOAL := all

FILES :=				\
	backend/test.py 	\
	Postman.json

# add test files here followed by \

test:
	-python --version
	-pip list
	-python backend/test.py
	-newman --version
	-newman run Postman.json
# add test commands here

