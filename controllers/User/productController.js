const productModel = require("../../models/productModel");
const cloudinary = require('cloudinary');
const getProduct = require('../../utils/getProducts');

exports.createProduct = async (req, res) => {
  try {
    console.log("body",req.body)
    const { title, variants, subCategory, description } = req.body;

    const parsedVariants = JSON.parse(variants);

    const uploadedImages = ["image1", "image2", "image3"]
      .map((key) => req.files[key]?.[0])
      .filter(Boolean);

    const imageUrls = await Promise.all(
      uploadedImages.map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: "products",
          resource_type: 'image',
        }).then((res) => res.secure_url)
      )
    );

    console.log("URL",imageUrls);

    const productData = {
        title,
        variants: parsedVariants,
        subCategory,
        description,
        image:imageUrls
    }
    const product = new productModel(productData);
    await product.save();
    res.status(201).json({
      message: "Product created successfully",
      product
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error", error:error.message });
  }
};

exports.getAllProducts = async(req,res) => {
  try {
    let userId;
    if (req.user && req.user.id) {
      userId = req.user.id;
    }
    const allProducts = await getProduct(userId);
    if(allProducts.length === 0){
      return res.status(404).json({ message: "No products" })
    }
    res.status(200).json({ message: "Products fetched successfully",allProducts })
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
}

// get product by id
exports.getProductById = async (req,res) => {
  try {
    const {id} = req.params;
    const product = await productModel.findById(id);
    if(!product){
      return res.status(404).json({ message: 'No product found' });
    }
    res.status(200).json({ message: "Product fetched successfully",product })
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
}

// update product by id
exports.updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const { title, variants, subCategory, description } = req.body;
    
    // Check if the product exists
    const existingProduct = await productModel.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    // Parse variants if provided
    let parsedVariants;
    if (variants) {
      parsedVariants = JSON.parse(variants);
    }
    
    // Handle image uploads if any
    let imageUrls = existingProduct.image; // Keep existing images by default
    
    const uploadedImages = ["image1", "image2", "image3"]
      .map((key) => req.files && req.files[key]?.[0])
      .filter(Boolean);
    
    if (uploadedImages.length > 0) {
      // Upload new images to cloudinary
      const newImageUrls = await Promise.all(
        uploadedImages.map((file) =>
          cloudinary.uploader.upload(file.path, {
            folder: "products",
            resource_type: 'image',
          }).then((res) => res.secure_url)
        )
      );
      
      // Replace or append images based on your requirement
      // Here we're replacing the images completely
      imageUrls = newImageUrls;
    }
    
    // Create update object with only the fields that were provided
    const updateData = {};
    if (title) updateData.title = title;
    if (parsedVariants) updateData.variants = parsedVariants;
    if (subCategory) updateData.subCategory = subCategory;
    if (description) updateData.description = description;
    if (uploadedImages.length > 0) updateData.image = imageUrls;
    
    // Update the product
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updateData,
      { new: true } // Return the updated document
    );
    
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};