const faker = require('faker');


//aca estara toda la logica de negocio
//gestionar productos
//para router es transparante donde estan ubicados los datos


class UserService{
constructor(){
  this.user = []
  this.generate();
}

  generate(){
    const limit = 100;
    for(let index =0;index <limit;index++){
     this.user.push({
      id: faker.datatype.uuid(),
      name:faker.commerce.productName(),
      price: parseInt(faker.commerce.price(),10),
    });
    }
  }

  create(){

  }

  find(){
    return this.user
  }

  findOne(id){
    return this.user.find(item => item.id ===id)
  }

  update(){

  }

  delete(){

  }
}

module.exports = UserService;
