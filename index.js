const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

require('dotenv').config();

const app = express();

app.use(cors(corsOptions));
// app.use(cors());

const authRouter = require('./routers/authRouter');
const usersRouter = require('./routers/usersRouter');

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

const LOGIN_MONGO = process.env.LOGIN_MONGO;
const PASSWORD_MONGO = process.env.PASSWORD_MONGO;

const start = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${LOGIN_MONGO}:${PASSWORD_MONGO}@cluster0.gyojsqk.mongodb.net/review-portal?retryWrites=true&w=majority`
            // async (err, db) => {
            //     if (err) throw err;

            //     // const users = await db.collection('users').find().explain("executionStats");
            //     // console.log(users);

            //     // await db.collection('users').dropIndex("email_1");
            //     // console.log(idxs)

            //     const idxs = await db.collection('users').getIndexes();
            //     console.log(idxs)

            //     // const result = await db.collection('users').createIndex({email: 1});
            //     // console.log(`index created ${result}`)
            // }
        );

        console.log('DB connected!');

        app.listen(PORT, () =>
            console.log(`server started on the port ${PORT}`)
        );
    } catch (err) {
        console.log(err);
    }
};

start();
