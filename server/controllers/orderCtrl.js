const { QueryTypes } = require("sequelize");
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
      console.log(order, "order here");
      const post = await models.Order.create(order);
      res.status(200).send(post);
    } catch (err) {
      console.log(err, "err");
      res.status(500).send("Failed to create order");
    }
  },
  // Endpoint creates a post that adds current cart with orderId to Order_Product
  createOrderProduct: async (req, res) => {
    console.log(req.body);
    const { cart, orderId } = req.body;
    try {
      cart.forEach(async (element) => {
        const body = {
          orderId,
          productId: element,
        };
        try {
          console.log(body)
          const res = await models.Order_Product.create(body);
          console.log(res, 'res')
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
    //   cart.map(async (element) => {
    //     element.orderId = orderId;
    //     try {
    //       await models.Order_Product.create(element);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   });
    //   res.status(200).send("Success");
    // } catch (err) {
    //   res.status(500).send(err);
    // }
  },
  getOrders: async (req, res) => {
    const userId = +req.params.id
    console.log(userId)
    console.log(typeof(userId))
    try {
      // const orders = await models.Order.findAll({
      //   where: {profileId: userId }
      // })
      // console.log(orders)
      const orders = await sequelize.query(`select id, address, payment from "Order" where "profileId" = ${userId}`)
      res.status(200).send(orders)
      // console.log(orders)
      // const test = await sequelize.query(`Select * from "Order_Product" where "orderId" = ${userId}`, {type: QueryTypes.SELECT })
      // console.log(test)



    } catch (err) {
      console.log(err)
      res.status(400).send("failed")
    }
    
  },
  // Stripe Checkout Session endpoint
  createCheckoutSession: async (req, res) => {
    let { total } = req.body;
    console.log(("total", total));
    total = Math.round(total * 100) / 100;
    console.log(total, "rounded");
    total *= 100;
    console.log(total, "price increased");

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  },
};
