const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const {Schema} = mongoose;

const userSchema = new Schema({
    email: String,
    password: String
});

userSchema.method.encryptPassword = (passport)=>{ // Se encripta el password que se reciba del cliente 
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10)); // Se encripta la contraseña y la cantidad de milisegundos entre semilla y semilla 
// Comisión Bancaria y de Valores la toma como un método de encriptación válido 
};


module.exports = mongoose.model('users',userSchema);