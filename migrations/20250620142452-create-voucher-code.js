'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VoucherCodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING,
        unique: true
      },
      customerId: {
        type: Sequelize.INTEGER
      },
      specialOfferId: {
        type: Sequelize.INTEGER
      },
      expirationDate: {
        type: Sequelize.DATE
      },
      oneTimeUsage: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
      },
      usageDate: {
        type: Sequelize.DATE,
        allowNull: true,
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
    await queryInterface.dropTable('voucher_codes');
  }
};