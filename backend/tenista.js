const mongoose = require('mongoose');
const tenistaSchema = new mongoose.Schema({
    nombre: String,
    matricula: String
});

const Tenista = mongoose.model('Tenista', tenistaSchema);

module.exports = Tenista;