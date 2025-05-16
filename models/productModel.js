const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  variants: [{
    ram: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }],
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    required: true,
  },
  description: { type: String, required: true },
  // images: {
  //     type: [String],
  //     validate: {
  //       validator: function (val) { return val.length <= 5; },
  //       message: "Maximum 5 images allowed",
  //     },
  //   },
  image:{type:Array,require:true}
});

module.exports = mongoose.model("Product", productSchema);