const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
  const {limit,offset} = req.query;

  if(limit && offset){
    res.json({
      limit,
      offset
    })
  }else{
    res.send('No existe los parámetros')
  }
});

router.get('/:id',(req,res)=>{
  const {id} = req.params;
  res.json({
    id,
    name: 'Luis',
    age: 23,
    role: 'Backend Engineer'
  })
})

module.exports = router;
