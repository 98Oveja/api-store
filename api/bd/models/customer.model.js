
// const Datatype = require('faker/lib/datatype');
const {Model, DataTypes, Sequelize} = require('sequelize');
const { USER_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'Customers';


const CustomerSchema ={
  id:{
    allowNull:false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name:{
    allowNull: false,
    type: DataTypes.STRING
  },
  lastName:{
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name'
  },
  phone:{
    allowNull: false,
    type: DataTypes.STRING
  },
  userId:{
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references:{
      model: USER_TABLE,
      key: 'id'
    },
    oneUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Customer extends Model{
  static associate(models){
    this.belongsTo(models.User, {as: 'user'});
    this.hasMany(models.Order,{
      as: 'orders',
      foreignKey: 'customerId'
    })
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}

module.exports = {CUSTOMER_TABLE, CustomerSchema, Customer};
