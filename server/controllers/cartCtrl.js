const chalk = require("chalk");
const { Product, Profile } = require("../models");
const models = require("../models");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../db");
//? middle ware checking session for security from random post requests //? npm i express sessions (or something): cookie for the backend that creates a session so the user can't see it
module.exports = {
  // Endpoint that gets all products in cart
  getCart: async(req, res) => {
    const { profileId } = req.params;
    let cartNumbers
    try {
      const cart = await models.Profile_Product.findAll({
        where: { profileId },
        order: [
          ['productId', 'ASC'], // Sorts by product Id, this works for now
      ],
      });
      
      cartNumbers = cart.map((product) => {
        let productObj = {}
        productObj.productId = product.dataValues.productId
        productObj.quantity = product.dataValues.quantity
        return productObj
      }) 
    } catch (err) {res.status(400).send('something went wrong')}

      try {
        const completeCart = await Promise.all(cartNumbers.map(async (element) => {
          const {productId: id} = element
          let productInfo = ''
          productInfo = await models.Product.findOne({
            where: {id}
          
          })
          element.name = productInfo.name
          element.price = productInfo.price
          element.image = productInfo.image
          return element
        }))
        res.status(200).send(completeCart)
        } catch (err) {
          res.status(400).send("bad")
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
    if (!profileId || !productId || !quantity) {
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
    const { id, productId } = req.query;
    console.log(id, productId)
    try {
      await models.Profile_Product.destroy({
        where: {
          profileId: id,
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
  getProductsInCart: async(req, res) => {
    const { profileId } = req.params
    try {
      const cart = await sequelize.query(`select "productId" from "Order" where "profileId" = ${profileId}`)
      res.status(200).send(cart);

    } catch (err) {
      res.status(400).send('failure')
    }
  }
};
