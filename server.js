const express = require('express');
const cors = require('cors');
require("dotenv").config();
require("./config/db");
const connectCloudinary = require("./config/cloudinary");
connectCloudinary();

// user routes
const userAuth = require('./routes/user/authRoutes');
const userCategoryRoutes = require('./routes/user/categoryRoutes');
const userSubcategoryRoutes = require('./routes/user/subCategoryRoutes');
const userProductRoutes = require('./routes/user/productRoutes');
const userWishlistRoutes = require('./routes/user/wishlistRoutes');
const userSearchRoutes = require('./routes/user/searchRoutes');
const userFilterRoutes = require('./routes/user/filterRoutes');
const userPaginationRoutes = require('./routes/user/paginationRoutes');

// APP config
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/user/auth",userAuth);
app.use("/user/category",userCategoryRoutes);
app.use("/user/subcategory",userSubcategoryRoutes);
app.use("/user/product",userProductRoutes);
app.use("/user/wishlist",userWishlistRoutes);
app.use("/user/search",userSearchRoutes);
app.use("/user/filter",userFilterRoutes);
app.use("/user/pagination",userPaginationRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});