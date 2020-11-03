const Sequelize = require('sequelize');
const sequelize = require('../../../config/db/mysql');

module.exports = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: Sequelize.STRING(100),
    email: Sequelize.STRING(100),
    password: Sequelize.STRING(255),
});