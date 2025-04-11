# Start from an OpenJDK image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the built jar into the container
ARG JAR_FILE=target/authservice-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar

# Expose the port the app runs on
EXPOSE 8880

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
