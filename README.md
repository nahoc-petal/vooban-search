## Requirements
* Docker
* Node
* Yarn

### To run and seed the mongo database

`docker-compose up -d`

`docker exec -ti mongodb bash`

`mongoimport --db vooban --collection suggestion --file /data/db/cities.json --jsonArray && exit`

### To run the node backend

`node .`

### To run the frontend

`cd client && yarn start`