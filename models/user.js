const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {type: String,},
    lastName: {type: String,},
    email: { type: String, unique: true },
    password: { type: String, required: true, minlength: 6 },
    places: [{type:mongoose.Schema.Types.ObjectId, ref: 'Place' }]
}, { timestamps: true });

const User = mongoose.model('User', UserSchema, 'users');
module.exports = User;