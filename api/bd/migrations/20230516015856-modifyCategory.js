'use strict';

/** @type {import('sequelize-cli').Migration} */

const {CATEGORY_TABLE, CategorySchema}= require('./../models/category.model');

module.exports = {
  async up (queryInterface) {
    const categoryTable = await queryInterface.describeTable(CATEGORY_TABLE);
    if(!categoryTable.image) {
      await queryInterface.addColumn(CATEGORY_TABLE, 'image', CategorySchema.image);
    }

  },

  async down (queryInterface) {
    await queryInterface.removeColumn(CATEGORY_TABLE, 'image');
  }
};
