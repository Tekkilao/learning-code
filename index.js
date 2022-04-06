const express = require('express');
const db = require('./db/db');
const app = express()
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars')
const session = require('express-session')


require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));

//session
app.use(session({
    secret: 'jamesearljones',
    resave: false,
    saveUninitialized: false,
}));


app.use('/', require('./routes/index'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/user/config', require('./routes/user'));
app.use('/posts', require('./routes/post'));
async function authentication() {
    try {
        await db.authenticate();
        console.log('You have been successfully connected to the database.')
    } catch (error) {
        console.log('Unable to connect to the database', error)
    }
};


authentication()
app.listen(PORT, () => {
        const date = new Date()
        console.log(`Server Started on port ${PORT} at ${date}`);
})