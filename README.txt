Creation of the container  - Original by Jason Cumiskey

Step 1: Create Project
    - Create a project folder
    - Create 2 sub folders - node and app
    //- In App folder, create package.json and declare dependencies (Node website has example)
    //- Go to APP folder and run CMD [ npm install ]
    - Create a blank Dockerfile in the node folder
    - Gitbash to the node folder
    - CMD [ touch Dockerfile ]
    - Enter into dockerfile:
        # Purpose of the project
        FROM node:<version>  (10 as of 4 Nov 18)
        LABEL key="Value"    (Use these for version, maintainer, etc.)
    - Test build CMD [ docker build -t "image name" . ]

----------------------------------------------------------
Step 2: To run a container and give you root bash prompt INSIDE the container

winpty docker run -it --rm -v /${PWD}:/usr/src/app <img name> bash
-------------------------

--it  : makes container interactable ie. a shell is opened inside the container.

--rm  : will remove the container on exit

-v    : mounts a volume

/${PWD}:/usr/src/app    : the current directory on the host (this pc) will be 
                         mounted to /usr/src/app in the container.

--------------------------
Step 3: Check Node & npm versions

In container - CMD [ node --version && npm --version ]

-----------------------------------------------------
Step 4: Install express-generator on the container

In container = CMD [ npm install -g express-generator ]

--------------------------------------------------
Step 5: Generate boilerplate code for Express

W/o a view engine:    express --no-view --git /usr/src/app 

W/ a view engine ie Pug:    express --view=pug --git /usr/src/app

(Now must update package.json and create a Docker compose file)
type exit in bash

---------------------------------------------------
Step 6: Update package.json to add dependancies

Open package.json
- Edit name to give your app a name
- Add a new kv pair under version - "author": "your name",
- Update the start value to install npm on your container - "start": "npm install && node ./bin/www"
 This start script creates an HTTP server and starts listening for requests

Can check validity @  jsonlint.com

---------------------------------------------------
Step 7: Write a Docker Compose file
- Create an empty txt file called docker-compose.yml in the root folder of the project

Code for basic app: ***Make sure to indent by 2 spaces for each level***

version: "3"

services:
  node:
    container_name: node
    build: ./node
    #where to find the dockerfile
    image: nodeapisvr-v1
    #what to name the image
    user: "node"
    #provides a non root user called node
    working_dir: /home/node/app
    #sets node user's home directory
    environment:
      - NODE_ENV=development
      #set this to =production when publishing your app or else performance will be degraded
      - DEBUG=nodeapisvr, express:*
      #Enables logging of express and your app
    ports:
      - "3000:3000"
      #Format: HOST PORT:CONTAINER PORT
    volumes:
      - ./app:/home/node/app
    command: "npm start"

Can check validity @  http://www.yamllint.com/

-------------------------------------------------------
Step 8: Start your app

- Gitbash to the root folder with the compose file

CMD [ docker-compose up -d ]

If errors, do a docker-compose logs to find out what is wrong.

Can access your app in your browser @ localhost:3000

-------------------------------------------------------
Step 9: Change app folder structure to MVC