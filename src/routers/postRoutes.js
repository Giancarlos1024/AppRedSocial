const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/posts', postController.getPosts);
router.post('/posts', postController.createPost);
router.post('/posts/:postID/like', postController.likePost);
router.post('/posts/:postID/comment', postController.commentPost);

module.exports = router;