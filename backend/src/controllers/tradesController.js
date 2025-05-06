// controllers/tradesController.js
const pool = require('../config/db');

// Get all trades
exports.getAllTrades = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Trades');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching trades:', err);
        res.status(500).send('Server Error');
    }
};

// Get a single trade by ID
exports.getTradeById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Trades WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).send('Trade not found');
        }
        res.json(rows[0]);
    } catch (err) {
        console.error('Error fetching trade by ID:', err);
        res.status(500).send('Server Error');
    }
};

// Create a new trade
exports.createTrade = async (req, res) => {
    const { trade_name } = req.body;
    if (!trade_name) {
        return res.status(400).send('Trade name is required');
    }
    try {
        const [result] = await pool.query('INSERT INTO Trades (trade_name) VALUES (?)', [trade_name]);
        res.status(201).json({ id: result.insertId, trade_name });
    } catch (err) {
        console.error('Error creating trade:', err);
        res.status(500).send('Server Error');
    }
};

// Update a trade by ID
exports.updateTrade = async (req, res) => {
    const { id } = req.params;
    const { trade_name } = req.body;
    if (!trade_name) {
        return res.status(400).send('Trade name is required for update');
    }
    try {
        const [result] = await pool.query('UPDATE Trades SET trade_name = ? WHERE id = ?', [trade_name, id]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Trade not found');
        }
        res.send('Trade updated successfully');
    } catch (err) {
        console.error('Error updating trade:', err);
        res.status(500).send('Server Error');
    }
};

// Delete a trade by ID
exports.deleteTrade = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM Trades WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Trade not found');
        }
        res.send('Trade deleted successfully');
    } catch (err) {
        console.error('Error deleting trade:', err);
        res.status(500).send('Server Error');
    }
};
