const models = require("../models");
const bcrypt = require("bcryptjs");
const chalk = require("chalk");

module.exports = {
  // creates a profile and posts it to the data base
  createProfile: async (req, res) => {
    try {
      const { firstName, lastName, email, passHash } = req.body;
      // if (!firstName || !lastName || !email || !passHash) {
      //   res.status(400).send("Rejected profile, invalid info");
      // }
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
  getProfile: async (req, res) => {
    console.log(chalk.red("you got here at least"))
    let reject = "";
    const { email, password } = req.query;
    const profile = await models.Profile.findOne({
      where: { email },
    })
      .then(async function (user) {
        if (!user) {
          reject = "user";
          return null;
        } else if (await bcrypt.compare(password, user.passHash)) {
          reject = "none";
          return user;
        } else {
          reject = "password";
          return null;
        }
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
    switch (reject) {
      case "none":
        delete profile.dataValues.passHash
        delete profile.dataValues.id
        console.log(profile)
        res.status(200).send(profile);
        break;
      case "user":
        res.status(400).send("User not found");
        break;
      case "password":
        res.status(400).send("Incorrect password");
        break;
      default:
        res.status(500).send("Server issue");
        break;
    }
  },
};
