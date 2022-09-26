const express = require('express');

const router = express.Router();

const passport = require('passport');

router.get('/',(req,res,next)=>{
 res.render('index'); 
});

router.get('/signup',(req,res,next)=>{
 res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true  // Se refiere a que aunque las constraseñas no hagan match se encripte la contrasela y se devuelva encriptada
})
// (req,res,next)=>{
//  console.log(req.body); // Imprimiendo en consola de servidor lo que se envió en el formulario (como objeto)
//  res.send('recibido'); // Lo que se renderiza en la vista

// }
);

router.get('/signin',(req,res,next)=>{
 res.render('signin')
});

router.post('/signin', passport.authenticate('local-signin',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true  // Se refiere a que aunque las constraseñas no hagan match se encripte la contrasela y se devuelva encriptada
}));

router.get('/logout',(req,res,next)=>{
    req.logOut();
    res.redirect('/');
})

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    //else{
        res.redirect('/')
    //}
}

router.get('/profile', isAuthenticated ,(req,res,next)=>{
    res.render('profile');
});

module.exports = router