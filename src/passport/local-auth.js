const passport = require('passport');
const localStrategy = require('passport-local').Strategy; 
//Strategy simple para la autenticación local (encriptado)

const User = require('../models/user');

// passport.serializeUser(async (user,done)=>{
//     const user1 = await done(null, user1.id);
//     done(null,user); 
// }); //Encriptado

passport.serializeUser((user,done)=>{
    done(null,user.id); 
}); //Encriptado es síncrono pues se encripta y luego se envía

passport.serializeUser(async (user,done)=>{
    const user2 = await User.findById(id);
}); //Desencriptado

// Opción 1 con try catch 

// passport.use('local-signup', new localStrategy({
//     usernameField: 'email', //Nombre del campo en el formulario que se usará para la autenticación ('name' en el formulairo)
//     passwordField: 'password',
//     passReqToCallback:true // Una ves verificados los campos en el formulario se realiza una autenticación por método y no por token (file)
// },(req, email, password, done)=>{
//     const user = new User(); // Creando objeto User usando el modelo recién creado
//     user.email = email;
//     user.password = password; // Pasamos al modelo los datos recibidos en el formulario
//     user.save()
//     .then(db => console.log('Usuario registrado'))
//     .catch(err => console.error(err)); // Verificamos si se logró la conexión 
// } // Si son correctos 'done' y se ejecuta lo de la función flecha 
// )); //Asegurar usuario y contraseña (el nombre local-signup lo ponemos nosotros)


//Opción asíncrona moderna de javascript
passport.use('local-signup', new localStrategy({
    usernameField: 'email', //Nombre del campo en el formulario que se usará para la autenticación ('name' en el formulairo)
    passwordField: 'password',
    passReqToCallback:true // Una ves verificados los campos en el formulario se realiza una autenticación por método y no por token (file)
},async (req, email, password, done)=>{
    const user = new User(); // Creando objeto User usando el modelo recién creado
    user.email = email;
    user.password = password; // Pasamos al modelo los datos recibidos en el formulario
    await user.save()
    done(null,use)
} // Si son correctos 'done' y se ejecuta lo de la función flecha 
)); //Asegurar usuario y contraseña (el nombre local-signup lo ponemos nosotros)