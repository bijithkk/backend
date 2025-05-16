const express = require('express');
const router = express.Router();
const paginationController = require('../../controllers/User/paginationController');
const verifyToken = require('../../middleware/jwt');

// pagination
router.get('/',verifyToken,paginationController.getPaginatedProducts);

module.exports = router;