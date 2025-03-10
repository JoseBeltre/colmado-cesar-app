CREATE DATABASE colmado_cesar;
USE colmado_cesar;

CREATE TABLE employes (
	id BINARY(16) PRIMARY KEY UNIQUE DEFAULT (UUID_TO_BIN(UUID())),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role VARCHAR(50) DEFAULT ("vendedor"),
    email VARCHAR(100) NOT NULL,
    phone_number INT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);