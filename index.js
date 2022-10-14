const express = require('express');
const app = express(); //vamos a construir un app y express la va a construir
const port = 3000; //donde va correr la app
const routerApi = require('./routes')
const  {logErrors,errorHandler,boomErrorHandler} = require('./middlewares/error.handler')
//const cors = require('cors')

//joi para validar datos que me llegan del cliente


app.use(express.json()); //middelware para recibir formato json que nos enviarn por post
//el middleware esta entre request y response
//puedo hacer varios middelware secuenciales para validar datos y si algo no funciona puedo bloquear
//para dejar seguir al middelware lo hago con next() sino res.send('end') o res.status(500).json({error})

/*
app.use(cors())//evitar problemas de dominio
const whitelist = ['https://localhost:800','https..']//decir quien pueden hacer request
const option = {
  origin : (origin,callback)=>{
    if (whitelist.includes(origin)){
      callback(null, true)
    }else{
      callback(new Error('eerror'))
    }
  }
}*/

//Si voy  a localhost:3000 aparece esto
app.get('/', (req,res )=>{ //request y respon  poner "/" es crear una ruta
  res.send('Hola, mi server en express')
})



routerApi(app)

//los middlesware se deben hacer despues de definir el router
//de este mismo orden se va a ejecutar uno tres de otro (se le puso next)
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)


//con esto cree mi primer servidor
app.listen(port,()=>{
  console.log('Mi port'+port)
})

/*
REST
para hacer
get: /prodcut or /product{id}
put: replace or update
post: create
delete: delete
*/
