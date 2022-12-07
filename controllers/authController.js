const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { secret } = require('../config/config');

const generateAccessToken = (id, roles) => {
    const payload = { id, roles };

    return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class authController {
    async signUp(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: 'Sign up error', errors });
            }

            const { username, password, email } = req.body;
            const candidate = await User.findOne({ email });

            if (candidate) {
                return res
                    .status(404)
                    .json({ message: 'User with that name already exists' });
            }

            const hashPassword = bcrypt.hashSync(password, 7);

            const userRole = await Role.findOne({ value: 'User' });

            const user = new User({
                username,
                password: hashPassword,
                email,
                roles: [userRole.value],
            });

            await user.save();

            return res.json({ message: `User ${email} Registration success` });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Sing up error' });
        }
    }

    async signIn(req, res) {
        try {
            const { password, email } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: `user not found` });
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                return res.status(400).json({ message: 'wrong password' });
            }

            const token = generateAccessToken(user._id, user.roles);

            return res.json({
                token,
                username: user.username,
                email,
                roles: user.roles,
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'sing in error' });
        }
    }
}

module.exports = new authController();
