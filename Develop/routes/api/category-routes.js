const router = require('express').Router();
const { Category, Product } = require('../../models');
const seedCategories = require('../../seeds/category-seeds');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock']
    }].then(data => res.json(data))
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findAll({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock']
    }].then(data => res.json(data))
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then(data => res.status(200).json(data))
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(data => res.json(data));
  });

  router.delete('/:id', (req, res) => {
    // delete a category by its `id` value
    Category.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(data => res.status(200).json(data));
      
  });

  module.exports = router;
