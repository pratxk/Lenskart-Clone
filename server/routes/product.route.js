const express = require("express");
const auth = require("../middlewares/auth.middleware");
const checkAdmin = require("../middlewares/checkAdmin.Middleware");
const { ProductModel } = require("../models/product.model");

const productRouter = express.Router();

productRouter.use(express.json());

productRouter.get("/", async (req, res) => {
    try {
        const query = {};

        // Adding filters to the query object
        if (req.query.rating) query.rating = req.query.rating;
        if (req.query.colors) query.colors = { $regex: req.query.colors, $options: "i" };
        if (req.query.price) query.price = req.query.price;
        if (req.query.mPrice) query.mPrice = req.query.mPrice;
        if (req.query.shape) query.shape = req.query.shape;
        if (req.query.gender) query.gender = { $regex: req.query.gender, $options: "i" };
        if (req.query.style) query.style = req.query.style;
        if (req.query.dimension) query.dimension = req.query.dimension;
        if (req.query.productType) query.productType = req.query.productType;
        if (req.query.userRated) query.userRated = req.query.userRated;
        if (req.query.search) query.name = { $regex: req.query.search, $options: "i" };
        if (req.query.productRefLink) query.productRefLink = { $regex: req.query.productRefLink, $options: "i" };

        // Handle sorting, pagination, and query execution
        const sortOrder = req.query.sort === "lowtohigh" ? 1 : -1;
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5;

        // Calculate total pages and skip value for pagination
        const totalResults = await ProductModel.countDocuments(query);
        const totalPages = Math.ceil(totalResults / limit);
        const skip = (page - 1) * limit; // Adjust skip calculation here

        const products = await ProductModel.find(query)
            .sort({ price: sortOrder })
            .skip(skip)
            .limit(limit);

        // Send the response with status 200, including pagination information
        res.status(200).send({
            products,
            totalPages,
            currentPage: page,
            totalResults
        });
    } catch (error) {
        // Handle errors and send a 500 status if something goes wrong
        res.status(500).send({ error: 'An error occurred while fetching products.' });
    }
});



productRouter.get("/get-single-product/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findById({ _id: id });
        if (product) {
            res.status(200).json({
                success: true,
                product: product,
            });
        }
    } catch (err) {
        console.log({ err: err });
        res.status(400).send({ success: false, err: err });
    }
});

productRouter.post("/create-product", [auth, checkAdmin], async (req, res) => {
    const payload = req.body;
    try {
        const newProduct = new ProductModel(payload);
        await newProduct.save();
        res.status(201).json({ newProduct, message: "New Products successfully Added" });
    } catch (err) {
        console.log("err :", err);
        res.status(400).send({ msg: err });
    }
});

productRouter.post("/many", [auth, checkAdmin], async (req, res) => {
    const payload = req.body;
    try {
        const newProduct = await ProductModel.insertMany(payload);
        res.status(201).send(newProduct);
    } catch (err) {
        console.log("err :", err);
        res.status(400).send({ msg: err });
    }
});

productRouter.patch("/update-product/:id", [auth, checkAdmin], async (req, res) => {
    const payload = req.body;
    const id = req.params.id;
    try {
        const product = await ProductModel.findByIdAndUpdate({ _id: id }, payload);
        res.status(204).send({
            success: true,
            msg: "Successfully Updated the product",
            products: product,
        });
        await product.save();
    } catch (err) {
        console.log({ err: err, msg: " Product Update Error!" });
        res.send({ success: false, msg: " Product Update Error!", err: err });
    }
});

productRouter.delete("/delete-product/:id", [auth, checkAdmin], async (req, res) => {
    const id = req.params.id;
    try {
        await ProductModel.findByIdAndDelete({ _id: id });
        res.json({ status: 200, message: "Deleted The Product" });
    } catch {
        console.log("err :", err);
        res.send({ msg: err });
    }
});

module.exports = {
    productRouter,
};