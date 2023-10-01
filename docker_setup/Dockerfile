# Use a lightweight base image for the Gradle dependencies layer
FROM --platform=linux/amd64 openjdk:17-jdk-slim AS builder

# Create non-root user prevent security vulnerbilities
RUN useradd -ms /bin/bash penguin

# User non-root user
USER penguin

# Set the working directory inside the container for the dependencies layer
WORKDIR /app

# Copy all files and assign ownership and usergroup to non-root user
COPY --chown=penguin:penguin . .

RUN chmod +x ./gradlew

# Build the JAR (Gradle dependencies will be cached from the previous stage)
RUN ./gradlew clean build -Pprod --no-daemon

# Use a valid JRE 17 image for the final application
FROM --platform=linux/amd64 eclipse-temurin:17-jre-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR from the builder stage
COPY --from=builder /app/backend/build/libs/backend*.jar /app/penground.jar

# Expose the port your application is listening on (if applicable)
EXPOSE 8080

# Command to run the application when the container starts
CMD ["java", "-jar", "penground.jar"]
