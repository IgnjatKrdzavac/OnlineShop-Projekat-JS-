'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Informations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      aboutUs: {
        type: Sequelize.STRING,
        allowNull: false
      },
      deliveryPriceList: {
        type: Sequelize.STRING,
        allowNull: false
      },
      privacyProtection: {
        type: Sequelize.STRING,
        allowNull: false
      },
      methodOfPayment: {
        type: Sequelize.STRING,
        allowNull: false
      },
      termsOfPurchase: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Informations');
  }
};