const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
		include: [{
			model: Product,
			attributes: ['id', 'product_name', 'price', 'stock']
		}]
	}).then(data => res.json(data));
});

router.get('/:id', (req, res) => {
  Tag.findOne({
		where: {
			id: req.params.id
		},
		include: [{
			model: Product,
			attributes: ['id', 'product_name', 'price', 'stock']
		}]
	}).then(data => res.json(data));
});

router.post('/', (req, res) => {
  Tag.create(req.body)
	.then(data => res.status(200).json(data));
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
		where: {
			id: req.params.id
		}
	}).then(data => res.json(data));
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => res.status(200).json(dbPostData));
});

module.exports = router;
