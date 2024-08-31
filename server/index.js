const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const connection = require('./config/db');
const { productRouter } = require('./routes/product.route');
const userRouter = require('./routes/user.route');
const { cartRouter } = require('./routes/cart.route');
const cors = require('cors');


app.use(express.json());
const corsOptions = {
    origin: '*', // Replace with your frontend's origin
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies and authentication headers
};

app.use(cors(corsOptions))


app.get('/', (req, res) => {
    return res.status(200).send("Server is running fine")
});

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);

app.listen(PORT, async () => {
    try {
        await connection;
        console.log(`Server is running at ${PORT} & Database connected successfully`);
    } catch (err) {
        console.log("Trouble connecting to the DB");
        console.log(err);
    }
    console.log(`Running at ${PORT} Port`);
});