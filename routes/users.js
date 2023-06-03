const router = require('express').Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  getUsersMe,
  updateAvatar,
  login,
} = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, getUsers);
router.get('/me', authMiddleware, getUsersMe);
router.post('/', createUser);
router.post('/', login);
router.get('/:userId', authMiddleware, getUserById);
router.patch('/me', authMiddleware, updateUser);
router.patch('/me/avatar', authMiddleware, updateAvatar);

module.exports = router;
