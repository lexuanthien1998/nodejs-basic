const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController');

//NewsController.list
router.get('/list', newsController.list);

//NewsController.details
router.get('/details', newsController.show);

//NewsController.index
router.get('/', newsController.index);

module.exports = router;