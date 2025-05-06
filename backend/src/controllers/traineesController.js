// controllers/traineesController.js
const pool = require('../config/db');

// Get all trainees (with optional trade name)
exports.getAllTrainees = (req, res) => {
    // Define the SQL query
    const query = `
        SELECT
            Trainees.trainee_id,
            Trainees.firstName,
            Trainees.lastName,
            Trainees.gender,
            Trainees.trade_id,
            Trades.trade_name
        FROM Trainees
        LEFT JOIN Trades ON Trainees.trade_id = Trades.id
    `;
    // Execute the query using the callback pattern
    pool.query(query, (err, rows) => {
        if (err) {
            // Handle error
            console.error('Error fetching trainees:', err);
            return res.status(500).send('Server Error');
        }
        // Send success response with the fetched rows
        res.json(rows);
    });
};

// Get a single trainee by ID (with optional trade name)
exports.getTraineeById = (req, res) => {
    const { id } = req.params;
    // Define the SQL query with a placeholder for the ID
    const query = `
        SELECT
            Trainees.trainee_id,
            Trainees.firstName,
            Trainees.lastName,
            Trainees.gender,
            Trainees.trade_id,
            Trades.trade_name
        FROM Trainees
        LEFT JOIN Trades ON Trainees.trade_id = Trades.id
        WHERE Trainees.trainee_id = ?
    `;
    // Execute the query using the callback pattern, passing the ID as a parameter
    pool.query(query, [id], (err, rows) => {
        if (err) {
            // Handle error
            console.error('Error fetching trainee by ID:', err);
            return res.status(500).send('Server Error');
        }
        // Check if a trainee was found
        if (rows.length === 0) {
            return res.status(404).send('Trainee not found');
        }
        // Send the first row (the trainee)
        res.json(rows[0]);
    });
};

// Create a new trainee
exports.createTrainee = (req, res) => {
    const { firstName, lastName, gender, trade_id } = req.body;
    // Basic validation
    if (!firstName || !lastName || !gender) {
        return res.status(400).send('First name, last name, and gender are required');
    }
    // Define the SQL query for insertion
    const query = 'INSERT INTO Trainees (firstName, lastName, gender, trade_id) VALUES (?, ?, ?, ?)';
    // Prepare the parameters, setting trade_id to null if not provided
    const params = [firstName, lastName, gender, trade_id || null];
    // Execute the insert query using the callback pattern
    pool.query(query, params, (err, result) => {
        if (err) {
            // Handle error
            console.error('Error creating trainee:', err);
            return res.status(500).send('Server Error');
        }
        // Send success response with the new trainee's ID
        res.status(201).json({ trainee_id: result.insertId, firstName, lastName, gender, trade_id });
    });
};

// Update a trainee by ID
exports.updateTrainee = (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, gender, trade_id } = req.body;

    // Check if at least one field is provided for update
    if (!firstName && !lastName && !gender && trade_id === undefined) {
        return res.status(400).send('At least one field is required for update');
    }

    let updateFields = [];
    let queryParams = [];

    // Build the update query dynamically based on provided fields
    if (firstName !== undefined) {
        updateFields.push('firstName = ?');
        queryParams.push(firstName);
    }
    if (lastName !== undefined) {
        updateFields.push('lastName = ?');
        queryParams.push(lastName);
    }
    if (gender !== undefined) {
        // Optional: Validate gender enum if necessary
        if (!['Male', 'Female', 'Other'].includes(gender)) {
             return res.status(400).send('Invalid gender value');
        }
        updateFields.push('gender = ?');
        queryParams.push(gender);
    }
    if (trade_id !== undefined) {
         // Set to null if trade_id is explicitly null or empty string
        updateFields.push('trade_id = ?');
        queryParams.push(trade_id === null || trade_id === '' ? null : trade_id);
    }

    // Construct the final SQL query
    const query = 'UPDATE Trainees SET ' + updateFields.join(', ') + ' WHERE trainee_id = ?';
    // Add the trainee ID to the parameters
    queryParams.push(id);

    // Execute the update query using the callback pattern
    pool.query(query, queryParams, (err, result) => {
        if (err) {
            // Handle error
            console.error('Error updating trainee:', err);
            return res.status(500).send('Server Error');
        }
        // Check if any rows were affected (trainee found and updated)
        if (result.affectedRows === 0) {
            return res.status(404).send('Trainee not found');
        }
        // Send success message
        res.send('Trainee updated successfully');
    });
};

// Delete a trainee by ID
exports.deleteTrainee = (req, res) => {
    const { id } = req.params;
    // Define the SQL query for deletion
    const query = 'DELETE FROM Trainees WHERE trainee_id = ?';
    // Execute the delete query using the callback pattern
    pool.query(query, [id], (err, result) => {
        if (err) {
            // Handle error
            console.error('Error deleting trainee:', err);
            return res.status(500).send('Server Error');
        }
        // Check if any rows were affected (trainee found and deleted)
        if (result.affectedRows === 0) {
            return res.status(404).send('Trainee not found');
        }
        // Send success message
        res.send('Trainee deleted successfully');
    });
};
