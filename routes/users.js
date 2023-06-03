const router = require('express').Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  getUsersMe,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUsersMe);
router.post('/', createUser);
router.get('/:userId', getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
