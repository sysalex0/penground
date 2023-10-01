# Penground

This project is a playground of penguin. Learn, explorer, play!

For temporary, this repository will go on below directions
- Making a Progressive Web App
- Practicing frontend as Reactjs
- Practicing backend as Kotlin Spring Boot
- Practicing gradle as building tool
- For easier management, frontend and backend will share on same port, as one applicatoin. 

## Development
### Backend
#### Details for the done setup
Go to [spring-boot Initializr](https://start.spring.io/) and fill the form to create your project.

#### Development get started
The application development will develop directly on local but not docker. Only other dependency like database will use docker if needed. The reason behind is that IDE can have bigger support.

##### 2 ways to start development in local
1. We will need to configure your IDE to auto-rebuild your project when it detects a change so that [Spring Boot DevTools](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html)
can reload the changes. Check the [doc](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html) for more info.

2. Run in a terminal `./gradlew :backend:bootRun` but you won't have auto-rebuild functionality.

### Frontend
#### Details for the done setup
1. create a new directory `frontend`
2. create a react app
    ```sh
    npx create-react-app frontend --template cra-template-pwa-typescript
    ```
3. Remove `package-lock.json` generated, use `yarn` as package manager, run 
   ```sh
   yarn install
   ```
4. Create [build.gradle.kts](./frontend/build.gradle.kts) to let gradle recognise it is a module, and include it build steps for building production 
5. Update [.gitignore](./frontend/.gitignore) to exclude gradle and [com.github.node-gradle.node](https://github.com/node-gradle/gradle-node-plugin) plugin cache
   ```.gitignore
   ### com.github.node-gradle.node cache
   .cache

   ### Gradle template
   .gradle
   build
   ```
6. In development, we will route Webpack development server to proxy all unhandled request to the backend API by doing this in [package.json](./frontend/package.json):
   ```json
   {
     "proxy": "http://localhost:8080"
   }
   ```

#### Development get started
Then in another terminal, you can run:

```sh
cd frontend
yarn install
yarn start
```

Then it should pop up your default browser with the [Reactjs](https://reactjs.org/) application at http://localhost:3000.
Make some changes and see how it impacts the web app.

### Docker
Not yet set up / needed right now

## Production

**NOTE:**
> In this project, the backend will depend on frontend build only when the gradle property `prod` is set.
> It is to avoid that we systematically rebuild the frontend when we are only developing in the backend.

Let's try this:

```sh
./gradlew clean build -Pprod
java -jar backend/build/libs/backend-0.0.1-SNAPSHOT.jar
```

Then open your browser at http://localhost:8080
