const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const { sequelize } = require("./db");

// todo Add all validations and contraints wanted for these values
module.exports = {
  // Model for user Profiles
  Profile: sequelize.define(
    "Profile",
    {
      passHash: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [8],
        },
      }, 
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: Sequelize.STRING, 
        allowNull: false,
        unique: {
          args: true,
          msg: "Email address already in use!",
        },
        validate: {
          isEmail: true,
        },
      },
      avatar: Sequelize.STRING,
    },
    {
      //! options
      // force: true,
      updatedAt: false,
      timestamps: false,
      createdAt: false,
      hooks: {
        // bcrypt hashes the passHash
        beforeCreate: async function (profile) {
          const salt = await bcrypt.genSalt(8);
          try {
            profile.passHash = await bcrypt.hash(profile.passHash, salt);
          } catch (err) {
            console.log(err);
          }
        },
      },
    }
  ),

  // Model for creating an order
  Order: sequelize.define(
    "Order",
    {
      profileId:  {
  type: Sequelize.INTEGER,
  allowNull: false,
  validate: {
    notEmpty: true,
  },
},
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      zipcode:  {
  type: Sequelize.INTEGER,
  allowNull: false,
  validate: {
    notEmpty: true,
  },
},
      state: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      //! options
      // force: true,
      updatedAt: false,
      timestamps: false,
      createdAt: false,
    }
  ),

  // Model for tracking items in a profile's cart
  Profile_Product: sequelize.define(
    "Profile_Product",
    {
      profileId:  {
  type: Sequelize.INTEGER,
  allowNull: false,
  validate: {
    notEmpty: true,
  },
},
      productId:  {
  type: Sequelize.INTEGER,
  allowNull: false,
  validate: {
    notEmpty: true,
  },
},
      quantity:  {
  type: Sequelize.INTEGER,
  allowNull: false,
  validate: {
    notEmpty: true,
  },
},
    },
    {
      //! options
      // force: true,
      updatedAt: false,
      timestamps: false,
      createdAt: false,
    }
  ),

  // Model for tracking items in placed orders
  Order_Product: sequelize.define(
    "Order_Product",
    {
      orderId:  {
  type: Sequelize.INTEGER,
  allowNull: false,
  validate: {
    notEmpty: true,
  },
},
      productId:  {
  type: Sequelize.INTEGER,
  allowNull: false,
  validate: {
    notEmpty: true,
  },
},
      quantity:  {
  type: Sequelize.INTEGER,
  allowNull: false,
  validate: {
    notEmpty: true,
  },
},
    },
    {
      //! options
      // force: true,
      updatedAt: false,
      timestamps: false,
      createdAt: false,
    }
  ),

  // Model for creating products
  Product: sequelize.define(
    "Product",
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      genre: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      price: {
        type: Sequelize.DECIMAL, 
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      //! options
      // force: true,
      updatedAt: false,
      timestamps: false,
      createdAt: false,
    }
  ),
};
