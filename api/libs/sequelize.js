

const {Sequelize} = require('sequelize');

const {config} = require('./../config/config');
const setupModels= require('./../bd/models');

const USER = encodeURIComponent(config.dbUser); //para proteger el usuario
const PASSWORD = encodeURIComponent(config.dbPassword); //proteger la contraseña
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`; //esto por si la bd es una url de conexión, puede que sea una bd de azure, aws, etc.

//se usará la estrategia de polling
// const sequelize = new Sequelize(URI, {
//   delect: 'postgres',
//   logging: true
// });

//vamos a cambiar la URI, por la conexión a la dbUrl para que use el que nos pide fly.io
const sequelize = new Sequelize(config.dbUrl, {
  delect: 'postgres',
  logging: true
});


setupModels(sequelize); //enviamos la conexión

 // hará sincronización, va a coger el modelo y crea la estructura. Sin hacerlo manualmente

module.exports = sequelize;

