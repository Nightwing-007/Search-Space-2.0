CREATE DATABASE IF NOT EXISTS algorithm_visualizer;
USE algorithm_visualizer;

DROP TABLE IF EXISTS quiz_scores;
DROP TABLE IF EXISTS algorithm_runs;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE algorithm_runs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    algorithm_type VARCHAR(255) NOT NULL,
    array_size INT,
    execution_time_ms BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE quiz_scores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    algorithm_type VARCHAR(255) NOT NULL,
    correct_predictions INT NOT NULL DEFAULT 0,
    total_predictions INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
