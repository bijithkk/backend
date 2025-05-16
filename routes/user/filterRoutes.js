const express = require('express');
const router = express.Router();
const filterController = require('../../controllers/User/filterController');
const verifyToken = require('../../middleware/jwt');

// subcategory product filter
router.get('/',verifyToken,filterController.subcategoryFilter);

module.exports = router;