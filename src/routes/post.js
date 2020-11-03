const express = require('express');
const router = express.Router();

const postController = require('../app/controllers/PostController');

// //PostController.show
router.get('/details/:slug', postController.show);

//PostController.index
router.get('/', postController.index);

module.exports = router;