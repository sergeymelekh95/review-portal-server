const User = require('../models/User');
const Role = require('../models/Role');

class usersController {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new usersController();
