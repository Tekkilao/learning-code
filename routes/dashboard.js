const router = require('express').Router();
const User = require('../models/User');
const verifyToken = require('../validation/verifyToken');
const jwt = require('jsonwebtoken');


router.get('/', verifyToken, async (req, res) => {
    let userCookie = req.session.user

    let token = jwt.decode(userCookie);
    let id = token.id;
    const user = await User.findOne({where: {id: id} });

    const name = user.name
    const data = {name: name}
    


    res.render('dashboard', data)

})

router.get('/logout', verifyToken, async (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    })
    
})


module.exports = router