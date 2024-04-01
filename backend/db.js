const mongoose = require('mongoose');

moongose.connect('mongodb://localhost:27017/Tenistas', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true    
}).then(() => { 
    console.log('Conexión a la base de datos establecida con éxito...');
}).catch(err => {
    console.log('Error de conexión a la base de datos: ', err);
});

module.exports = mongoose.connection;
