const { Schema, model } = require('mongoose');

const User = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        roles: [{ type: String, ref: 'role' }],
    },
    { timestamps: { createdAt: 'created_at' } }
);

module.exports = model('User', User);
