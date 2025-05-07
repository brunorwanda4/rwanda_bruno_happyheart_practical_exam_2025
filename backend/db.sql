DROP DATABASE IF EXISTS SOS_MIS;

CREATE DATABASE SOS_MIS;

USE SOS_MIS;

CREATE TABLE
    Users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL
    );

INSERT INTO
    Users (username, password_hash)
VALUES
    ('admin', 'hashed_password_123'),
    ('trainer1', 'hashed_password_abc');

CREATE TABLE
    Trades (
        trade_id INT AUTO_INCREMENT PRIMARY KEY,
        trade_name VARCHAR(100) NOT NULL UNIQUE
    );

INSERT INTO
    Trades (trade_name)
VALUES
    ('Plumbing'),
    ('Electrical'),
    ('Carpentry');

CREATE TABLE
    Trainees (
        trainee_id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        gender ENUM ('Male', 'Female', 'Other') NOT NULL,
        trade_id INT,
        FOREIGN KEY (trade_id) REFERENCES Trades (trade_id) ON DELETE SET NULL ON UPDATE CASCADE
    );

INSERT INTO
    Trainees (first_name, last_name, gender, trade_id)
VALUES
    ('John', 'Doe', 'Male', 1),
    ('Jane', 'Smith', 'Female', 2),
    ('Alex', 'Kim', 'Other', 3);

CREATE TABLE
    Modules (
        module_id INT AUTO_INCREMENT PRIMARY KEY,
        module_name VARCHAR(100) NOT NULL,
        module_credits INT NOT NULL
    );

-- Sample modules
INSERT INTO
    Modules (module_name, module_credits)
VALUES
    ('Basic Plumbing', 5),
    ('Wiring Techniques', 4),
    ('Woodwork Basics', 6);

CREATE TABLE
    Marks (
        mark_id INT AUTO_INCREMENT PRIMARY KEY,
        trainee_id INT NOT NULL,
        trade_id INT NOT NULL,
        module_id INT NOT NULL,
        user_id INT NOT NULL,
        formative_assessment DECIMAL(5, 2),
        summative_assessment DECIMAL(5, 2),
        comprehensive_assessment DECIMAL(5, 2),
        total_marks_100 DECIMAL(5, 2),
        FOREIGN KEY (trainee_id) REFERENCES Trainees (trainee_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (trade_id) REFERENCES Trades (trade_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (module_id) REFERENCES Modules (module_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
    );

INSERT INTO
    Marks (
        trainee_id,
        trade_id,
        module_id,
        user_id,
        formative_assessment,
        summative_assessment,
        comprehensive_assessment,
        total_marks_100
    )
VALUES
    (1, 1, 1, 1, 15.00, 20.00, 25.00, 60.00),
    (2, 2, 2, 2, 18.50, 22.00, 30.00, 70.50),
    (3, 3, 3, 1, 10.00, 15.00, 20.00, 45.00);