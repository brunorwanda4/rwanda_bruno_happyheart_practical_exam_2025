// routes/modules.js
const express = require('express');
const router = express.Router();
const modulesController = require('../controllers/modulesController');

// GET all modules
router.get('/', modulesController.getAllModules);

// GET a single module by ID
router.get('/:id', modulesController.getModuleById);

// POST create a new module
router.post('/', modulesController.createModule);

// PUT update a module by ID
router.put('/:id', modulesController.updateModule);

// DELETE a module by ID
router.delete('/:id', modulesController.deleteModule);

module.exports = router;
