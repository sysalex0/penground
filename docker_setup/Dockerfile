# Use a lightweight base image for the Gradle dependencies layer
FROM --platform=linux/amd64 openjdk:17-jdk-slim AS builder

# Set the working directory inside the container for the dependencies layer
WORKDIR /app

# Copy only the necessary Gradle files for dependency resolution
COPY build.gradle.kts settings.gradle.kts gradlew gradle /app/

# Copy the oapi specification for ./gradlew build
COPY src/main/resources/openapi /app/src/main/resources/openapi

# Update access permission before using ./gradlew
RUN chmod +x ./gradlew

# Resolve and download Gradle dependencies, expect the build to fail, return 0 and allow the docker to continue execution.
RUN ./gradlew build --no-daemon || return 0

# Copy all files
COPY . .

# Update access permission after copy all, ./gradlew replaced
RUN chmod +x ./gradlew

# Build the JAR (Gradle dependencies will be cached from the previous stage)
RUN ./gradlew build --no-daemon

# Use a valid JRE 17 image for the final application
FROM --platform=linux/amd64 eclipse-temurin:17-jre-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR from the builder stage
COPY --from=builder /app/build/libs/*.jar /app/penground.jar

# Expose the port your application is listening on (if applicable)
EXPOSE 8080

# Command to run the application when the container starts
CMD ["java", "-jar", "penground.jar"]
