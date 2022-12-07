const Router = require('express');
const { check } = require('express-validator');
const router = new Router();
const controller = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post(
    '/signup',
    [check('username', 'username cannot be empty')],
    [
        check(
            'password',
            'password should be at least 5 characters and not more than 15'
        ).isLength({ min: 5, max: 15 }),
    ],
    controller.signUp
);
router.post('/signin', controller.signIn);

module.exports = router;
