const express = require('express');
const userController = require('../controllers/user');
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.readUsers);
router.get('/:userID', userController.readUser);
router.put('/:userID', userController.updateUser);
router.delete('/:userID', userController.deleteUser);

module.exports = router;
