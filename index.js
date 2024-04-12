import express from 'express'
import mongoose from 'mongoose'

// Se define un modelo de mongoose
const Tenista = mongoose.model('Tenista', new mongoose.Schema({
  nombre: String,
  matricula: String,
}))
// Se crea una instancia de express 
const app = express()
// Se conecta a la base de datos
mongoose.connect('mongodb://fer:password@mongodb:27017/miapp?authSource=admin')
// Se define un endopoint para listar los animales
app.get('/', async (_req, res) => {
  console.log('testeando backend...')
  const tenistas = await Tenista.find();
  return res.send(tenistas)
})
// Se define un endpoint para crear un animal
app.get('/crear', async (_req, res) => {
  console.log('creando...')
  await Tenista.create({ nombre: 'Fernando', matricula: '123423' })
  return res.send('ok')
})
// Finalmente la aplicacion se queda escuchando en el puerto 3000
app.listen(3000, () => console.log('listening...'))


/*
El objetivo de esta aplicacion es que esta se pueda conectar con una instancia de mongo y
se encuentre dentro de un container de docker, de esta manera no tenemos que descargar mongo.
*/