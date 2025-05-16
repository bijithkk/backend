const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/User/categoryController');
const verifyToken = require('../../middleware/jwt');

// create category
router.post('/add',verifyToken,categoryController.createCategory);

// Get all categories
router.get('/view',verifyToken,categoryController.getAllCategories);

module.exports = router;