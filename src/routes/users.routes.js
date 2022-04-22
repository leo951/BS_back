const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controllers');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdminToken = require('../middlewares/verifyAdminToken')
const addUserValidation = require('../middlewares/validators/users.validator');

router.post('/users', addUserValidation, user.create);

router.post('/users/login', user.login);

router.get('/usersAll', user.getUserAll);

router.get('/users/:id', verifyToken, user.findOne);
router.get('/users/admin/:id', verifyAdminToken, user.findOne)

router.put('/users/update', verifyToken, user.updateUser);

router.get('/users/delete/:id', verifyToken, user.deleteUser);


router.get('/verifytoken',verifyToken, user.verifyToken);
router.get('/verifyAdmin',verifyToken, user.verifyAdmin);


module.exports = router;