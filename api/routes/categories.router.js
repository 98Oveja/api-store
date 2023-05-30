const express = require('express');

const CategoriesService = require('./../services/category.service');
//al no tener acceso a la aplicación, creamos un routing propio
const validatorHandler = require('./../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schemas/category.schema');


const router = express.Router();
const service = new CategoriesService();

// endpoint para categorias
router.get('/', async (req, res, next)=>{
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

// endpoint para una categoria en especifico
router.get('/:id',async (req,res)=>{
  const {id}=req.params;
  const category = await service.findOne(id);
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
router.post('/',validatorHandler(createCategorySchema, 'body'),
  async (req, res, next)=>{
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
})

// endpoint para patch, actualización parcial
router.patch('/:id',async (req, res)=>{
  const {id} = req.params;
  const body = req.body;
  const category = await service.update(id, body);
  res.json(category);
})

// endpoint para delete
router.delete('/:id', async (req, res)=>{
  const {id} = req.params;

  const rta = await service.delete(id);
  res.json(rta);
})

module.exports = router;

