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
};
