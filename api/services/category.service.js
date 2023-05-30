// const {faker}= require('@faker-js/faker');
const boom = require('@hapi/boom');
const {models} = require('./../libs/sequelize');

class CategoriesService{

  constructor(){
    // this.categories = [];
    // this.generate();
  }

  // generate(){
  //   const limit = 10;
  //   for (let i = 0; i < limit; i++) {
  //     this.categories.push({
  //       id: faker.datatype.uuid(),
  //       category: faker.commerce.productAdjective()
  //     });
  //   }
  // }


  // lógica para crear un producto
  async create(data){
    const newCategory = await models.Category.create(data);
    return newCategory;
  }
  // lógica find para mostrar categorias
  async find(){
    const rpta = await models.Category.findAll();
    return rpta;
  }
  // lógica find para mostrar un solo producto
  async findOne(id){
    const category = await models.Category.findByPk(id,{
      include: ['products']
    });

    if(!category){
      throw boom.notFound('category not found');
    }
    return category;
  }

  // lógica para actualizar
  update(id, changes){
    const index = this.categories.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('category not found');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    };
    return this.categories[index];
  }
  // lógica para eliminar
  delete(id){
    const index = this.categories.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('category not found');
    }
    this.categories.splice(index,1);
    return {id};
  }

}

module.exports = CategoriesService;
