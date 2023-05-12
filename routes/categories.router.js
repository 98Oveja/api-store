const express = require('express');

const CategoriesService = require('./../services/category.service');
//al no tener acceso a la aplicación, creamos un routing propio
const router = express.Router();
const service = new CategoriesService();

// endpoint para categorias
router.get('/', (req, res)=>{
  const categories = service.find();
  res.json(categories);
});

// endpoint para una categoria en especifico
router.get('/:id',(req,res)=>{
  const {id}=req.params;
  const category = service.findOne(id);
  res.json(category);
});

// ruta para encontrar productos con esa categoria
router.get('/:categorieId/products/:productId',(req, res)=>{
  const {categoryID, productId} = req.params;
  res.json({
    categoryID,
    productId
  })
})

// endpoint para post
router.post('/',(req, res)=>{
  const body = req.body;
  const newCategory = service.create(body);
  res.status(201).json(newCategory);
})

// endpoint para patch, actualización parcial
router.patch('/:id',(req, res)=>{
  const {id} = req.params;
  const body = req.body;
  const category = service.update(id, body);
  res.json(category);
})

// endpoint para delete
router.delete('/:id', (req, res)=>{
  const {id} = req.params;

  const rta = service.delete(id);
  res.json(rta);
})

module.exports = router;

