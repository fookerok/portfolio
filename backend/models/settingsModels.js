const pool = require('../config/db');

const Settings = {
    get: async () => {
        const { rows } = await pool.query('SELECT * FROM settings LIMIT 1');
        return rows[0];
    },
update: async (data) => {
    const { site_title, site_name, site_description, link_tg, link_git } = data;
    
    const query = `
        UPDATE settings 
        SET site_title = $1, site_name = $2, site_description = $3, link_tg = $4, link_git = $5
        WHERE id = 1
        RETURNING *;
    `;
    const values = [site_title, site_name, site_description, link_tg, link_git];
    const { rows } = await pool.query(query, values);
    return rows[0];
}
};

module.exports = Settings;