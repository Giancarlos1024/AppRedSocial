
//userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);
router.get('/user/:userID', userController.getUser);
router.put('/user/:userID', userController.updateUser);
router.post('/addfriend', userController.addFriend);


module.exports = router;