const models = require("./models");
const chalk = require("chalk");
const bcrypt = require("bcryptjs");

module.exports = {
  // creates a profile and posts it to the data base
  createProfile: async (req, res) => {
    try {
      const { firstName, lastName, email, passHash } = req.body;
      console.log(firstName, lastName, email, chalk.red("here"));
      if (!firstName || !lastName || !email || !passHash) {
        res.status(400).send("Rejected profile, invalid info");
      }
      const profile = {
        passHash,
        firstName,
        lastName,
        email,
        avatar: null,
      };
      const post = await models.Profile.create(profile);
      res.status(200).send(post);
    } catch (err) {
      res.status(400).send(err.errors[0].message);
    }
  },
  // Gets a profile from database using email, added bcrypt check on passHash and check along with email
  // todo clean this up and try to only use try/catch and 3 res.status (no email, wrong password, server error)
  getProfile: async (req, res) => {
    const { email, password } = req.query;
    console.log(email, password);
    const profile = await models.Profile.findOne({
      where: { email },
    })
      .then(async function (account) {
        console.log(account)
        if (!account) {
          console.log(chalk.red("whoops"))
          res.status(400).send("No user found")
        }
        else if (await bcrypt.compare(password, account.passHash)) {
          return account;
        }
        res.status(400).send("Incorrect password");
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).send(err)
      });
      console.log(profile)
      profile
      ? res.status(200).send(profile)
      : res.status(404).send("User not Found");
  },
  // Gets all board games from db based off of name or genre (doesn't accept price)
  getBoardGames: async (req, res) => {
    const { name, genre } = req.query;
    let selection = {};
    if (name && genre) {
      selection = { name, genre };
    } else if (name) {
      selection = { name };
    } else {
      selection = { genre };
    }
    try {
      const boardgames = await models.Product.findAll({
        where: selection,
      });
      res.status(200).send(boardgames);
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  },
  // Endpoint Cart get that gets all products in cart
  getCart: async (req, res) => {
    const { profileId } = req.params;
    console.log(chalk.red(profileId));
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

  // Endpoint Cart post that adds product to cart
  addToCart: async (req, res) => {
    const { profileId, productId } = req.body;
    try {
      const product = {
        profileId,
        productId,
        quantity: 1,
      };
      const cart = await models.Profile_Product.create(product);
      res.status(200).send("Successfully added product to cart");
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  },
  // Endpoint Cart put that updates product quantity in cart
  updateQuantityCart: async (req, res) => {
    const { profileId, productId, quantity } = req.body;
    try {
      const cart = await models.Profile_Product.update(
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
    console.log(chalk.red(productId, profileId));
    try {
      const cart = await models.Profile_Product.destroy({
        where: {
          profileId,
          productId,
        },
      });
      res.status(200).send("Product removed from cart");
    } catch (err) {
      res.status(404).send("gob");
    }
  },
  // Endpoint resets the user's cart. Happens after order complete.
  clearCart: async (req, res) => {
    const { profileId } = req.params;
    try {
      const cart = await models.Profile_Product.destroy({
        where: {
          profileId,
        },
      });
      res.status(200).send("Deleted entire cart");
    } catch (err) {
      res.status(500).send(err);
    }
  },

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
    console.log(chalk.red(cart, orderId));
    try {
      const products = cart.map(async (element) => {
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
