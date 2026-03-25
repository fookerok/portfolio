const Setting = require('../models/settingsModels');

const getSettings = async (req, res) => {
  try {
    const settings = await Setting.get();
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении данных' });
  }
};

const editSettings = async (req, res) => {
    try {
        const updatedSetting = await Setting.update(req.body);
        
        if (!updatedSetting) {
            return res.status(404).json({ error: "Запись с id=1 не найдена в базе" });
        }
        
        res.json(updatedSetting);
    } catch (err) {
        console.error('ПОЛНАЯ ОШИБКА В ТЕРМИНАЛЕ:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
  getSettings,
  editSettings
};