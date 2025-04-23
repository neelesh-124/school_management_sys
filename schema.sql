CREATE DATABASE School_Management;
USE School_Management;

CREATE TABLE Schools
(
    id INTEGER PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    address VARCHAR (500),
    latitude FLOAT,
    longitude FLOAT
);

