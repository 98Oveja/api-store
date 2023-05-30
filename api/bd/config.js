

const {config} = require('./../config/config');

const USER = encodeURIComponent(config.dbUser); //para proteger el usuario
const PASSWORD = encodeURIComponent(config.dbPassword); //proteger la contraseña
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`; //esto por si la bd es una url de conexión, puede que sea una bd de azure, aws, etc.


module.exports = {
  // ambientes - como lo tenia en local
  development:{
    url: URI,
    dialect :'postgres',
  },
  production:{
    url: URI,
    dialect :'postgres',
  }

  // como ahora se hace para producción
  // development:{
  //     url: config.dbUrl,
  //     dialect :'postgres',
  //   },
  // production:{
  //   url: config.dbUrl,
  //   dialect :'postgres',
  // }
}
