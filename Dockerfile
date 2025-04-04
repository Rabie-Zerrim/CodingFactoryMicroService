FROM openjdk:17
EXPOSE 8082
ADD target/PartnershipManagement-0.0.1-SNAPSHOT.jar PartnershipManagement.jar
ENTRYPOINT ["java", "-jar","PartnershipManagement.jar"]