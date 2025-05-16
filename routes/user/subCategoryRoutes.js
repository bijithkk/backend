const express = require('express');
const router = express.Router();
const subCategoryController = require('../../controllers/User/subCategoryController');
const verifyToken = require('../../middleware/jwt');

// create subcategory
router.post('/add',verifyToken,subCategoryController.createSubcategory);

// get all subcategories by categoryId
router.get('/view',subCategoryController.getSubcategoriesCategory);

// get all subcategories 
router.get('/subcategories',verifyToken,subCategoryController.getAllSubcategories);

module.exports = router;