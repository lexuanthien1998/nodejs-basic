const Sequelize = require('sequelize');
const sequelize = require('../../../config/db/mysql');

Post = sequelize.define('posts', {
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING(500),
    description: Sequelize.STRING(1000),
    content: Sequelize.STRING(10000),
    image: Sequelize.STRING(500),
    author: Sequelize.STRING(100),
},{
    tableName: 'posts'
});

// Post === sequelize.models.Post;
module.exports = Post;