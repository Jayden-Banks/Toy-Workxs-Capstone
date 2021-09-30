const Sequelize = require("sequelize");
// Connection
const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
  dialect: "postgres",
  define: {
    freezeTableName: true,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
sequelize
  .sync({
    logging: false, // turned off so it would stop blowing up my terminal, console.log()
  })
  .then(() => {
    console.log("Connection to database established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  })

module.exports = {
  sequelize: sequelize
}