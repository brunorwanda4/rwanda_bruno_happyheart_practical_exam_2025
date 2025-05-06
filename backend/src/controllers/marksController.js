// controllers/marksController.js
const pool = require('../config/db');

// Get all marks (with details from related tables)
exports.getAllMarks = (req, res) => {
    // Define the SQL query
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
    // Execute the query using the callback pattern
    pool.query(query, (err, rows) => {
        if (err) {
            // Handle the error case
            console.error('Error fetching marks:', err);
            return res.status(500).send('Server Error');
        }
        // Handle the success case
        res.json(rows);
    });
};

// Get a single mark by ID (with details from related tables)
exports.getMarkById = (req, res) => {
    const { id } = req.params;
    // Define the SQL query with a placeholder for the ID
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
    // Execute the query using the callback pattern, passing the ID as a parameter
    pool.query(query, [id], (err, rows) => {
        if (err) {
            // Handle the error case
            console.error('Error fetching mark by ID:', err);
            return res.status(500).send('Server Error');
        }
        // Check if a mark was found
        if (rows.length === 0) {
            return res.status(404).send('Mark not found');
        }
        // Send the first row (the mark)
        res.json(rows[0]);
    });
};

// Create a new mark
exports.createMark = (req, res) => {
    const { trainee_id, trade_id, module_id, user_id, formative_ass, summative_ass, comprehensive_ass, total_marks_100 } = req.body;

    // Basic validation
    if (trainee_id === undefined || trade_id === undefined || module_id === undefined || user_id === undefined) {
         return res.status(400).send('Required foreign key IDs (trainee_id, trade_id, module_id, user_id) are missing');
    }

    // Define the SQL query for insertion
    const query = 'INSERT INTO Marks (trainee_id, trade_id, module_id, user_id, formative_ass, summative_ass, comprehensive_ass, total_marks_100) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    // Prepare the parameters, setting optional fields to null if not provided
    const params = [trainee_id, trade_id, module_id, user_id, formative_ass || null, summative_ass || null, comprehensive_ass || null, total_marks_100 || null];

    // Execute the insert query using the callback pattern
    pool.query(query, params, (err, result) => {
        if (err) {
            // Handle the error case
            console.error('Error creating mark:', err);
            // Handle potential foreign key constraint errors
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                 return res.status(400).send('Invalid foreign key ID provided (trainee_id, trade_id, module_id, or user_id does not exist)');
            }
            return res.status(500).send('Server Error');
        }
        // Send success response with the new mark's ID and basic info
        res.status(201).json({ markId: result.insertId, trainee_id, trade_id, module_id, user_id });
    });
};

// Update a mark by ID
exports.updateMark = (req, res) => {
    const { id } = req.params;
    const { trainee_id, trade_id, module_id, user_id, formative_ass, summative_ass, comprehensive_ass, total_marks_100 } = req.body;

    let updateFields = [];
    let queryParams = [];

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

    // Check if at least one field is provided for update
    if (updateFields.length === 0) {
        return res.status(400).send('No fields provided for update');
    }

    // Construct the final SQL query
    const query = 'UPDATE Marks SET ' + updateFields.join(', ') + ' WHERE markId = ?';
    // Add the mark ID to the parameters
    queryParams.push(id);

    // Execute the update query using the callback pattern
    pool.query(query, queryParams, (err, result) => {
        if (err) {
            // Handle the error case
            console.error('Error updating mark:', err);
            // Handle potential foreign key constraint errors
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                 return res.status(400).send('Invalid foreign key ID provided (trainee_id, trade_id, module_id, or user_id does not exist)');
            }
            return res.status(500).send('Server Error');
        }
        // Check if any rows were affected (mark found and updated)
        if (result.affectedRows === 0) {
            return res.status(404).send('Mark not found');
        }
        // Send success message
        res.send('Mark updated successfully');
    });
};

// Delete a mark by ID
exports.deleteMark = (req, res) => {
    const { id } = req.params;
    // Define the SQL query for deletion
    const query = 'DELETE FROM Marks WHERE markId = ?';
    // Execute the delete query using the callback pattern
    pool.query(query, [id], (err, result) => {
        if (err) {
            // Handle the error case
            console.error('Error deleting mark:', err);
            return res.status(500).send('Server Error');
        }
        // Check if any rows were affected (mark found and deleted)
        if (result.affectedRows === 0) {
            return res.status(404).send('Mark not found');
        }
        // Send success message
        res.send('Mark deleted successfully');
    });
};
