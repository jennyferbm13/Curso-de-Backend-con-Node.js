const express = require('express');
//archivo que va a configurar las rutas

//importo todo los roter aqui
const productRouter = require('./products')
const userRouter = require('./users')



function routerApi(app){
  const router = express.Router();
  //buena practica para el versionamiento
  app.use('/api/v1',router)
  router.use('/products',productRouter);
  router.use('/users',userRouter);
}

module.exports = routerApi
