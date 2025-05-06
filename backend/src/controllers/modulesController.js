// controllers/modulesController.js
const pool = require('../config/db');

// Get all modules
exports.getAllModules = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Modules');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching modules:', err);
        res.status(500).send('Server Error');
    }
};

// Get a single module by ID
exports.getModuleById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Modules WHERE module_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).send('Module not found');
        }
        res.json(rows[0]);
    } catch (err) {
        console.error('Error fetching module by ID:', err);
        res.status(500).send('Server Error');
    }
};

// Create a new module
exports.createModule = async (req, res) => {
    const { modName, modCredits } = req.body;
    if (!modName || modCredits === undefined) {
        return res.status(400).send('Module name and credits are required');
    }
    try {
        const [result] = await pool.query('INSERT INTO Modules (modName, modCredits) VALUES (?, ?)', [modName, modCredits]);
        res.status(201).json({ module_id: result.insertId, modName, modCredits });
    } catch (err) {
        console.error('Error creating module:', err);
        res.status(500).send('Server Error');
    }
};

// Update a module by ID
exports.updateModule = async (req, res) => {
    const { id } = req.params;
    const { modName, modCredits } = req.body;
    if (!modName && modCredits === undefined) {
        return res.status(400).send('At least module name or credits is required for update');
    }

    let updateFields = [];
    let queryParams = [];
    let query = 'UPDATE Modules SET';

    if (modName !== undefined) {
        updateFields.push('modName = ?');
        queryParams.push(modName);
    }
    if (modCredits !== undefined) {
        updateFields.push('modCredits = ?');
        queryParams.push(modCredits);
    }

    query += ' ' + updateFields.join(', ') + ' WHERE module_id = ?';
    queryParams.push(id);

    try {
        const [result] = await pool.query(query, queryParams);
        if (result.affectedRows === 0) {
            return res.status(404).send('Module not found');
        }
        res.send('Module updated successfully');
    } catch (err) {
        console.error('Error updating module:', err);
        res.status(500).send('Server Error');
    }
};

// Delete a module by ID
exports.deleteModule = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM Modules WHERE module_id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Module not found');
        }
        res.send('Module deleted successfully');
    } catch (err) {
        console.error('Error deleting module:', err);
        res.status(500).send('Server Error');
    }
};
