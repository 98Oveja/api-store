const express = require('express');

const CustomerService = require('./../services/customers.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {getCustomerSchema, createCustomerSchema, updateCustomerSchema} = require('./../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

router.get('/', async (req, res, next)=>{
  try {
    const customers = await service.find();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',async (req, res)=>{
  const {id} = req.params;
  const customer = await service.findOne(id);
  res.json(customer);
});
// endpoint para post
router.post('/',validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next)=>{
    try {
      const body = req.body;
      const newCustomer = await service.create(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
});
// endpoint para patch
router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next)=>{
    try {
      const {id} = req.params;
      const body = req.body;
      const newCustomer = await service.update(id,body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
});
// endpoint para eliminar
router.delete('/:id', validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next)=>{
    try {
      const {id} = req.params;
      const customer = await service.delete(id);
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
});


module.exports = router;


