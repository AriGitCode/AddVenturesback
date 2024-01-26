const express = require('express');
const { JWT_SECRET } = require('../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { checkAuth } = require("../middleware/checkAuth");

const router = express.Router();

//GET BY ID
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
})


//GET ALL
router.get('/', async (req, res) => {
    const users = await User.find();
    return res.status(200).json(users);
})


//CREATE
router.post('/signup', async (req, res) => {
    console.log(req.body);
    console.log('You have reached create new user route');
    req.body.email = req.body.email.toLowerCase();
    

    //Encrypt password
    const encyptedPassword = await bcrypt.hash(req.body.password, 12);
    console.log(`Finished encrypting password: ${encyptedPassword}`);
    req.body.password = encyptedPassword; //replacing original password with encrypted password

    const newUser = await User.create(req.body);
    console.log(newUser);


    //Sign the token and send it back
    const token = jwt.sign({ userId: newUser._id },JWT_SECRET, { expiresIn: '2h' });
    return res.status(201).json({ token, user: newUser});

})


//LOGIN
router.post('/login', async (req, res) => {


    const user = await User.findOne({ email: req.body.email });
    if (user) {
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (isPasswordValid) {
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '2h' });
            return res.status(200).json({ token, user: user});
        }
    }
    return res.status(401).json({ error: 'Login failed. Please check your credentials.' });
})

router.use(checkAuth);

//UPDATE
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ error: 'Error updating user.' });
    }
});


//DELETE
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (deletedUser) {
            return res.status(200).json({ message: 'User deleted successfully.' });
        } else {
            return res.status(404).json({ error: 'User not found.' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting user.' });
    }
});

module.exports = router