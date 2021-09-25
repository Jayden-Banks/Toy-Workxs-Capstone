require("dotenv").config();
const express = require("express");
const ctrl = require("./controller");
const app = express();
const PORT = process.env.PORT || 3001;
require("./db");

app.use(express.json());
// app.use(express.static(__dirname + '' )) //? I don't understand this part... give path index.js

// Endpoints
app.post("/api/profile", ctrl.createProfile);
app.get("/api/profile/", ctrl.getProfile);
app.get("/api/boardgames/", ctrl.getBoardGames)
app.get("/api/cart/:profileId", ctrl.getCart)
app.post("/api/cart", ctrl.addToCart)
app.put("/api/cart", ctrl.updateQuantityCart)
app.delete("/api/cart", ctrl.deleteProductCart)
app.delete("/api/cart/clear/:profileId", ctrl.clearCart)
app.post("/api/order", ctrl.createOrder)
app.post("/api/order-product", ctrl.createOrderProduct)

// listen
app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});
