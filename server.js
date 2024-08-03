const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require('cors'); // Import the CORS middleware
app.use(cors());
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

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

// Model
const Product = require("./models/productModel");

// routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
    res.status(500).json({ message: error.message });
  }
});

// Fetch All Products
app.get("/product", async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Fetch Product By ID
app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Update Product
app.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      // Product Not Update
      return res
        .status(404)
        .json({ message: `cannot find any product with this ID ${id} ` });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete Product 
app.delete("/product/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);
  
      if (!product) {
        // Product Not Update
        return res
          .status(404)
          .json({ message: `cannot find any product with this ID ${id} ` });
      }
  
      res.status(200).json(product);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

