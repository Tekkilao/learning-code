const router = require('express').Router();
const User = require('../models/User');
const verifyToken = require('../validation/verifyToken');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const {makePost} = require('../validation/validation')

router.get('/add', verifyToken, (req, res) => res.render('makePost'));

router.get('/', verifyToken, async (req, res) => {
    Post.findAll()
    .then(post => {
        res.render('posts', {
            post
        })
    }).catch(err => console.log(err))
});

router.post('/add', verifyToken, async (req, res) => {
    let userCookie = req.session.user
    let token = jwt.decode(userCookie);
    let id = token.id;
    const user = await User.findOne({where: {id: id} });

    let {title, content} = req.body

    const {error} = makePost(req.body);
    let errors = [];
    if (error) {
        errors.push({text: error.details[0].message});
    };

    if (errors.length > 0 ) {
        res.render('makePost', {
            errors,
            title, 
            content,
        })
    } else {
        await Post.create({
            author: user.name,
            title: title,
            content: content, 
            user_id: user.id,
        })
        .then(() => {
            res.redirect('/posts')
        }).catch(err => console.log(err));
    }
    




})

module.exports = router;