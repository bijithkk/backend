const getProduct = require("../../utils/getProducts");

exports.getPaginatedProducts = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 6;
    const skip = (page - 1) * limit;

    const allProducts = await getProduct(req.user.id);

    const paginatedProducts = allProducts.slice(skip, skip + limit);

    res.status(200).json({
      message: "Paginated products fetched successfully",
      currentPage: parseInt(page),
      totalPages: Math.ceil(allProducts.length / limit),
      totalResults: allProducts.length,
      data: paginatedProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch paginated products",
      error: error.message,
    });
  }
};
