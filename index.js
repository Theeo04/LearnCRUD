const express = require('express');
const mongoose = require('mongoose');
const Product = require("./models/product.model.js"); // importam modelul

const app = express();

// Middleware (functia .use) pentru a transforma mesajul in => JSON
app.use(express.json());

// GET => Pentru a trimite raspuns catre Client
app.get('/', (req, res) => {
    res.send("Hello from Node");
});



// POST => pentru a trimite date catre Server
app.post('/api/products', (req, res) => {
    try{

    }catch(error){
        res.status(500).json({message: error.message});
    }
})



// theo theopasssword
mongoose.connect("mongodb+srv://theo:theopasssword@backendcrud.menkt58.mongodb.net/?retryWrites=true&w=majority&appName=BackendCRUD")
.then(() => {
    console.log("Connected to MongoDB")
    
    //Starting and hosting the server
    app.listen(3000, () =>{
    console.log("Server is running on port 3000");
});
})
.catch(() => console.log("Connection Failed!"));