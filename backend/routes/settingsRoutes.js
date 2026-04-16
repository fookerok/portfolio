const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `site-${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

router.get('/', settingsController.getSettings);
router.put('/', upload.single('image'), settingsController.editSettings);
router.delete('/image', settingsController.deleteImage);

module.exports = router;