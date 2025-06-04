### **Docker Engine**
The **core runtime** that manages containers on a host system.
- **Docker Daemon (`dockerd`)**
    - Runs in the background.
    - Handles container lifecycle: build, run, stop, remove.
    - Listens for Docker API requests.
- **Docker CLI (`docker`)**
    - Command-line tool to interact with the daemon.
    - Examples: `docker run`, `docker build`, `docker ps`, etc.
- **REST API**
    - Programmatic interface to control Docker (used by GUI tools and Docker CLI).

---
### **Docker Images**
**Read-only templates** used to create containers. Includes:
- Application code (`app.js`)
- System libraries and dependencies (like Node.js)
- Instructions from `Dockerfile`
### Think of it like: 
**Class** in programming — you can create many objects (containers) from it.

---
### **Docker Containers**
- **Running instances** of Docker images.
- Includes a writable layer on top of the image.
- Can be started, stopped, paused, or deleted.
Run default command lines and terminate auto when finished
### Think of it like:
**Object** created from a class — it's alive, doing work, and can change state.

---
### **Docker basic commands**
- `docker image ls` - list of images 
- `docker image pull alpine` - pull keyword doesn't run an image but download it 
	- alpine is normally use as the base template for image (its a base os)
	- `docker container run alpine` - doesn't do anything cause alpine empty now
	- `docker container run alpine **echo hello there!`**  anything after image name is used as linux command 
	- `docker alpine run -it alpine` - `-it` interactive - go to alpine os' terminal 
		- `ps` - see all the processes here
		- `exit` - get out
- `docker container ls` - list of container or `docker container ls -a` - show terminated one also
- `docker container run alpine ping dell.com` or `docker container run -it alpine`-> `ping dell.com`
	- `docker container stop ...` - fill container id
	- `docker container restart ...` - fill id or name 
	- `docker container remove ...` - fill id or name or `prune` - remove all stopped container
	- `docker container run --rm alpine echo hello worldz` - auto stop when finish executing and remove the container

---
### **Exposing container externally**

#### Run Apache web server
`docker container run -d -p 8080:80 httpd`
- Cannot run another server on the same port - can run on the next port 8081:80
- `-d` - run in background
- `-p` - port mapping
#### Accessing Apache web server
`curl localhost:8080`

---
### Dockerfile
simple text file

| Component         | Description                             |
| ----------------- | --------------------------------------- |
| Docker Engine     | Core system running Docker              |
| Docker Daemon     | Background service that runs containers |
| Docker CLI        | Tool to interact with Docker            |
| Docker Images     | Templates for containers                |
| Docker Containers | Running instances of images             |
| Dockerfile        | Blueprint to build an image             |
| Docker Compose    | Manage multi-container apps             |
| Docker Hub        | Image registry (cloud)                  |
| Docker Volumes    | Persistent storage                      |
| Docker Networks   | Inter-container communication           |
| Docker Image      | read-only template, executable package  |

---
## Node.js application with Docker

### Dockerfile setup
```Dockerfile
FROM node
COPY ./app /app
WORKDIR /app
CMD node app.js
```

1. **What it does:**  
    Uses the official **Node.js base image** from Docker Hub.    
	- **Why it's important:**  
	    This base image includes Node.js and npm pre-installed, so you can run JS apps inside the container.
2. Copies everything from the local `./app` directory **into the image**.
3. Sets `/app` as the **working directory** for the container.
4. Sets the **default command** that runs when the container starts.

### Build an image with Dockerfile
``` powershell
docker build -t simple-node .
```
### Run app 
```Powershell
docker run -p 3000:3000 simple-node
```
### Stop app
```Powershell
docker ps
docker stop container_id
```

---
## Image Registries
where you **push, pull, and share** container images — like a GitHub for Docker

### Private Registries
Run your **own registry**:
```Powershell
## **Private Registries**
You can also run your **own registry**:
```
Push:
```powershell
docker tag my-image localhost:5000/my-image
docker push localhost:5000/my-image
```
