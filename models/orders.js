'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users,OrderDetails}) {
      // define association here
      this.belongsTo(Users, {foreignKey: 'userId', as: 'user'});
      this.hasMany(OrderDetails, { foreignKey: 'orderId', as: 'orderdetails', onDelete: 'cascade', hooks: true });
    }
  }
  Orders.init({
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    shipName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    shipAdress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};