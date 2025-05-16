const wishlistModel = require("../../models/wishlistModel");

//add to wishlist
exports.addToWishList = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  try {
    const newWishlist = await wishlistModel({ userId, productId });
    await newWishlist.save();
    res
      .status(200)
      .json({ message: "Product added to wishlist", wishlist: newWishlist });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate entry error
      return res.status(400).json({ message: "Product already in wishlist" });
    }
    res
      .status(500)
      .json({
        message: "Error adding product to wishlist",
        error: error.message,
      });
  }
};

// get all user wishlist
exports.getUserWishlist = async (req, res) => {
  const userId = req.user.id;

  try {
    const wishlist = await wishlistModel.find({ userId }).populate("productId");
    if(wishlist.length === 0){
        return res.status(200).json({message:"no wishlist products"})
    }
    res.status(200).json(wishlist);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching wishlist", error: error.message });
  }
};

//remove product from wishlist
exports.removeFromWishlist = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  console.log("userId",userId)
  console.log("productId",productId)

  try {
    const result = await wishlistModel.findOneAndDelete({ userId, productId });
    console.log("result",result);
    if (!result) {
      return res.status(404).json({ message: "Product not in wishlist" });
    }

    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error removing product from wishlist",
        error: error.message,
      });
  }
};