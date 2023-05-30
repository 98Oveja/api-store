
const {Model, DataTypes, Sequelize} = require('sequelize');

const {CUSTOMER_TABLE} = require('./customer.model')

const ORDER_TABLE = 'Orders';

const OrderSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId:{
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'customer_id',
    references:{
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  total:{
    type: DataTypes.VIRTUAL,
    get(){
      // items, manera en la que hayamos llamado a nuestra asociación
      if(this.items.length >0){
        return this.items.reduce((total, item)=>{
          return total+ (item.price * item.OrderProduct.amount);
        },0);
      }
    }
  }
}

class Order extends Model{
  static associate(models){
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId'
    });
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}

module.exports = {ORDER_TABLE, OrderSchema, Order};


// const id = Joi.number().integer();
// const customerId = Joi.number().integer();
// const orderId = Joi.number().integer();
// const productId = Joi.number().integer();
// const amount = Joi.number().integer().min(1);
