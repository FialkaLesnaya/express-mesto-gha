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
// joi
router.get('/:userId', getUserById);
// joi
router.patch('/me', updateUser);
// joi
router.patch('/me/avatar', updateAvatar);

module.exports = router;
