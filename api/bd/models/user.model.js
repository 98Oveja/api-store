
const {Model, DataTypes, Sequelize} = require('sequelize');

// nombre de la tabla
const USER_TABLE = 'Users';

// definimos el esquema
const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email:{
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password:{
    allowNull: false,
    type: DataTypes.STRING
  },
  role:{
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  createAt:{ //acá podemos usar camelCase
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at', //por convencion en bd usamos _ para separar, no camelCase
    defaultValue: Sequelize.NOW
  }
}

// definir la clase con nuestro modelo extendiendo del modelo
class User extends Model{
  static associate(models){ // estaticos quiere decir que no necesito una declaración para acceder a esos métodos
    //associate
    this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId'
    });
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User};
