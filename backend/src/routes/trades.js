// routes/trades.js
const express = require('express');
const router = express.Router();
const tradesController = require('../controllers/tradesController');

// GET all trades
router.get('/', tradesController.getAllTrades);

// GET a single trade by ID
router.get('/:id', tradesController.getTradeById);

// POST create a new trade
router.post('/', tradesController.createTrade);

// PUT update a trade by ID
router.put('/:id', tradesController.updateTrade);

// DELETE a trade by ID
router.delete('/:id', tradesController.deleteTrade);

module.exports = router;
