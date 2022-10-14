const faker = require('faker');
const boom = require('@hapi/boom')

//aca estara toda la logica de negocio
//gestionar productos
//para router es transparante donde estan ubicados los datos

//vamos agregarle async para manejar el sincronismo, sin emabrgo debemos cambiar el archivo de servicio porque
//ahora vamos a devolver una promesa

class ProductsService{
constructor(){
  this.products = []
  this.generate();
}

  async generate(){
    const limit = 100;
    for(let index =0;index <limit;index++){
     this.products.push({
      id: faker.datatype.uuid(),
      name:faker.commerce.productName(),
      price: parseInt(faker.commerce.price(),10),
      Image : faker.image.imageUrl(),
    });
    }
  }

  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct

  }

  async find(){
    return this.products
  }

  async findOne(id){
   // const name = this.getTotal(); esto lo puede capturr el middleware
    return this.products.find(item => item.id ===id)
  }

  async update(id,changes){
    const index = this.products.findIndex(item => item.id ===id);
    if(index===-1){
      throw boom.notFound('product not found')
    }
    const product = this.products[index];
    this.products[index] ={
      ...product,
      ...changes
    }
    return this.products[index]
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id ===id);
    if(index===-1){
      throw boom.notFound('product not found')
    }
    this.products.splice(index,1);
    return {id};
  }
}

module.exports = ProductsService;
