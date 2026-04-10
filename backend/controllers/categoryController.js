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

const createCat = async (req, res) => {
  const {name} = req.body;
  try{
    if (!name) {
      return res.status(400).json({ message: 'Название обязательно' });
    }
    const newCategory = await Category.createCat({ name });
    res.status(201).json(newCategory);
  }
  
  catch(err) {
    console.error('Ошибка при добавлении категории:', err.message);
    res.status(500).json({ error: err.message });
  }
}
const deleteCat = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Category.deleteCat(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }

    res.json({ message: 'Категория удалена' });

  } catch (err) {
    console.error('Ошибка при удалении категории:', err.message);
    res.status(500).json({ error: err.message });
  }
};
module.exports = { 
  getCategories, 
  createCat,
  deleteCat
};