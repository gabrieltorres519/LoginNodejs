const express = require('express');
const engine = require('ejs-mate'); // motor de vistas para render desde servidor (engine)

// Usando el método de express 
const app = express();

app.engine('ejs',engine); // Todos los ejs pertenecerán a la librería ejs-mate
app.set('view engine','ejs'); // Se setea el motor de renderizado como el designado en app.engine

//Configuración de puertos 
app.set('port',process.env.PORT || 3000);
// process.env.PORT se trata de asignar dinámicamente un puerto que esté disponible


//Iniciando servidor 
app.listen(app.get('port'),()=>{
    console.log('SERVIDOR EN PUERTO ',app.get('port')) // Se imprime el puerto 
}); // Se toma el puerto que se obtuvo dinámicamente

