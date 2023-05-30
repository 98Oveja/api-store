

const {Pool} = require('pg');

const {config} = require('./../config/config');

let URI = '';
if(config.isProd){
  URI = config.dbUrl;
}else{
  const USER = encodeURIComponent(config.dbUser); //para proteger el usuario
  const PASSWORD = encodeURIComponent(config.dbPassword); //proteger la contraseña
  URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`; //esto por si la bd es una url de conexión, puede que sea una bd de azure, aws, etc.
}


// se gestiona de manera diferente, no necesitamos async

const pool = new Pool({
  // ya no es necesario enviarle los datos uno, a uno
  connectionString: URI
});


module.exports = pool;
