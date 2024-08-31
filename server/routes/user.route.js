const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth.middleware');
const blacklistModel = require('../models/blacklist.model');
const userModel = require('../models/user.model');


userRouter.post('/register', async (req, res) => {
    const { first_name, last_name, email, password, role, ph_no } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        bcrypt.hash(password, 5, async function (err, hash) {
            if (err) {
                re.status(500).json({ message: 'Error hashing the password', err })
            }
            else {
                const user = new userModel({
                    first_name,
                    last_name,
                    email,
                    password: hash,
                    role,
                    ph_no
                })
                await user.save();
                res.status(201).json({ message: "User registered successfully" })
            }
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({
            message: 'Error occurred during User Creation',
            error: error.message
        });
    }
});


userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'Email is not Correct',
            })
        }
        const role = user.role;
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    return res.status(500).json({ message: 'Error during password comparison' });
                }
                if (result) {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SecretKEY, { expiresIn: '1day' });
                    res.status(200).json({
                        message: "User LoggedIN successfully",
                        user,
                        token,
                        role
                    });
                } else {
                    res.status(401).json({ message: 'Incorrect Password' });
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error occured during login',
            error
        })
    }
})


userRouter.get('/logout', auth, async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const BlackListed_Token = new blacklistModel({
        token
    })
    await BlackListed_Token.save();
    res.send('Logout Successfull');
});

userRouter.get('/me', auth, async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user data' });
    }
});

module.exports = userRouter;