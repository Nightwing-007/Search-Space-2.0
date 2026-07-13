CREATE DATABASE IF NOT EXISTS algorithm_visualizer;
USE algorithm_visualizer;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS algorithm_runs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    algorithm_type VARCHAR(255) NOT NULL,
    custom_input JSON,
    execution_time_ms BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
