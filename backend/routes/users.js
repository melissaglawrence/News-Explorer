const router = require('express').Router();

const { getUser, getUsersInfo } = require('../controllers/users');

router.get('/me', getUser);
router.get('/', getUsersInfo);

module.exports = router;
