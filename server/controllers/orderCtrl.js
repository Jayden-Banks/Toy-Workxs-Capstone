const { sequelize } = require("../db");
const models = require("../models");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

module.exports = {
  // Endpoint Order posts a new order with profileId, address, payment.
  createOrder: async (req, res) => {
    const { profileId, address, payment } = req.body;
    try {
      const order = {
        profileId,
        address,
        payment,
      };
      const post = await models.Order.create(order);
      res.status(200).send(post);
    } catch (err) {
      console.log(err);
      res.status(500).send("Failed to create order");
    }
  },
  // Endpoint creates a post that adds current cart with orderId to Order_Product
  createOrderProduct: async (req, res) => {
    const { cart, orderId } = req.body;
    try {
      cart.forEach(async (element) => {
        const body = {
          orderId,
          productId: element,
        };
        try {
          await models.Order_Product.create(body);
        } catch (err) {
          console.log(err);
          res.status(400).send(err);
        }
      });
      res.status(200).send("Success!");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  getOrders: async (req, res) => {
    const userId = +req.params.id;
    try {
      const orders = await sequelize.query(
        `select id, address, payment from "Order" where "profileId" = ${userId}`
      );
      res.status(200).send(orders);
    } catch (err) {
      console.log(err);
      res.status(400).send("failed");
    }
  },
  // Stripe Checkout Session endpoint
  createCheckoutSession: async (req, res) => {
    let { total } = req.body;
    total = Math.round(total * 100) / 100;
    total *= 100;
    total = Math.round(total);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  },
};
