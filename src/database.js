const mongoose = require('mongoose'); // canal de conexión con la base de datos
const {mongodb} = require('./keys'); // requerimos la cadena de conexión en el archivo 

mongoose.connect(mongodb.URI)// Utilizamos el modulo exportado en el archivo   
    .then(db => console.log('BASE CONECTADA'))
    .catch(err => console.error(err)); // Verificamos si se logró la conexión 
    // db y err son objetos de connect , then y catch son de javascript 