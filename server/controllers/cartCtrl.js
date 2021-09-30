const models = require("../models");
//? middle ware checking session for security from random post requests //? npm i express sessions (or something): cookie for the backend that creates a session so the user can't see it
module.exports = {
  // Endpoint that gets all products in cart
  getCart: async (req, res) => {
    const { profileId } = req.params;
    try {
      const cart = await models.Profile_Product.findAll({
        where: { profileId },
      });
      res.status(200).send(cart);
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  },
  // Endpoint Adds product to cart
  addToCart: async (req, res) => {
    const { profileId, productId } = req.body;
    try {
      const product = {
        profileId,
        productId,
        quantity: 1,
      };
      await models.Profile_Product.create(product);
      res.status(200).send("Successfully added product to cart");
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  },
  // Endpoint Cart put that updates product quantity in cart
  updateQuantityCart: async (req, res) => {
    const { profileId, productId, quantity } = req.body;
    if (!profileId || !profileId || !quantity) {
      res.status(400).send("Missing required field")
    }
    try {
      await models.Profile_Product.update(
        { quantity: quantity },
        {
          where: {
            profileId,
            productId,
          },
        }
      );
      res.status(200).send("Successfully updated quantity");
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  },
  // Endpoint Cart delete that adds deletes a Product from cart
  deleteProductCart: async (req, res) => {
    const { profileId, productId } = req.query;
    try {
      await models.Profile_Product.destroy({
        where: {
          profileId,
          productId,
        },
      });
      res.status(200).send("Product removed from cart");
    } catch (err) {
      res.status(404).send(err);
    }
  },
  // Endpoint resets the user's cart. Happens after order complete.
  clearCart: async (req, res) => {
    const { profileId } = req.params;
    try {
      await models.Profile_Product.destroy({
        where: {
          profileId,
        },
      });
      res.status(200).send("Deleted entire cart");
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
