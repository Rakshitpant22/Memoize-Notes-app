import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: false,
    },
    text: {
        type: String,
        required: [true,"Please enter some text"],
    },
    color: {
        type: String
    }
},{timestamps:true});

const noteModel = mongoose.model('notes',noteSchema);
export default noteModel;