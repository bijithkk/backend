const express = require('express');
const router = express.Router();
const productController = require('../../controllers/User/productController');
const verifyToken = require('../../middleware/jwt');
const upload = require('../../middleware/multer');

const imageFields = upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
]);

// create category
router.post('/add',verifyToken,imageFields,productController.createProduct);

// get all products
router.get("/get",verifyToken,productController.getAllProducts);

// get product by id
router.get("/get/:id",verifyToken,productController.getProductById);

// update product by id
router.patch("/update/:id",imageFields,productController.updateProductById);

module.exports = router;