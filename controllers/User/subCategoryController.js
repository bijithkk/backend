const subcategoryModel = require("../../models/subcategoryModel");

// create new subcategory
exports.createSubcategory = async(req,res) => {
    try {
        const { name,categoryId } = req.body;
        if(!name){
            return res.status(400).json({ message: "subcategory name is required" })
        }
        if(!categoryId){
            return res.status(400).json({ message: "category name is required" })
        }
        const newSubcategory = new subcategoryModel({
            name,
            category:categoryId
        });
        await newSubcategory.save();
        res.status(201).json({ message: 'Subcategory created successfully', subCategory: newSubcategory });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Subcategory', error: error.message });
    }
}

// get all subcategories by categoryId
exports.getSubcategoriesCategory = async(req,res) => {
    try {
        const { categoryId } = req.query;
        const allSubcategories = await subcategoryModel.find({category:categoryId});
        if(allSubcategories.length === 0){
            return res.status(200).json({ message: "no subcategories" })
        }
        res.status(201).json({ message: 'Subcategory fetched successfully', data: allSubcategories });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Subcategory', error: error.message });
    }
}

// get all subcategories
exports.getAllSubcategories = async(req,res) => {
    try {
        const allSubcategories = await subcategoryModel.find();
        if(allSubcategories.length === 0){
            return res.status(200).json({ message: "no subcategories" })
        }
        res.status(201).json({ message: 'Subcategory fetched successfully', data: allSubcategories });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Subcategory', error: error.message });
    }
}