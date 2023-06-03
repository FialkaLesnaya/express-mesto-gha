const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  getUsersMe,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUsersMe);
router.get('/:userId', getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
