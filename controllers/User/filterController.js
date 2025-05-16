const getProduct = require("../../utils/getProducts");

// product filter based on subcategory
exports.subcategoryFilter = async (req, res) => {
  try {
    const { subcategoryId } = req.query;
    const allProducts = await getProduct(req.user.id);

    const filteredProducts = allProducts.filter((product) => product.subCategory._id.toString() ===subcategoryId );
    res.status(200).json({
      message: "Products fetched successfully",
      data: filteredProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while filter products",
      error: error.message,
    });
  }
};
