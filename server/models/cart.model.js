const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    imageTsrc: String,
    productRefLink: String,
    rating: String,
    colors: String,
    price: String,
    mPrice: String,
    name: String,
    shape: String,
    gender: String,
    style: String,
    dimension: String,
    productType: String,
    productId: String,
    userRated: String,
    quntity: String,
    id: Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', required: true
    },
    qty:{
        type:Number,
        default:1
    }
});

const CartModel = mongoose.model("cart", cartSchema);

module.exports = {
    CartModel,
};