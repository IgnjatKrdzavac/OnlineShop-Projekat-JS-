'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Orders,Products,Users}) {
      // define association here
      this.belongsTo(Orders, {foreignKey: 'orderId', as: 'order'});
      this.belongsTo(Products, {foreignKey: 'productId', as: 'product'}); 
      this.belongsTo(Users, {foreignKey: 'userId', as: 'user'}); 
    }
  }
  OrderDetails.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'OrderDetails',
  });
  return OrderDetails;
};