'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('book', 'cover_book', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('book', 'pdf_file', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('book', 'cover_book'),
      queryInterface.removeColumn('book', 'pdf_file'),
    ]);  }
};
