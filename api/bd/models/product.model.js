
// const Datatype = require('faker/lib/datatype');
const {Model, DataTypes, Sequelize} = require('sequelize');
const {CATEGORY_TABLE } = require('./category.model');

const PRODUCT_TABLE = 'Products';

const ProductSchema ={
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name:{
    allowNull: false,
    type: DataTypes.STRING
  },
  description:{
    allowNull: false,
    type: DataTypes.TEXT
  },
  price:{
    allowNull: false,
    type: DataTypes.DECIMAL,
  },
  image:{
    allowNull: false,
    type: DataTypes.STRING
  },
  createAt:{ //acá podemos usar camelCase
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at', //por convencion en bd usamos _ para separar, no camelCase
    defaultValue: Sequelize.NOW
  },
  categoryId:{
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references:{
      model: CATEGORY_TABLE,
      key: 'id'
    },
    oneUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Product extends Model{
  static associate(models){
    this.belongsTo(models.Category,
      {as: 'category'}
      );
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

module.exports = {PRODUCT_TABLE, ProductSchema, Product}
// name:faker.commerce.productName(),
// price: parseInt(faker.commerce.price(),10),
// image: faker.image.imageUrl(),
// isBlock: faker.datatype.boolean()
