// const {faker}= require('@faker-js/faker');
const boom = require('@hapi/boom');
const {Op} = require('sequelize');
// const sequelize = require('../libs/sequelize');
const {models} = require('./../libs/sequelize');

class ProductsService{

  constructor(){
    this.products =[];
    // this.generate();
    // this.pool = pool;
    // this.pool.on('error', (err)=> console.log(err));
  }

  // generate(){
  //   const limit = 100;
  //   for (let i = 0; i < limit; i++) {
  //     this.products.push({
  //       id: faker.datatype.uuid(),
  //       name:faker.commerce.productName(),
  //       price: parseInt(faker.commerce.price(),10),
  //       image: faker.image.imageUrl(),
  //       isBlock: faker.datatype.boolean()
  //     });
  //   }
  // }

// lógica para crear un producto
  async create(data){
    const newProduct = await models.Product.create(data,{
      include: ['category']
    });
    return newProduct;
  }

  async find(query){
    const options = {
      include: ['category'],
      where: {}
    }

    const {limit, offset} = query;
    if(limit && offset){
      options.limit = limit;
      options.offset = offset;
    }

    const {price} = query;
    if(price){
      options.where.price = price;
    }

    const {price_min, price_max}= query;
    if(price_min && price_max){
      options.where.price = {
        [Op.gte]: price_min, //mayor o igual a
        [Op.lte]: price_max //menor o igual a
      };
    }

    const rta = await models.Product.findAll(options);
    // const rta = await models.Product.findAll({
    //   include: ['category'],
    //   offset:0,
    //   limit: 2
    // });
    return rta;
  }

  async findOne(id){
    const product = await models.Product.findByPk(id);
    if(!product){
      throw boom.notFound('product not found');
    }
    return product;
  }
  // lógica para actualizar
  async update(id, changes){
    const product = await this.findOne(id);
    const rpta = product.update(changes);
    return rpta;
  }
  // lóciga para eliminar
  async delete(id){
    const product = await this.findOne(id);
    await product.destroy();
    return {id};
  }
}

module.exports = ProductsService;
