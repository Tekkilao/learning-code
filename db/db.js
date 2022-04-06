const Sequelize = require('sequelize');

const sequelize = new Sequelize('loginSite', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize