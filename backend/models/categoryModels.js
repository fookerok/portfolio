const pool = require('../config/db');

const Category = {
  getAll: async () => {
    const { rows } = await pool.query('SELECT * FROM category ORDER BY name ASC');
    return rows;
  }
};

module.exports = Category;