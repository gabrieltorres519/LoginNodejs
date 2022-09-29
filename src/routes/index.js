const express = require('express');

const router = express.Router();

const passport = require('passport');

const users = require('../models/user');

router.get('/',(req,res,next)=>{
 res.render('index'); 
});

router.get('/signup',(req,res,next)=>{
 res.render('signup');
});

router.post('/signup',
    passport.authenticate('local-signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true  // Se refiere a que se pasa el req.body al backend, a localauth para poder agregar campos al registro/login
})
);

router.get('/signin',(req,res,next)=>{
 res.render('signin')
});

router.post('/signin', passport.authenticate('local-signin',{
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true  // Se refiere a que se pasa el req.body al backend, a localauth para poder agregar campos al registro/login
}));

router.get('/logout',(req,res,next)=>{
    req.logOut(function(err) {
        if (err) { return next(err); }
    });
    //req.session.destroy();
    res.redirect('/signin');

    //res.redirect('/');
});

router.get('/profile', isAuthenticated , async (req,res,next)=>{

    //console.log(req.body.email);

    const theUser = await users.findOne(req.body.email)

    console.log(`Usuario en sesión\n ${theUser}`);

    console.log(theUser.email);
    
    const allUsers = await users.find();

    console.log(`Todos los usuarios\n ${allUsers}`);

    res.render('profile',{
        'usuario': theUser
    });
});

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    //else{
    res.redirect('/')
    //}
}

module.exports = router