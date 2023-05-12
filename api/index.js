const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// const whitelist = ['http://localhost:3000','http://127.0.0.1:5500', 'https://myapp.co'];
// const options = {
//   origin: (origin, callback)=>{
//     if(whitelist.includes(origin)){
//       callback(null, true); //(error, acceso)
//     }else{
//       callback(new Error("No permitido")); //(error, acceso)
//     }
//   }
// }
// app.use(cors(options));
app.use(cors());

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler);

app.get('/api', (req, res)=>{
  res.send('Hola mi server en express');
})

app.get('/api/nueva-ruta', (req, res)=>{
  res.send('Hola, soy una nueva ruta o endpoint');
})


app.listen(port, ()=>{
  console.log('Mi port '+port);
})
