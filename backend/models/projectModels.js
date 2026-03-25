const pool = require('../config/db');

const Project = {
  getAll: async () => {
    const query = `
      SELECT 
        p.*, 
        c.name AS category 
      FROM projects p
      LEFT JOIN category c ON p.category_id = c.id
      ORDER BY p.id DESC
    `;
    const { rows } = await pool.query(query);
    return rows;
  },

  getById: async (id) => {
    const query = 'SELECT * FROM projects WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  deleteById: async (id) =>{
    const query = 'DELETE FROM projects WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  create: async ({ name, descr, linkSite, linkGit, category_id }) => {
    const query = 
    `INSERT INTO projects ( name, descr, "linkSite", "linkGit", category_id )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;
    const {rows} = await pool.query(query, [name, descr, linkSite, linkGit, category_id]);
    return rows[0];

  },

  edit: async ({ name, descr, linkSite, linkGit, category_id, id }) => {
    const query = 
      `UPDATE projects 
      SET
        name = $1, 
        descr = $2, 
        "linkSite" = $3, 
        "linkGit" = $4, 
        category_id = $5
      WHERE id = $6 
      RETURNING *`;
      const {rows} = await pool.query(query, [name, descr, linkSite, linkGit, category_id, id]);
      return rows[0];
  }
};

module.exports = Project;