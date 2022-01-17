'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Orders}) {
      // define association here
      this.hasMany(Orders, { foreignKey: 'userId', as: 'orders', onDelete: 'cascade', hooks: true });
    }
  }
  Users.init({
    email: {
      type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};