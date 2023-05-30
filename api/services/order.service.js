
const boom = require('@hapi/boom');
const {models}= require('./../libs/sequelize');

class OrderService{
  constructor() {}

  async create(data){
    const newOrder = await models.Order.create(data,{
      include: ['customer']
    })
    return newOrder;
  }
// función  para agregar item
  async addItem(data){
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find(){
    const rpta = await models.Order.findAll({
      include: ['customer']
    });
    return rpta;
  }

  async findOne(id){
    const order = await models.Order.findByPk(id,
      {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
      }
    );
    if (!order) {
      throw boom.notFound('product not found');
    }
    return order;
  }

  async update(id, changes){
    return{
      id,
      changes
    }
  }
  async delete(id){
    return {id};
  }
}

module.exports = OrderService;
