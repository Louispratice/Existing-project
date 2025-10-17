const mongoose = require("mongoose");

// TODO: Use 'new mongoose.Schema(...)' instead of 'mongoose.Schema(...)' for schema creation.
const productSchema = mongoose.Schema(
{
   // TIP: Add 'trim: true' and maybe 'minlength' for validation
   name:{
    type: String,
    required: [true,"please enter product name"],
   },

   // TIP: Consider adding 'min: 0' to prevent negative quantities
quantity:{
        type: Number,
        required: true,
        default:0
    },

// TIP: Consider adding 'min: 0' and currency handling in controllers
price:{
    type: Number,
    required: true,
    default:0,
    },

// TODO: Use capitalized 'String' here. Also consider default: null and URL validation.
image:{
    type: string,
    required:false
    },
},
{
    timestamps: true
}
);


// TODO: Correct model declaration to: const Product = mongoose.model('Product', productSchema)
// TODO: Use PascalCase for model variable names (Product) and export that.
const product = mongoose.model("Product,productSchema");

// TIP: Export the correct variable name (e.g., module.exports = Product)
module.exports = product;