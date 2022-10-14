
//const { normalizeText } = require('@rneui/base');
const express = require('express'); //vamos a construir un app y express la va a construir
const validatorHandler = require('./..//middlewares/validator')

//const { faker } = require('faker/lib/locales');
//const faker = require('faker');

const {createProductSchema,updateProductSchema,getProductSchema} = require('./../schemas/product')
const ProductsService = require('./../services/product')
const service = new ProductsService();

//como desde aqui no tenemos acceso a la app, vamos  a crear un router propio
const router = express.Router();

//Debo poner primero los endpoints que sean especifios, luego los dinamicos

/*
app.get('/products',(req,res)=>{
  res.json([{
    name:'Product1',
    price:3000
  },
  {
    name:'Product2',
    price:5000
  }])
})
*/

//con async vuelvo el metodo asincrono
//pongo wait en lo que sea una promesa

router.get('/', async (req,res)=>{
  const products = await  service.find() //con find obtengo todos los servicios
  res.json(products)
});

router.get('/:id', //params para indicarle de donde viene la info
 validatorHandler(getProductSchema,'params'), //si todo esta bien hace un next
 async (req,res)=>{

  try{
    const {id} = req.params; //de todos los parametros que tenga el objeto req solo quiero los id
    //params es una propiedad de red
    const product = await  service.findOne(id);
    res.json(product);
  }catch(error){
    next(error); //lo atrapa el middelware
  }
})

router.get('/:id/products/:idproduct',(req,res)=>{
  const {id, idproduct} = req.params //le debo poner el mismo nombre que arriba
  if (id==='999'){
    res.status(404).json({
      message: 'not found'
    })
  }else{
  res.status(200).json({
    id,
    idproduct,
    name:'Product1',
    price:3000
  })}
})

router.post('/',
validatorHandler(createProductSchema,'body'),
async (req,res)=>{
  const body = req.body //recibir del body (lo paso por postman en este caso)
  const newProduct = await  service.create(body);
  res.status(201).json(newProduct)
})

//id del producto que quiero actualizar
router.patch('/:id',
validatorHandler(getProductSchema,'params'),
validatorHandler(updateProductSchema,'body'),
async (req,res)=>{

  try{
    const {id} = req.params;
    const body = req.body //recibir del body
    const product = await service.update(id, body)
    res.json(product)
  }catch(error){
    res.status(400).json({
      message:error
    })
  }
})

router.delete('/:id', async(req,res)=>{
  const {id} = req.params;
  const product = await service.delete(id)
  res.json(product)
})

//para que sea exportable
module.exports = router
