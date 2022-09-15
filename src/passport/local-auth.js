const passport = require('passport');
const localStrategy = require('passport-local').Strategy; 
//Strategy simple para la autenticación local (encriptado)

passport.use('local-signup', new localStrategy({
    usernameField: 'email', //Nombre del campo en el formulario que se usará para la autenticación ('name' en el formulairo)
    passwordField: 'password',
    passReqToCallback:true // Una ves verificados los campos en el formulario se realiza una autenticación por método y no por token (file)
},(req, email, password, done)=>{} // Si son correctos 'done' y se ejecuta lo de la función flecha 
)); //Asegurar usuario y contraseña (el nombre local-signup lo ponemos nosotros)