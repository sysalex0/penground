# Penground

This project is a playground of penguin. Learn, explorer, play!

For temporary, this repository will go on below directions
- Making a Progressive Web App
- Practicing frontend as Reactjs
- Practicing backend as Kotlin Spring Boot
- Practicing gradle as building tool
- For easier management, frontend and backend will share on same port, as one applicatoin. 

## Development
When development, we can actually separate start with two servers, as we are originally separate as gradle subprojects, they can work independently. But we will need to update frontend with proxy for unhandled / api request
### Frontend
 ```shell
 cd frontend
 yarn install
 yarn start
 ```
### Backend
```shell
./gradlew :backend:clean build
./gradlew :backend:bootRun
```

### Health check
```bash
curl localhost:3000
curl localhost:8080/actuator/health
```

## Deployment
### Build both frontend and backend as a jar, serving the same port
```shell
gradle clean build -Pbundle
java -jar backend/build/libs/backend-0.0.1-SNAPSHOT.jar --bundle=true
```
#### Health check
```shell
curl localhost:8080
curl localhost:8080/actuator/health
```

### Docker
```shell
docker build . -t penground
docker run -p 8080:8080 penground 
```