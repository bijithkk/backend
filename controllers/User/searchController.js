const getProduct = require("../../utils/getProducts");

// search with product name
exports.searchProduct = async (req, res) => {
  try {
    const { productName } = req.query;
    console.log("productName",productName)
    const allProducts = await getProduct(req.user.id);

    const filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(productName.toLowerCase())
    );
    res.status(200).json({
      message: "Products fetched successfully",
      data: filteredProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while searching products",
      error: error.message,
    });
  }
};
