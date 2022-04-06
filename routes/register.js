const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {registerValidation} = require('../validation/validation')

router.get('/',  (req, res) => {
    let userCookie = req.session.user
   
    if (!userCookie) {
    res.render('register')
    }
    else {
        res.redirect('dashboard')
    }
});

router.post('/', async (req, res) => {
    let {name, email, password, password2} = req.body;

    const {error} = registerValidation(req.body);
    let errors = [];
    if (error) {
        errors.push({text: error.details[0].message});
    };

    const emailExist = await User.findOne({where: {email: email}});
    if (emailExist) {
        errors.push({text: 'This email already exists'});
    };
    if(password != password2) {
        errors.push({text: "The passwords doesn't match"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,            
        })

    } else {

    await User.create({
        name: name,
        email: email,
        password: hashedPassword,
    })
    .then(() => {
        res.redirect('/')
    }).catch(err => console.log(err));

    }

})

module.exports = router;