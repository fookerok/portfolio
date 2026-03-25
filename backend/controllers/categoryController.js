const Category = require('../models/categoryModels');

const getCategories = async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении категории' });
  }
};

module.exports = { getCategories };