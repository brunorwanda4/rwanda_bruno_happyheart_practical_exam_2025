// controllers/marksController.js
const pool = require('../config/db');

// Get all marks (with details from related tables)
exports.getAllMarks = async (req, res) => {
    try {
        const query = `
            SELECT
                Marks.markId,
                Marks.trainee_id,
                Trainees.firstName AS trainee_firstName,
                Trainees.lastName AS trainee_lastName,
                Marks.trade_id,
                Trades.trade_name,
                Marks.module_id,
                Modules.modName,
                Marks.user_id,
                Users.username,
                Marks.formative_ass,
                Marks.summative_ass,
                Marks.comprehensive_ass,
                Marks.total_marks_100
            FROM Marks
            LEFT JOIN Trainees ON Marks.trainee_id = Trainees.trainee_id
            LEFT JOIN Trades ON Marks.trade_id = Trades.id
            LEFT JOIN Modules ON Marks.module_id = Modules.module_id
            LEFT JOIN Users ON Marks.user_id = Users.user_id
        `;
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching marks:', err);
        res.status(500).send('Server Error');
    }
};

// Get a single mark by ID (with details from related tables)
exports.getMarkById = async (req, res) => {
    const { id } = req.params;
    try {
         const query = `
            SELECT
                Marks.markId,
                Marks.trainee_id,
                Trainees.firstName AS trainee_firstName,
                Trainees.lastName AS trainee_lastName,
                Marks.trade_id,
                Trades.trade_name,
                Marks.module_id,
                Modules.modName,
                Marks.user_id,
                Users.username,
                Marks.formative_ass,
                Marks.summative_ass,
                Marks.comprehensive_ass,
                Marks.total_marks_100
            FROM Marks
            LEFT JOIN Trainees ON Marks.trainee_id = Trainees.trainee_id
            LEFT JOIN Trades ON Marks.trade_id = Trades.id
            LEFT JOIN Modules ON Marks.module_id = Modules.module_id
            LEFT JOIN Users ON Marks.user_id = Users.user_id
            WHERE Marks.markId = ?
        `;
        const [rows] = await pool.query(query, [id]);
        if (rows.length === 0) {
            return res.status(404).send('Mark not found');
        }
        res.json(rows[0]);
    } catch (err) {
        console.error('Error fetching mark by ID:', err);
        res.status(500).send('Server Error');
    }
};

// Create a new mark
exports.createMark = async (req, res) => {
    const { trainee_id, trade_id, module_id, user_id, formative_ass, summative_ass, comprehensive_ass, total_marks_100 } = req.body;

    // Basic validation
    if (trainee_id === undefined || trade_id === undefined || module_id === undefined || user_id === undefined) {
         return res.status(400).send('Required foreign key IDs (trainee_id, trade_id, module_id, user_id) are missing');
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO Marks (trainee_id, trade_id, module_id, user_id, formative_ass, summative_ass, comprehensive_ass, total_marks_100) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [trainee_id, trade_id, module_id, user_id, formative_ass || null, summative_ass || null, comprehensive_ass || null, total_marks_100 || null]
        );
        res.status(201).json({ markId: result.insertId, trainee_id, trade_id, module_id, user_id }); // Return basic info
    } catch (err) {
        console.error('Error creating mark:', err);
        // Handle potential foreign key constraint errors
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).send('Invalid foreign key ID provided (trainee_id, trade_id, module_id, or user_id does not exist)');
        }
        res.status(500).send('Server Error');
    }
};

// Update a mark by ID
exports.updateMark = async (req, res) => {
    const { id } = req.params;
    const { trainee_id, trade_id, module_id, user_id, formative_ass, summative_ass, comprehensive_ass, total_marks_100 } = req.body;

    let updateFields = [];
    let queryParams = [];
    let query = 'UPDATE Marks SET';

    // Add fields to update if they are provided in the request body
    if (trainee_id !== undefined) {
        updateFields.push('trainee_id = ?');
        queryParams.push(trainee_id);
    }
    if (trade_id !== undefined) {
        updateFields.push('trade_id = ?');
        queryParams.push(trade_id);
    }
    if (module_id !== undefined) {
        updateFields.push('module_id = ?');
        queryParams.push(module_id);
    }
    if (user_id !== undefined) {
        updateFields.push('user_id = ?');
        queryParams.push(user_id);
    }
    if (formative_ass !== undefined) {
        updateFields.push('formative_ass = ?');
        queryParams.push(formative_ass);
    }
    if (summative_ass !== undefined) {
        updateFields.push('summative_ass = ?');
        queryParams.push(summative_ass);
    }
    if (comprehensive_ass !== undefined) {
        updateFields.push('comprehensive_ass = ?');
        queryParams.push(comprehensive_ass);
    }
    if (total_marks_100 !== undefined) {
        updateFields.push('total_marks_100 = ?');
        queryParams.push(total_marks_100);
    }

    if (updateFields.length === 0) {
        return res.status(400).send('No fields provided for update');
    }

    query += ' ' + updateFields.join(', ') + ' WHERE markId = ?';
    queryParams.push(id);

    try {
        const [result] = await pool.query(query, queryParams);
        if (result.affectedRows === 0) {
            return res.status(404).send('Mark not found');
        }
        res.send('Mark updated successfully');
    } catch (err) {
        console.error('Error updating mark:', err);
         // Handle potential foreign key constraint errors
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
             return res.status(400).send('Invalid foreign key ID provided (trainee_id, trade_id, module_id, or user_id does not exist)');
        }
        res.status(500).send('Server Error');
    }
};

// Delete a mark by ID
exports.deleteMark = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM Marks WHERE markId = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Mark not found');
        }
        res.send('Mark deleted successfully');
    } catch (err) {
        console.error('Error deleting mark:', err);
        res.status(500).send('Server Error');
    }
};
