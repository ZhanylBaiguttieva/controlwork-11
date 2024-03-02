import {Router} from "express";
import mongoose from "mongoose";
import User from "../models/User";

const usersRouter = Router();

usersRouter.post('/', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            displayName: req.body.displayName,
            phone: req.body.phone,
        });
        user.generateToken();
        await user.save();
        res.send({ message: 'Problem not found', user });
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }
        next(e);
    }
});

usersRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(422).send({ error: 'Username not found' });
        }

        const isMatch = await user.checkPassword(req.body.password);
        if (!isMatch) {
            return res.status(422).send({ error: 'Password is wrong' });
        }
        user.generateToken();
        await user.save();

        return res.send({ message: 'Username and password are correct!', user });
    } catch (e) {
        next(e);
    }
});
usersRouter.delete('/sessions', async (req, res, next) => {
    try {
        const headerValue = req.get('Authorization');
        const successMessage = { message: 'Success!' };

        if (!headerValue) {
            return res.send(successMessage);
        }

        const [_bearer, token] = headerValue.split(' ');
        if (!token) {
            return res.send(successMessage);
        }

        const user = await User.findOne({ token });

        if (!user) {
            return res.send(successMessage);
        }

        user.generateToken();
        await user.save();

        return res.send(successMessage);
    } catch (e) {
        next(e);
    }
});

export default usersRouter;