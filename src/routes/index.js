const express = require('express');

const router = express.Router();

const passport = require('passport');

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
    passReqToCallback: true  // Se refiere a que aunque las constraseñas no hagan match se encripte la contrasela y se devuelva encriptada
})
);

router.get('/signin',(req,res,next)=>{
 res.render('signin')
});

router.post('/signin', passport.authenticate('local-signin',{
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true  // Se refiere a que aunque las constraseñas no hagan match se encripte la contrasela y se devuelva encriptada
}));

router.get('/logout',(req,res,next)=>{
    req.logOut(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
    //res.redirect('/');
});

router.get('/profile', isAuthenticated ,(req,res,next)=>{
    res.render('profile');
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