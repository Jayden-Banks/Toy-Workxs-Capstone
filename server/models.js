const bcrypt = require("bcryptjs")
const Sequelize = require("sequelize");
const { sequelize } = require("./db");

// todo Add all validations and contraints wanted for these values
// todo Learn to hash the password

module.exports = {
  // Model for user Profiles
  Profile: sequelize.define("Profile", {
    passHash: {
      type: Sequelize.STRING,
      // allowNull: false,
      // validate: {
      //   len: [8],
      // },
    }, //todo add hash before, add not null, add password constraints and validations
    firstName: Sequelize.STRING, //todo add not null constraint
    lastName: Sequelize.STRING, //todo add not null constraint
    email: {
      type: Sequelize.STRING, //todo add not null constraint
      unique: {
        args: true,
        msg: "Email address already in use!",
      },
      validate: {
        isEmail: true,
      },
      
    },
    avatar: Sequelize.STRING, //todo add default null constraint
  },
  {
    //! options 
    updatedAt: false,
    timestamps: false,
    createdAt: false,
    hooks: {
      // bcrypt hashes the passHash
      beforeCreate: async function(profile) {
        const salt = await bcrypt.genSalt(8)
        console.log(salt)
        try {
          profile.passHash = await bcrypt.hash(profile.passHash, salt);
        } catch (err) {console.log(err)}
      },
    },
    //? Does not work...
    // instanceMethods: {
    //   validPassword: async function(password) {
    //     return await bcrypt.compare(password, this.passHash)
    //   }
    // }
  }),

  // Model for creating an order
  Order: sequelize.define("Order", {
    profileId: Sequelize.INTEGER, //todo Foreign key added //todo add not null constraint
    firstName: Sequelize.STRING, //todo add not null constraint
    lastName: Sequelize.STRING, //todo add not null constraint
    address: Sequelize.STRING, //todo add not null constraint
    zipcode: Sequelize.INTEGER, //todo add 5 digit limit
    state: Sequelize.STRING, //todo add 2 character limit
  }),

  // Model for tracking items in a profile's cart
  Profile_Product: sequelize.define("Profile_Product", {
    profileId: Sequelize.INTEGER, //todo Foreign key added //not nuul constraint
    productId: Sequelize.INTEGER, //todo Foreign key added //not nuul constraint
    quantity: Sequelize.INTEGER, //todo default set to 1 (once set, remove from controller)
  }),

  // Model for tracking items in placed orders
  Order_Product: sequelize.define("Order_Product", {
    orderId: Sequelize.INTEGER, //todo Foreign key added //not nuul constraint
    productId: Sequelize.INTEGER, //todo Foreign key added //not nuul constraint
    quantity: Sequelize.INTEGER,
  }),

  Product: sequelize.define("Product", {
    name: Sequelize.STRING,
    genre: Sequelize.STRING,
    price: Sequelize.DECIMAL,
  })

};
