// controllers/modulesController.js
const pool = require('../config/db');

exports.getAllModules = (req, res) => {
    pool.query('SELECT * FROM Modules', (err, rows) => {
        if (err) {
            console.error('Error fetching modules:', err);
            return res.status(500).send('Server Error');
        }
        res.json(rows);
    });
};

exports.getModuleById = (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM Modules WHERE module_id = ?', [id], (err, rows) => {
        if (err) {
            console.error('Error fetching module by ID:', err);
            return res.status(500).send('Server Error');
        }
        if (rows.length === 0) {
            return res.status(404).send('Module not found');
        }
        res.json(rows[0]);
    });
};

exports.createModule = (req, res) => {
    const { modName, modCredits } = req.body;
    // Basic validation
    if (!modName || modCredits === undefined) {
        return res.status(400).send('Module name and credits are required');
    }
    pool.query('INSERT INTO Modules (modName, modCredits) VALUES (?, ?)', [modName, modCredits], (err, result) => {
        if (err) {
            console.error('Error creating module:', err);
            return res.status(500).send('Server Error');
        }
        res.status(201).json({ module_id: result.insertId, modName, modCredits });
    });
};

exports.updateModule = (req, res) => {
    const { id } = req.params;
    const { modName, modCredits } = req.body;

    if (!modName && modCredits === undefined) {
        return res.status(400).send('At least module name or credits is required for update');
    }

    let updateFields = [];
    let queryParams = [];

    if (modName !== undefined) {
        updateFields.push('modName = ?');
        queryParams.push(modName);
    }
    if (modCredits !== undefined) {
        updateFields.push('modCredits = ?');
        queryParams.push(modCredits);
    }

    const query = 'UPDATE Modules SET ' + updateFields.join(', ') + ' WHERE module_id = ?';
    queryParams.push(id);

    pool.query(query, queryParams, (err, result) => {
        if (err) {
            // Handle the error case
            console.error('Error updating module:', err);
            return res.status(500).send('Server Error');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Module not found');
        }
        // Send success message
        res.send('Module updated successfully');
    });
};

exports.deleteModule = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Modules WHERE module_id = ?';
    pool.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting module:', err);
            return res.status(500).send('Server Error');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Module not found');
        }
        // Send success message
        res.send('Module deleted successfully');
    });
};
