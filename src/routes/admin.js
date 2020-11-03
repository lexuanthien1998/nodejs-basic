const express = require('express');
const { Router } = require('express');
const router = express.Router();

const multer  = require('multer');
const upload = multer({ dest: './src/public/uploads/' });

const adminController = require('../app/controllers/AdminController');

router.get('/post/create', adminController.postCreate);
router.post('/post/store', upload.single('image'), adminController.postStore);
router.get('/post/:id/edit', adminController.postEdit);
router.post('/post/update-post/:id', upload.single('image'), adminController.postUpdate);
router.post('/post/:id/delete', adminController.postDelete);
router.get('/', adminController.postList);

module.exports = router;