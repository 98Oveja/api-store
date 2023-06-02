'use strict';

/** @type {import('sequelize-cli').Migration} */

const {CUSTOMER_TABLE} = require('./../models/customer.model');
const {ORDER_TABLE} = require('./../models/order.model');
const {DataTypes, Sequelize} = require('sequelize');

const {ProductSchema, PRODUCT_TABLE} = require('./../models/product.model');
const {ORDER_PRODUCT_TABLE, OrderProductSchema} = require('./../models/order-product.model');



module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ORDER_TABLE, {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      customerId:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'customer_id',
        references:{
          model: CUSTOMER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createAt:{
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};
