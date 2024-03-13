const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js"); // importam modelul

const app = express();

// Conectare MongoDB si pornire server
mongoose
  .connect(
    "mongodb+srv://theo:theopasssword@backendcrud.menkt58.mongodb.net/?retryWrites=true&w=majority&appName=BackendCRUD"
  )
  .then(() => {
    console.log("Connected to MongoDB");

    //Starting and hosting the server
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => console.log("Connection Failed!"));

// Middleware (functia .use) pentru a transforma mesajul in => JSON
app.use(express.json());

// GET => Pentru a trimite raspuns catre Client
app.get("/", (req, res) => {
  res.send("Hello from Node");
});

// POST => pentru a trimite date catre Server => dupa pentru a adauga in DB // POST === Creare

// Functia de adaugare in server este asincrona => se asteapta dupa date => async/await/try-catch block
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET => pentru a creea un API ce trimite toate datele de la DB la Client //GET === Afisare
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET for dynamic url => pentru a obtine date pentru un anume produs
// NOTA: Cand se va accesa url-ul: "/api/products/e4j322je3jd95j"(exemplu) se va face call automat la url-ul nostu "/:id"
// NOTA: GET nu are body! => datele se transmit prin parametrii url-ului (query parameters) => req.params
app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product => PUT
app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete Method
app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.status(200).json({ message: "Product was deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
