const Sequelize = require('sequelize');
const db = require('../db/db');

const Post = db.define('post', {
    author: {
        type: Sequelize.STRING
    },
    user_id: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    },
})
module.exports = Post