const categoryModel = require('../../models/categoryModel');

// Create new category
exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        const newCategory = new categoryModel({ name });
        await newCategory.save();

        res.status(201).json({
            message: 'Category created successfully',
            category: newCategory
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating category',
            error: error.message // ✅ fixed from 'err.message' to 'error.message'
        });
    }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const allCategories = await categoryModel.find();

        if (allCategories.length === 0) {
            return res.status(404).json({ message: "No categories found" });
        }

        res.status(200).json({
            message: "All categories fetched successfully",
            allCategories
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching categories',
            error: error.message
        });
    }
};
