'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('superSecretPassword1234#=>', 10);
    return queryInterface.bulkInsert('Users', [
      {
        email: 'manufacturer@safebeautyledger.com',
        password: hashedPassword,
        name: 'Jane Doe',
        role: 'Manufacturer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'regulator@safebeautyledger.com',
        password: hashedPassword,
        name: 'Jane Smith',
        role: 'Regulator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'retailer@example.com',
        password: hashedPassword,
        name: 'Jane West',
        role: 'Retailer',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
