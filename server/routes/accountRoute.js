const { getBalance, transferMoney } = require('../controller/accountController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get('/balance', authMiddleware, getBalance);
router.post('/transfer', authMiddleware, transferMoney);

module.exports = router;