'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Informations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users}) {
      // define association here
      this.belongsTo(Users, {foreignKey: 'userId', as: 'user'});
    }
  }
  Informations.init({
    aboutUs: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deliveryPriceList: {
      type: DataTypes.STRING,
      allowNull: false
    },
    privacyProtection: {
      type: DataTypes.STRING,
      allowNull: false
    },
    methodOfPayment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    termsOfPurchase: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Informations',
  });
  return Informations;
};