const express = require('express');

const router = express.Router();

router.get('/',(req,res,next)=>{
 res.render('index'); 
});

router.get('/signup',(req,res,next)=>{
 res.render('signup');
});

router.post('/signup',(req,res,next)=>{
 console.log(req.body); // Imprimiendo en consola de servidor lo que se envió en el formulario (como objeto)
 res.send('recibido'); // Lo que se renderiza en la vista
});

router.get('/signin',(req,res,next)=>{

});

router.post('/signin',(req,res,next)=>{

});


module.exports = router