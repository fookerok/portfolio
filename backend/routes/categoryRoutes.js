const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getCategories);
router.post('/', categoryController.createCat);
router.delete('/:id', categoryController.deleteCat);

module.exports = router;