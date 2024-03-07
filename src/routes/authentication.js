const express = require('express');
const passport = require('passport');
const router = express.Router();
//require('../lib/passport');


router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

//router.post('/signup', (req, res) => {
    //passport.authenticate('local.signup', {
        //successRedirect: '/profile',
        //failureRedirect: '/signup',
        //failureFlash: true
   // });
   // res.send('received');
//});

// el metodo de arriba se reemplaza con el nuevo metodo de abajo

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}))

router.get('/profile', (req, res) => {
    res.send('este es tu perfil')
});

module.exports = router;