
const {Model, DataTypes, Sequelize} = require('sequelize');

const CATEGORY_TABLE = 'Categories';

const CategorySchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  category:{
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "http://placeimg.com/640/480"
  },
  createAt:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Category extends Model{
  static associate(models){
    this.hasMany(models.Product,{
      as: 'products',
      foreignKey: 'categoryId'
    });
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false
    }
  }
}

module.exports = {CATEGORY_TABLE, CategorySchema, Category};
