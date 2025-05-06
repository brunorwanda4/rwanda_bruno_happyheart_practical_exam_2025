// routes/marks.js
const express = require('express');
const router = express.Router();
const marksController = require('../controllers/marksController');

// GET all marks
router.get('/', marksController.getAllMarks);

// GET a single mark by ID
router.get('/:id', marksController.getMarkById);

// POST create a new mark
router.post('/', marksController.createMark);

// PUT update a mark by ID
router.put('/:id', marksController.updateMark);

// DELETE a mark by ID
router.delete('/:id', marksController.deleteMark);

module.exports = router;
