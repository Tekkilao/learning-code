const router = require('express').Router();
const Post = require('../models/Post');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/search', (req, res) => {
    let { term } = req.query;
    term = term.toLocaleLowerCase();

    Post.findAll({where: {content: {[Op.like]: '%' + term + '%'} }})
    .then(post => res.render('posts', { post }))
    .catch(err => console.log(err));
})
 

module.exports = router