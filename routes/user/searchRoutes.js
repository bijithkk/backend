const express = require('express');
const router = express.Router();
const searchController = require('../../controllers/User/searchController');
const verifyToken = require('../../middleware/jwt');

// search with product name
router.get('/search',verifyToken,searchController.searchProduct);

module.exports = router;