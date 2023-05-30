const express = require('express');

const ProductsService= require(('./../services/product.service'));
const validatorHandler= require(('./../middlewares/validator.handler'));
const {createProductSchema, updateProductSchema, getProductSchema, queryProductSchema}= require(('./../schemas/product.shcema'));

//al no tener acceso a la aplicación, creamos un routing propio
const router = express.Router();
const service = new ProductsService();

// endpoint para productos
router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next)=>{
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
})


// endpoint con filtro
router.get('/filter',(req,res)=>{
  res.send('Yo soy un filter');
})

// endpoint para un producto en específico
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next)=>{
    try{
      const {id} = req.params;
      const product = await service.findOne(id);
      res.json(product);
    }catch(error){
      next(error);
    }
  }
);

// endpoint para post
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next)=>{
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

// endpoint para patch, actualización parcial
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next)=>{
    try {
      const {id} = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
      // res.status(404).json(error.message);
    }
  }
);

// endpoint para delete
router.delete('/:id', async (req, res)=>{
  const {id} = req.params;

  const rta = await service.delete(id);
  res.json(rta);
});


module.exports = router;
