const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
app.use(express.json());

// Model
const Product = require('./models/productModel');

// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/save", (req, res) => {
  res.send("save Page");
});

// Create New Product
app.post("/product", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
});

// Fetch All Products
app.get("/product", async (req, res) => {
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
});

app.listen(3000, () => {
  console.log("Server Running In Port 3000");
});

mongoose
  .connect(
    "mongodb+srv://Heshan655:6uVyUM7q9nIBO2OC@devetaminapi.62egjtv.mongodb.net/Node-API?retryWrites=true&w=majority&appName=DevetaminAPI"
  )
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
