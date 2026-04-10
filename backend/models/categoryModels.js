const pool = require('../config/db');

const Category = {
  getAll: async () => {
    const { rows } = await pool.query('SELECT * FROM category ORDER BY name ASC');
    return rows;
  },
  createCat: async ({name}) => {
    const query = 
    `INSERT INTO category (name)
    VALUES ($1)
    RETURNING *`;
    const {rows} = await pool.query(query, [name]);
    return rows[0];
  },
  deleteCat: async (id) => {
    const query = 'DELETE FROM category WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
};

module.exports = Category;