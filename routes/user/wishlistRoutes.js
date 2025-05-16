const express = require('express');
const router = express.Router();
const wishlistController = require('../../controllers/User/wishlistController');
const verifyToken = require('../../middleware/jwt');

//add to wishlist
router.post('/add',verifyToken,wishlistController.addToWishList);

// get all user wishlist
router.get('/get',verifyToken,wishlistController.getUserWishlist);

//remove product from wishlist
router.delete('/delete',verifyToken,wishlistController.removeFromWishlist);

module.exports = router;