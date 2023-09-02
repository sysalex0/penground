# Dockerfile

# Use a lightweight base image for the Gradle dependencies layer
FROM openjdk:17-jdk-slim AS gradle_dependencies

# Set the working directory inside the container for the dependencies layer
WORKDIR /app

# Copy only the necessary Gradle files for dependency resolution
COPY build.gradle.kts settings.gradle.kts gradlew /app/
COPY gradle /app/gradle

# Resolve and download Gradle dependencies
RUN ./gradlew dependencies

# Use a different stage for building the application
FROM gradle_dependencies AS builder

# Set the working directory inside the container for building the application
WORKDIR /app

# Copy the entire source code
COPY src /app/src

# Build the JAR (Gradle dependencies will be cached from the previous stage)
RUN ./gradlew build

# Use a valid OpenJDK 17 image for the final application
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR from the builder stage
COPY --from=builder /app/build/libs/*.jar /app/penground.jar

# Expose the port your application is listening on (if applicable)
EXPOSE 8080

# Command to run the application when the container starts
CMD ["java", "-jar", "penground.jar"]
