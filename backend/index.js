require('dotenv').config();
const express = require('express');
const cors = require('cors');

const projectRoutes = require('./routes/projectRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const app = express();
const path = require('path');
 
// Мидлвары
app.use(cors());
app.use(express.json());

app.use('/api/projects', projectRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/auth', authRoutes);


app.use(
  '/api/uploads',
  express.static(path.join(__dirname, 'uploads'))
);

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Локальный сервер запущен на http://localhost:${PORT}`);
    });
}

module.exports = app;