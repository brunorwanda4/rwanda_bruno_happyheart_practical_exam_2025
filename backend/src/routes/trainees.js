// routes/trainees.js
const express = require('express');
const router = express.Router();
const traineesController = require('../controllers/traineesController');

// GET all trainees
router.get('/', traineesController.getAllTrainees);

// GET a single trainee by ID
router.get('/:id', traineesController.getTraineeById);

// POST create a new trainee
router.post('/', traineesController.createTrainee);

// PUT update a trainee by ID
router.put('/:id', traineesController.updateTrainee);

// DELETE a trainee by ID
router.delete('/:id', traineesController.deleteTrainee);

module.exports = router;
