const Router = require('express');
const router = new Router();
const controller = require('../controllers/usersController');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', roleMiddleware(['Admin']), controller.getUsers);

module.exports = router;
