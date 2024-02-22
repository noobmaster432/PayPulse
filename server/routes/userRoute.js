const { register, login, editUser, searchUser } = require("../controller/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post('/signup', register);
router.post('/signin', login);
router.put('/', authMiddleware, editUser);
router.get('/bulk', authMiddleware, searchUser);

module.exports = router;
