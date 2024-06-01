const Sequelize = require("sequelize");

const sequelize = require("../util/database");

// Cart should be different for different user but cart
const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Cart;
