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
app.use(express.static(path.resolve(__dirname, '../build')))
// For Deployment / Testing
// "proxy": "http://localhost:3001/", package
// "main": "./server/index.js",
// "start": "node ./server/index.js && npm build",
// "start": "react-scripts start",


// Endpoints
// Profile endpoints
app.post("/api/profile", profileCtrl.createProfile);
app.get("/api/profile/", profileCtrl.getProfile);
app.put("/api/avatar", profileCtrl.updateAvatar)

// Product endpoints
app.get("/api/boardgames/", productCtrl.getBoardGames)
app.get("/api/plushies/", productCtrl.getPlushies)
app.get("/api/candy/", productCtrl.getToys)

// Cart endpoints
app.get("/api/cart/:profileId", cartCtrl.getCart)
app.get("/api/cart/products/:profileId", cartCtrl.getProductsInCart)
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

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

// listen
app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});
