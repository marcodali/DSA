# Hand made web servers

This project showcases homemade web server endpoints built in multiple backend languages and frameworks. It includes debugging, unit testing, dependency management, Dockerization, deployment, and database integration.

## Javascript

Running unit testing with coverage
```bash
npx vitest run --coverage
```

New react project with next
```bash
npx create-next-app@latest
```

New react project with vite
```bash
npm create vite@latest nueva-belleza -- --template react
```

## Python

Running unit testing with coverage
```bash
pytest test_nueva_belleza.py --cov-report=html --cov=<file-or-directory>
```

Save dependencies
```bash
pip3 freeze > requirements.txt
```

Install dependencies
```bash
pip3 install -r requirements.txt
```

Create virtual env
```bash
python3 -m venv venv
source venv/bin/activate
deactivate
where python
```

## Golang

Compile and run in one step
```bash
go run <file>
```

Only compile and creates binary executable as output
```bash
go build <file>
```

Running unit testing with coverage
```bash
go test -v -cover -coverprofile=coverage.out <file-or-directory>
go tool cover -html=coverage.out
```

Create a module
```bash
go mod init <module-name>
```

Install all dependencies (like npm i) it also removes unused ones
```bash
go mod tidy
```

Install a dependency latest version
```bash
go get -u <github-url-or-name>
```

Install binaries (similar to npm install -g)
```bash
go install <url@version>
```

## Docker

```bash
docker build -t my-app:latest -f Dockerfile .       # Build image with a specific name and Dockerfile
docker run -p 8080:8080 --name my-co my-app:latest  # Run container with a custom name
docker exec -it my-co /bin/sh                       # Access the container's shell
docker logs my-co                                   # View container logs
docker push my-app:latest                           # Share the image to a registry
docker ps -a                                        # Monitor all containers (running and stopped)
docker stop my-co                                   # Stop a container (saves state, can be restarted)
docker rm my-co                                     # Delete a stopped container
docker start my-co                                  # Restart a stopped container
```

## Docker Compose

For multi-container setups
```bash
docker-compose up       # Start all services defined in docker-compose.yml
docker-compose up -d    # Start services in detached mode (background)
docker-compose down     # Stop and remove containers
docker-compose build    # Build or rebuild services
docker-compose ps       # List running services
docker-compose logs     # View logs of all services
docker-compose exec <service-name> /bin/sh  # Access shell of a running service
```