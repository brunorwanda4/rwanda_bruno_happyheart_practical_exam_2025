// controllers/tradesController.js
const pool = require('../config/db');

exports.getAllTrades = (req, res) => {
    pool.query('SELECT * FROM Trades', (err, rows) => {
        if (err) {
            console.error('Error fetching trades:', err);
            return res.status(500).send('Server Error');
        }
        res.json(rows);
    });
};

// Get a single trade by ID
exports.getTradeById = (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM Trades WHERE id = ?', [id], (err, rows) => {
        if (err) {
            console.error('Error fetching trade by ID:', err);
            return res.status(500).send('Server Error');
        }
        if (rows.length === 0) {
            return res.status(404).send('Trade not found');
        }
        res.json(rows[0]);
    });
};

// Create a new trade
exports.createTrade = (req, res) => {
    const { trade_name } = req.body;
    if (!trade_name) {
        return res.status(400).send('Trade name is required');
    }
    pool.query('INSERT INTO Trades (trade_name) VALUES (?)', [trade_name], (err, result) => {
        if (err) {
            console.error('Error creating trade:', err);
            return res.status(500).send('Server Error');
        }
        res.status(201).json({ id: result.insertId, trade_name });
    });
};

// Update a trade by ID
exports.updateTrade = (req, res) => {
    const { id } = req.params;
    const { trade_name } = req.body;
    if (!trade_name) {
        return res.status(400).send('Trade name is required for update');
    }
    pool.query('UPDATE Trades SET trade_name = ? WHERE id = ?', [trade_name, id], (err, result) => {
        if (err) {
            console.error('Error updating trade:', err);
            return res.status(500).send('Server Error');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Trade not found');
        }
        res.send('Trade updated successfully');
    });
};

exports.deleteTrade = (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM Trades WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error deleting trade:', err);
            return res.status(500).send('Server Error');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Trade not found');
        }
        // Send success message
        res.send('Trade deleted successfully');
    });
};
