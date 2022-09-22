const express = require('express');
const engine = require('ejs-mate'); // motor de vistas para render desde servidor (engine)
const path = require('path'); // Para que no importe dónde situamos el archivo en el servidor 
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session'); 

//--- Usando el método de express (requerimientos o inicializaciones)
const app = express();
require('./database'); 
require('./passport/local-auth'); // Para utilizar el archivo de autenticación que configuramos

app.set('views',path.join(__dirname,'views'));// Desde views para atrás en el path (viene de express), una vez encontrada se concatena su nombre para competar la ruta de la carpeta

app.engine('ejs',engine); // Todos los ejs pertenecerán a la librería ejs-mate
app.set('view engine','ejs'); // Se setea el motor de renderizado como el designado en app.engine

//--- Configuración de puertos 
app.set('port',process.env.PORT || 3000);
// process.env.PORT se trata de asignar dinámicamente un puerto que esté disponible

//--- Middleware (variable que guarda herramientas a utilizar y que ya solo se requieren)

app.use(morgan('dev')) //Qué método se usa en la ruta y cuanto tarda la comunicación
app.use(express.urlencoded({extended:false})) // Para que morgan solo muestre un resúmen de la conectividad
app.use(session({
    secret: 'miclave', // no lo vuelve a pedir, es solo para generar la semilla
    resave: false, // Para que no genere automáticamente claves nuevas y poder jugar con la clave secret
    saveUninitialized: false, // Guardado de sesiones en false para ahorrar espacio en caché
})) //manipular sesiones antes de encriptar
app.use(passport.initialize()) // se inicia passport 
app.use(passport.session())


//--- Rutas

app.use('/',require('./routes/index')); //Cuando el usuario está en la raiz en navegador se muestra lo que se renderise en index de rutas 

//Iniciando servidor 
app.listen(app.get('port'),()=>{
    console.log('SERVIDOR EN PUERTO ',app.get('port')) // Se imprime el puerto 
}); // Se toma el puerto que se obtuvo dinámicamente
