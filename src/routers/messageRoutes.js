const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/:userID/:friendID', messageController.getMessages);
router.post('/send', messageController.sendMessage);

module.exports = router;
