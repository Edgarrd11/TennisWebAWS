import express from 'express'
import mongoose from 'mongoose'

// Se conecta a la base de datos
mongoose.connect('mongodb://fer:password@mongodb:27017/miapp?authSource=admin')

// Se define un modelo de mongoose
const Tenista = mongoose.model('Tenista', new mongoose.Schema({
  nombre: String,
  matricula: String,
}))

// Se crea una instancia de express 
const app = express()

// Configuracion de la aplicacion
const viewspath = new URL('views', import.meta.url).pathname;
app.use(express.static(new URL('public', import.meta.url).pathname));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs') 
app.set('views', viewspath)

// Endpoint papra renderizar el index
app.get("/",async (_req, res) => {
  console.log('accediendo a index...')
  res.render('index')
})

// Endpoint para renderizar el login  
app.get("/login", async (_req, res) => {
  console.log('accediendo a login...')
  res.render('login')
})

// Endpoint para hacer registros
app.post('/regist', async (_req, res) => {
  console.log('registrando...')
  console.log(_req.body)

  const { nombre, matricula } = _req.body
  await Tenista.create({ nombre, matricula })
  console.log("Registro exitoso!")
  return res.redirect('/')

})


// Se muestra la base de datos
app.get('/tenistas', async (_req, res) => {
  console.log('mostrando tenistas...')
  const tenistas = await Tenista.find();
  return res.send(tenistas)
})



app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000/'))



// Se define un endopoint para listar los animales
// app.get('/', async (_req, res) => {
//   console.log('testeando backend...')
//   const tenistas = await Tenista.find();
//   return res.send(tenistas)
// })
// // Se define un endpoint para crear un animal
// app.get('/crear', async (_req, res) => {
//   console.log('creando...')
//   await Tenista.create({ nombre: 'Fernando', matricula: '123423' })
//   return res.send('ok')
// })
// Finalmente la aplicacion se queda escuchando en el puerto 3000


/*
El objetivo de esta aplicacion es que esta se pueda conectar con una instancia de mongo y
se encuentre dentro de un container de docker, de esta manera no tenemos que descargar mongo.
*/