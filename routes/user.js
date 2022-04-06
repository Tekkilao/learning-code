const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../validation/verifyToken');
const User = require('../models/User');
const bcrypt = require('bcryptjs/dist/bcrypt');

router.get('/', verifyToken, (req, res) => {res.render('userPanel')});

router.post('/', verifyToken, async (req, res) => {
    const userCookie = req.session.user;
    let token = jwt.decode(userCookie);
    let id = token.id;
    const user = await User.findOne({where: {id: id} });
    let errors = [];

    let {name, password, password2, password3} = req.body;

    if (name.trim().length > 0) {
        user.update({name: name});
        await user.save()
    }
    if (password.length > 0 ){
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword ) {
        errors.push({text: 'Wrong Password'})
        res.render('userPanel', {
            errors,
        })
    } else {
    const hashedNewPassword = await bcrypt.hash(password2, 10);
    const newPassword = await bcrypt.compare(password3, hashedNewPassword);

    if (!newPassword) {
        errors.push({text: "The new password doesn't match"})
    }

    if (errors.length > 0) {
        res.render('userPanel', {
        errors
        })
    } else {
        user.update({password: hashedNewPassword})
        user.save()
        res.redirect('/dashboard')
    } }
} else {
    res.render('userPanel')
}
    
})


module.exports = router;