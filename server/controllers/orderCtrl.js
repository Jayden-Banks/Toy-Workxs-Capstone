const models = require("../models");

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
      res.status(500).send("Failed to create order");
    }
  },
  // Endpoint creates a post that adds current cart with orderId to Order_Product
  createOrderProduct: async (req, res) => {
    const { cart, orderId } = req.body;
    try {
      cart.map(async (element) => {
        element.orderId = orderId;
        try {
          await models.Order_Product.create(element);
        } catch (err) {
          console.log(err);
        }
      });
      res.status(200).send("Success");
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
