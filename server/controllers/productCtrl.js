const chalk = require("chalk");
const Sequelize = require("sequelize")
const models = require("../models");
module.exports = {
  // Gets all board games from db based off of name or genre (doesn't accept price)
  getBoardGames: async (req, res) => {
    const { name, genre } = req.query;
    let selection = {};
    if (name && genre) {
      selection = { name, genre };
    } else if (name) {
      selection = { name };
    } else if (genre) {
      selection = { genre };
    } else {
      selection = "all";
    }
    try {
      if (selection === "all") {
        const boardGames = await models.Product.findAll({});
        console.log(boardGames)
        res.status(200).send(boardGames);
      } else {
        const boardGames = await models.Product.findAll({
          where: {name: {
            [Sequelize.Op.iLike] : name + '%'
          }}
        });
        res.status(200).send(boardGames);
      }
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  },
};
