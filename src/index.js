const express = require('express');

// Usando el método de express 
const app = express();

//Configuración de puertos 
app.set('port',process.env.PORT || 3000);
// process.env.PORT se trata de asignar dinámicamente un puerto que esté disponible


//Iniciando servidor 
app.listen(app.get('port'),()=>{
    console.log('SERVIDOR EN PUERTO ',app.get('port')) // Se imprime el puerto 
}); // Se toma el puerto que se obtuvo dinámicamente

