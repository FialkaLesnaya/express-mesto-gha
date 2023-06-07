const router = require('express').Router();
const { celebrate } = require('celebrate');
const { validateUserDetails, validateUserId, validateUserAvatar } = require('../utils/validators');
const {
  getUsers,
  getUserById,
  updateUser,
  getUsersMe,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUsersMe);
router.get('/:userId', celebrate({ params: validateUserId }), getUserById);
router.patch('/me', celebrate({ body: validateUserDetails }), updateUser);
router.patch('/me/avatar', celebrate({ body: validateUserAvatar }), updateAvatar);

module.exports = router;
