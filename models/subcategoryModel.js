const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name: {type:String,require:true},
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
},{timestamps:true});

module.exports = mongoose.model("Subcategory",subCategorySchema);