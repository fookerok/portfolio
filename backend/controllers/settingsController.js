const fs = require('fs');
const path = require('path');

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
    let data = { ...req.body };

    const oldSettings = await Setting.get();

    // 💥 если загрузили новый файл
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;

      if (oldSettings?.image) {
        const oldPath = path.join(
          __dirname,
          '..',
          oldSettings.image.replace('/uploads/', 'uploads/')
        );

        fs.unlink(oldPath, () => {});
      }

    } else if (data.removeImage === 'true') {
      // 💥 если удалили
      data.image = null;

    } else {
      // 💥 если НЕ трогали — оставляем старое
      data.image = oldSettings.image;
    }

    const updatedSetting = await Setting.update(data);

    res.json(updatedSetting);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const deleteImage = async (req, res) => {
  try {
    const settings = await Setting.get();

    if (settings?.image && typeof settings.image === 'string') {
      const filePath = path.join(
        __dirname,
        '..',
        settings.image.replace('/uploads/', 'uploads/')
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Setting.update({
      ...settings,
      image: null
    });

    res.json({ success: true });

  } catch (err) {
    console.error('DELETE IMAGE ERROR:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getSettings,
  editSettings,
  deleteImage
};