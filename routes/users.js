
const express = require('express'); //vamos a construir un app y express la va a construir

const UserService = require('./../services/user')
const service = new UserService();

//como desde aqui no tenemos acceso a la app, vamos  a crear un router propio
const router = express.Router();
//recoger parametros por medio de un query (a travez de req.query)
//localhost:3000/users?limit=10&offset=200
//me devuelve un json con limit y offset que digite
router.get('/',(req,res)=>{
  const users = service.find() //con find obtengo todos los servicios
  res.json(users)
});

module.exports = router
