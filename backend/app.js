const express = require('express');
const mongoose = require('./db');
const Tenista = require('./tenista');

const app = express();
app.use(express.json());

app.get('/tenistas', async (req, res) => {
    try {
        const tenistas = await Tenista.find();
        res.json(tenistas);
    }catch(err){
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});