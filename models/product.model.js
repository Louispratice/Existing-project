const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
{
   name:{
    type: String,
    required: [true,"please enter product name"],
   },

quantity:{
        type: Number,
        required: true,
        default:0
    },

price:{
    type: Number,
    required: true,
    default:0,
    },

image:{
    type: string,
    required:false
    },
},
{
    timestamps: true
}
);


const product = mongoose.model("Product,productSchema");

module.exports = product;