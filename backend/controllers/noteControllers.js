import asyncHandler from 'express-async-handler';
import noteModel from '../models/noteModel.js';

export const getNotes = asyncHandler(async (req,res)=>{
    const notes = await noteModel.find({user:req.user._id});
    res.json(notes);
});

export const createNote = asyncHandler(async (req,res)=>{
    if(!req.body.text){
        res.status(500);
        throw new Error("Can't create an empty note");
    }
    const newNote = await noteModel.create({
        user: req.user._id,
        title: req.body.title ? req.body.title : "",
        text: req.body.text,
        color: req.body.color ? req.body.color : "none"
    });

    res.json(newNote);
});

export const deleteNote = asyncHandler(async (req,res)=>{
    const currNote = await noteModel.findById(req.params.id);
    if(!currNote){
        res.status(400);
        throw new Error("Note doesn't exist");
    }
    if(currNote.user.toString()!=req.user._id){
        res.status(400);
        throw new Error("Current User not authorized to delete this note");
    }
    await noteModel.findByIdAndDelete(req.params.id);
    res.status(200).json({_id:req.params.id});
});

export const updateNote = asyncHandler(async (req,res)=>{
    if(!req.body.text){
        res.status(400);
        throw new Error("Can't update to empty note, delete instead");
    }
    const currNote = await noteModel.findById(req.params.id);
    if(!currNote){
        res.status(400);
        throw new Error("Note doesn't exist");
    }
    if(currNote.user.toString()!=req.user._id){
        res.status(400);
        throw new Error("Current User not authorized to update this note");
    }
    const updatedNote = await noteModel.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        text:req.body.text,
        color: req.body.color ? req.body.color : color
    },{new: true});
    res.json(updatedNote);
});