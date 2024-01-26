const express = require('express');
const Place = require('../models/place');
const router = express.Router();
const { checkAuth } = require('../middleware/checkAuth');
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const User = require("../models/user");

//GET ALL
router.get('/', async (req, res) => {
    try{
        const token = req.headers.authorization
        console.log("toke: ", token)
        const decodedToken = jwt.verify(token.split(" ")[1], JWT_SECRET);
        console.log("decoded: ", decodedToken)
        const userID = decodedToken.userId;
    // const u serID = "dsdsd";
    
        const user = await User.findById(userID);
        const places = []
        for (const place of user.places) {
            const newPlace = await Place.findById(place)
            places.push(newPlace)
        }
        return res.status(200).json(places);
    }catch(err){
        console.log('Error while fetching places', err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
})

//Manipulate request with token
router.use(checkAuth); //middleware to check if user is authenticated


//CREATE A PLACE and store in DB

router.post('/', async (req, res) => {
    try {
    const placeNew = new Place(req.body);
    const token = req.headers.authorization
    const decodedToken = jwt.verify(token.split(" ")[1], JWT_SECRET);
    console.log("decoded: ", decodedToken)
    const user = await User.findById(decodedToken.userId);
    
        const savedPlace = await placeNew.save();
        user.places.push(placeNew)
        user.save()
        return res.status(200).json(savedPlace);
    }catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
    
})





//UPDATE
router.put('/:id', async (req, res) => {
    try {
        const updatedPlace = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(updatedPlace);
    } catch (error) {
        return res.status(500).json({ error: 'Error updating place.' });
    }
})

//DELETE
router.delete('/:id', async (req, res) => {
    try {
        const deletedPlace = await Place.findByIdAndDelete(req.params.id);
        return res.status(200).json(deletedPlace);
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting place.' });
    }
})
module.exports = router;