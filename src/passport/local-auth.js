const e = require('connect-flash');
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

passport.deserializeUser(async (id,done)=>{
    const user = await User.findById(id);
    done(null,user); 
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
    nameField: 'name',
    phoneField: 'phone',
    profileField: 'profile',
    passReqToCallback:true // Una vez verificados los campos en el formulario se realiza una autenticación por método y no por token (file)
},async (req, email, password, done)=>{

    const user = await User.findOne({'email': email});

    if(user){ // Trae todo el pull de usuarios
        return done(null,false,req.flash('signupMessage','Usuario ya registrado')) //Cuando ya existe se retorna algún dato pues se encontrpon una coincidencia (ya se ha registrado ese usuario)
    }else{ // El nombre signupMessage lo inventamos, es el nombre de la variable que se requiere en el index raiz
        const newUser = new User(); // Creando objeto User usando el modelo recién creado
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.name = req.body.name;
        newUser.phone = req.body.phone;
        newUser.profile = req.body.profile;
        //newUser.password = password; // Pasamos al modelo los datos recibidos en el formulario
        console.log(newUser)
        await newUser.save()
        done(null,newUser)
    }

} // Si son correctos 'done' y se ejecuta lo de la función flecha 
)); //Asegurar usuario y contraseña (el nombre local-signup lo ponemos nosotros)




passport.use('local-signin', new localStrategy({
    usernameField: 'email', //Nombre del campo en el formulario que se usará para la autenticación ('name' en el formulairo)
    passwordField: 'password',
    passReqToCallback:true // Una ves verificados los campos en el formulario se realiza una autenticación por método y no por token (file)
},async (req, email, password, done)=>{

    const user = await User.findOne({email: email});

    if(!user){
        return done(null,false,req.flash('signinMessage','Usuario no encontrado')) //Cuando intenta hacer login
    } 

    if(!user.comparePassword(password)){
        return done(null,false,req.flash('signinMessage','Contraseña incorrecta')) //Cuando intenta hacer login
    }
    done(null, user)

} // Si son correctos 'done' y se ejecuta lo de la función flecha 
)); //Asegurar usuario y contraseña (el nombre local-signup lo ponemos nosotros)