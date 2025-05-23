DROP DATABASE IF EXISTS SOS_MIS;

CREATE DATABASE SOS_MIS;

USE SOS_MIS;

-- Users Table
CREATE TABLE
    Users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        hash_password VARCHAR(100) NOT NULL
    );

-- Trades Table
CREATE TABLE
    Trades (
        id INT AUTO_INCREMENT PRIMARY KEY,
        trade_name VARCHAR(100) NOT NULL
    );

-- Trainees Table
CREATE TABLE
    Trainees (
        trainee_id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(100) NOT NULL,
        lastName VARCHAR(100) NOT NULL,
        gender ENUM ('Male', 'Female', 'Other') NOT NULL,
        trade_id INT,
        -- Added ON DELETE RESTRICT
        FOREIGN KEY (trade_id) REFERENCES Trades (id) ON DELETE RESTRICT
    );

-- Modules Table
CREATE TABLE
    Modules (
        module_id INT AUTO_INCREMENT PRIMARY KEY,
        modName VARCHAR(100) NOT NULL,
        modCredits INT NOT NULL
    );

-- Marks Table
CREATE TABLE
    Marks (
        markId INT AUTO_INCREMENT PRIMARY KEY,
        trainee_id INT,
        trade_id INT,
        module_id INT,
        user_id INT,
        formative_ass DECIMAL(5, 2),
        summative_ass DECIMAL(5, 2),
        comprehensive_ass DECIMAL(5, 2),
        total_marks_100 DECIMAL(5, 2),
        -- Added ON DELETE RESTRICT to all foreign keys
        FOREIGN KEY (trainee_id) REFERENCES Trainees (trainee_id) ON DELETE RESTRICT,
        FOREIGN KEY (trade_id) REFERENCES Trades (id) ON DELETE RESTRICT,
        FOREIGN KEY (module_id) REFERENCES Modules (module_id) ON DELETE RESTRICT,
        FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE RESTRICT
    );