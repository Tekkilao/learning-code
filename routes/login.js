const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {loginValidation} = require('../validation/validation');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    let userCookie = req.session.user
   
    if (!userCookie) {
    res.render('login')
    }
    else {
        res.redirect('dashboard')
    }
});

router.post('/', async (req, res) => {
    let {email, password} = req.body;
    const {error} = loginValidation(req.body);
    let errors = []

    if (error) {
        errors.push({text: error.details[0].message});
    };

    const user = await User.findOne({where: {email: email} });
    
    if (!user) {
        errors.push({text: "This email doesn't exist"})
        return res.render('login', {
            errors, 
            email
        })
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        errors.push({text: "Invalid password"})
    };
    if (errors.length > 0 ) {
         res.render('login', {
        errors, 
        email
    })
    } else {
    
    const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET);
    req.session.user = token;
        res.redirect('/dashboard')
       
    }

})

module.exports = router;
