const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlaceSchema = new Schema({
    title:{
        type: String,
        required: true,
        minlength: 3
    },
    
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    
    latitude: {
        type: Number,
        required: true,
    },

    longitude: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    wantToGo: {type: Boolean, default: false},
    user: {type:mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true})

const Place = mongoose.model('Place',PlaceSchema);
module.exports = Place;