FROM python:3.7

RUN apt-get update

RUN apt-get -y install libboost-all-dev
RUN apt-get -y install libgmp-dev
RUN apt-get -y install vim
RUN apt-get -y install git

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get -y install nodejs
RUN nodejs --version

RUN apt-get -y install npm
RUN npm --version
RUN npm install -g https://github.com/mochajs/mocha
RUN npm install -g request --save
RUN npm install -g newman --save

RUN pip3 install --upgrade pip
RUN pip3 --version
RUN pip3 install requests

COPY . /Test

WORKDIR /Test

RUN pip3 install -r pyrequirements.txt

CMD bash