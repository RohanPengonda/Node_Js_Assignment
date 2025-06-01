const express = require('express');
const router = express.Router();
const { getUser, deleteUser } = require('../controllers/userController');

router.get('/:email', getUser);
router.delete('/delete/:email', deleteUser);

module.exports = router;
