# Jokes demo app (FullStack)
## Technologies used
### Backend
* Fastify (HTTP Server)
* KnexJS (SQL Migration Manager and Query Builder)
* SQLite 3 (Database)
### Frontend
* VanillaJS (No frameworks used, just plain JS)
* Vite (bundler)

## Why SQLite instead of MySQL / PostgreSQL ?
I decided to use SQLite to stick with the requirement of using a SQL database, while making it easier to install. Since this app is not very complex, SQLite works just fine here.

## How to install and run using Podman / Docker (Preferred method)
To make it even easier to install and run, I've decided to use Podman, an alternative to Docker which doesn't requires root privileges to run and plays well with cgroups as opposed to docker.

Podman goal is to be 1:1 compatible with docker, that means you can replace the "podman" commands here with "docker" and it will just work.

First we need to install Podman / Docker if we don't already have any of them installed, we can refer to the official documentation to do so:
* [Install Podman](https://podman.io/getting-started/installation.html)
* [Install Docker](https://docs.docker.com/engine/install/)

After we've installed Podman or Docker, we need to run this commands on the project folder:

`podman build -t jokes-app .`
`podman run -dp 5000:5000 -t jokes-app`

This will serve the app on http://localhost:5000
### How can I stop the app from running?
After we're done testing the app, we need to run:
`podman ps`
Then, we take note of the CONTAINER_ID value of the container running the jokes-app image. After that, we stop the container by running:
`podman stop CONTAINER_ID`
(We replace CONTAINER_ID here with the previous value we've taken from `podman ps`.

## How can I run it without Podman or Docker?
If for any reasons we don't want to use Podman or Docker to run the app, we can build and run it by executing the following commands on the project folder (on Linux / MacOS)
```
cd frontend
npm install
npm build
cd ../backend
npm install
npm start
```
Note that we will need to have NodeJS along with NPM installed in our system for these commands to work.
