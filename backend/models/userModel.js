import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,'please give a username']
    },
    username: {
        type: String,
        required: [true,'please give a username'],
        unique: true
    },
    email: {
        type: String,
        required: [true,'please give an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'please give a password'],
    },
    dp: {
        type: String,
    }
},{timestamps: true});

const userModel = mongoose.model('user',userSchema);
export default userModel;