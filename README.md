# Penground

This project will integrate a Reactjs web application and a Spring Boot application together.

## Development
### Backend

You will need to configure your IDE to auto-rebuild your project when it detects a change so that [Spring Boot DevTools](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html)
can reload the changes. Check the [doc](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html) for more info.

Alternatively, you can run in a terminal `./gradlew :backend:bootRun` but you won't have auto-rebuild functionality.

### Frontend
In development, we will route Webpack development server to proxy all unhandled request to the backend API by doing this in [package.json](./frontend/package.json):

```json
{
  //...
  "proxy": "http://localhost:8080"
}
```
Then in another terminal, you can run:

```sh
cd frontend
yarn install
yarn start
```

Then it should pop up your default browser with the [Reactjs](https://reactjs.org/) application at http://localhost:3000.
Make some changes and see how it impacts the web app.

## Production

**NOTE:**
> In this project, the backend will depend on frontend build only when the gradle property `prod` is set.
> It is to avoid that we systematically rebuild the frontend when we are only developing in the backend.

Let's try this:

```sh
gradlew clean build -Pprod
java -jar backend/build/libs/*.jar
```

Then open your browser at http://localhost:8080
