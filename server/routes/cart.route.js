const express = require('express');
const { CartModel } = require('../models/cart.model');
const auth = require('../middlewares/auth.middleware');
const cartRouter = express.Router();

cartRouter.get("/view-cart", auth, async (req, res) => {
    try {
        const carts = await CartModel.find({
            userId: req.user._id,
            ...req.query, // Spread the query object to apply filters if any
        });
        res.status(200).send(carts);
    } catch (error) {
        console.log(error);
        res.status(500).send({ err: "Something went wrong", error });
    }
});

cartRouter.post("/add-to-cart", [auth], async (req, res) => {
    const payload = req.body;
    try {
        const new_cart = new CartModel({
            userId: req.user._id,
            ...payload
        });
        await new_cart.save();
        res.status(201).send("add new cartItems");
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Something went wrong" });
    }
});

cartRouter.patch("/update-cart/:id", auth, async (req, res) => {
    const payload = req.body;
    const id = req.params.id;
    try {
        const cart = await CartModel.findByIdAndUpdate(
            { _id: id, userId: req.user._id },
            payload,
            { new: true }  // This option returns the updated document
        );

        if (cart) {
            res.status(200).send({
                success: true,
                msg: "Successfully updated the cart item",
                cart: cart,
            });
        } else {
            res.status(404).send({
                success: false,
                msg: "Cart item not found",
            });
        }
    } catch (err) {
        console.log({ err: err, msg: "Cart Update Error!" });
        res.status(500).send({ success: false, msg: "Cart Update Error!", err: err });
    }
});


cartRouter.delete("/delete-cart/:id", auth, async (req, res) => {
    const id = req.params.id;
    try {
        await CartModel.findByIdAndDelete({ _id: id, userId: req.user._id });
        res.json({ status: 200, message: "Deleted The cartItem" });
    } catch (err) {
        console.log("err :", err);
        res.send({ msg: err });
    }
});
cartRouter.delete("/delete-cart", auth, async (req, res) => {
    try {
        // Delete all cart items associated with the user
        await CartModel.deleteMany({ userId: req.user._id });
        res.status(200).json({ status: 200, message: "Deleted the cart" });
    } catch (err) {
        console.log("err :", err);
        res.status(500).send({ msg: "Cart deletion failed", error: err });
    }
});

module.exports = { cartRouter };