const models = require("../models");
const bcrypt = require("bcryptjs");

module.exports = {
  // creates a profile and posts it to the data base
  createProfile: async (req, res) => {
    try {
      const { firstName, lastName, email, passHash } = req.body;
      const profile = {
        passHash,
        firstName,
        lastName,
        email,
        avatar: null,
      };
      const post = await models.Profile.create(profile);
      delete post.dataValues.passHash
      res.status(200).send(post);
    } catch (err) {
      res.status(400).send(err.errors[0].message);
    }
  },
  // Gets a profile from database using email, added bcrypt check on passHash and check along with email
  getProfile: async (req, res) => {
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

  updateAvatar: async (req, res) => {
    const {avatar, profileId} = req.body
    console.log(avatar, profileId)
    try {
      await models.Profile.update(
        {avatar: avatar},
        {
          where: {
            id: profileId,
          },
        }
      );
      console.log("GOT HERE")
      const profile = await models.Profile.findOne(
        {
          where: {
            id: profileId
          }
        }
      )
      console.log("GOT HERE TOO")
    res.status(200).send(profile)
    } catch (err) {
      console.log(err)
      res.status(400).send(err)
    }
  }


};
