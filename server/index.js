require("dotenv").config();
const express = require("express");
const cartCtrl = require("./controllers/cartCtrl")
const orderCtrl = require("./controllers/orderCtrl")
const productCtrl = require("./controllers/productCtrl")
const profileCtrl = require("./controllers/profileCtrl")
const cors = require('cors')
const path = require('path')

const app = express();
const PORT = process.env.PORT || 3001;
require("./db");

app.use(express.json());
app.use(cors())
// app.use(express.static(__dirname + '' )) //? I don't understand this part... give path index.js
app.use(express.static(path.resolve(__dirname, '../client/build')))

// Endpoints
// Profile endpoints
app.post("/api/profile", profileCtrl.createProfile);
app.get("/api/profile/", profileCtrl.getProfile);

// Product endpoints
app.get("/api/boardgames/", productCtrl.getBoardGames)

// Cart endpoints
app.get("/api/cart/:profileId", cartCtrl.getCart)
app.post("/api/cart", cartCtrl.addToCart)
app.put("/api/cart", cartCtrl.updateQuantityCart)
app.delete("/api/cart/", cartCtrl.deleteProductCart)
app.delete("/api/cart/clear/:profileId", cartCtrl.clearCart)

// Order endpoints
app.post("/api/order", orderCtrl.createOrder)
app.post("/api/order-product", orderCtrl.createOrderProduct)
app.get("/api/order/:id", orderCtrl.getOrders)

// Stripe
app.post('/create-payment-intent', orderCtrl.createCheckoutSession)

// listen
app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});
