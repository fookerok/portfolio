const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'YOUR_VERY_SECRET_KEY';

const login = async (req, res) => {
  const { login, password } = req.body;
  try {
    const userResult = await pool.query('SELECT * FROM users WHERE login = $1', [login]);
    const user = userResult.rows[0];

    if (!user) return res.status(401).json({ error: 'Юзер не найден' });

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (isValid) {
      const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '24h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Неверный пароль' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

const setupAdmin = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash('GamarDima1703', 10);
    await pool.query(
      `INSERT INTO users (login, password_hash, role) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (login) 
       DO UPDATE SET password_hash = EXCLUDED.password_hash`,
      ['admin', hashedPassword, 'admin']
    );
    res.send('Админ успешно создан!');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { login, setupAdmin };