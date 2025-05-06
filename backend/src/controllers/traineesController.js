// controllers/traineesController.js
const pool = require('../config/db');

exports.getAllTrainees = async (req, res) => {
    try {
        // Join with Trades table to show trade name
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
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching trainees:', err);
        res.status(500).send('Server Error');
    }
};

// Get a single trainee by ID (with optional trade name)
exports.getTraineeById = async (req, res) => {
    const { id } = req.params;
    try {
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
        const [rows] = await pool.query(query, [id]);
        if (rows.length === 0) {
            return res.status(404).send('Trainee not found');
        }
        res.json(rows[0]);
    } catch (err) {
        console.error('Error fetching trainee by ID:', err);
        res.status(500).send('Server Error');
    }
};

// Create a new trainee
exports.createTrainee = async (req, res) => {
    const { firstName, lastName, gender, trade_id } = req.body;
    if (!firstName || !lastName || !gender) {
        return res.status(400).send('First name, last name, and gender are required');
    }
    // Optional: Validate if trade_id exists in Trades table
    try {
        const [result] = await pool.query('INSERT INTO Trainees (firstName, lastName, gender, trade_id) VALUES (?, ?, ?, ?)', [firstName, lastName, gender, trade_id || null]);
        res.status(201).json({ trainee_id: result.insertId, firstName, lastName, gender, trade_id });
    } catch (err) {
        console.error('Error creating trainee:', err);
        res.status(500).send('Server Error');
    }
};

// Update a trainee by ID
exports.updateTrainee = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, gender, trade_id } = req.body;
    if (!firstName && !lastName && !gender && trade_id === undefined) {
        return res.status(400).send('At least one field is required for update');
    }

    let updateFields = [];
    let queryParams = [];
    let query = 'UPDATE Trainees SET';

    if (firstName !== undefined) {
        updateFields.push('firstName = ?');
        queryParams.push(firstName);
    }
    if (lastName !== undefined) {
        updateFields.push('lastName = ?');
        queryParams.push(lastName);
    }
    if (gender !== undefined) {
        // Validate gender enum if necessary
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


    query += ' ' + updateFields.join(', ') + ' WHERE trainee_id = ?';
    queryParams.push(id);

    try {
        const [result] = await pool.query(query, queryParams);
        if (result.affectedRows === 0) {
            return res.status(404).send('Trainee not found');
        }
        res.send('Trainee updated successfully');
    } catch (err) {
        console.error('Error updating trainee:', err);
        res.status(500).send('Server Error');
    }
};

exports.deleteTrainee = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM Trainees WHERE trainee_id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Trainee not found');
        }
        res.send('Trainee deleted successfully');
    } catch (err) {
        console.error('Error deleting trainee:', err);
        res.status(500).send('Server Error');
    }
};
