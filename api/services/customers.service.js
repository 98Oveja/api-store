

const boom = require('@hapi/boom');
const {models} = require('./../libs/sequelize');

class CustomerService{
  constructor(){}

  // async create(data){
  //   const newUser = await models.User.create(data.user);
  //   const newCustomer = await models.Customer.create({
  //     ...data,
  //     userId: newUser.id
  //   });
  //   return newCustomer;
  // }
  async create(data){
    const newCustomer = await models.Customer.create(data,{
      include: ['user']
    });
    return newCustomer;
  }

  async find(){
    const rpta = await models.Customer.findAll({
      include: ['user'] //user es del alias que puse en el modelo
    });
    return rpta;
  }
  async findOne(id){
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }
  async update(id, changes){
    const  customer = await this.findOne(id);
    const rta = customer.update(changes);
    return rta;
  }

  async delete(id){
    const customer = await this.findOne(id);
    await customer.destroy();
    return {id};
  }
}

module.exports = CustomerService;
