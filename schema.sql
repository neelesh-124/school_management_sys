CREATE DATABASE School_Management;
USE School_Management;

CREATE TABLE Schools
(
    id VARCHAR(500) PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    address VARCHAR (500) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);

