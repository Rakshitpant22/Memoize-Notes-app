import asyncHandler from 'express-async-handler';
import userModel from '../models/userModel.js';
import noteModel from '../models/noteModel.js';
import bcrpyt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const generateToken = (id)=>{
    const token = jwt.sign({id},process.env.JWT_SECRET);
    return token;
};

// signup function
export const registerUser = asyncHandler(async (req,res)=>{
    const {name,username,email,password} = req.body;

    if(!name || !username || !email || !password){
        res.status(400);
        throw new Error("insufficient datails provided");
    }

    const userExistsByEmail = await userModel.findOne({email});
    const userExistsByUsername = await userModel.findOne({username});
    if(userExistsByEmail || userExistsByUsername){
        res.status(400);
        if(userExistsByEmail) throw new Error(`Email '${email}' already in use`);
        if(userExistsByUsername) throw new Error(`Username '${username}' already in use`);
    }

    const salt = await bcrpyt.genSalt(10);
    const encryptedPassword = await bcrpyt.hash(password,salt);

    const newUser = await userModel.create({name,username,email,password: encryptedPassword, dp:'http://res.cloudinary.com/dgx2etbfc/image/upload/v1706992315/qtsqsrkbzg4x7lwpbdxs.png'});

    if(newUser){
        res.status(200);
        res.json({
            name: newUser.name,
            username: newUser.username,
            dp: newUser.dp,
            token: generateToken(newUser._id),
        })
    }else{
        res.status(400);
        throw new Error("Unable to create new user");
    }
});

// login function
export const login = asyncHandler(async (req,res)=>{
    const {username,email,password} = req.body;

    if(!password || (!username && !email)){
        res.status(400);
        throw new Error("Insufficient details");
    }

    let currUser;
    if(email){
        currUser = await userModel.findOne({email});
    }else{
        currUser = await userModel.findOne({username});
    }

    if(!currUser){
        res.status(400);
        throw new Error("User doesn't exist");
    }

    if(await bcrpyt.compare(password,currUser.password)){
        res.status(200);
        res.json({
            name: currUser.name,
            username: currUser.username,
            dp: currUser.dp,
            token: generateToken(currUser._id)
        })
    }else{
        res.status(400);
        throw new Error("Invalid password");
    }
});

// delete user function
export const deleteUser = asyncHandler(async (req,res)=>{
    const userNotes = await noteModel.find({user:req.user._id});

    for(let note of userNotes){
        await noteModel.findByIdAndDelete(note._id);
    }

    await userModel.findByIdAndDelete(req.user._id);

    res.json({message:"User deleted successfully"});
});

export const userDpUpload = asyncHandler(async (req,res)=>{
   
    const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{dp:req.body.url},{new:true});
    res.json({
        name: updatedUser.name,
        username: updatedUser.username,
        dp: updatedUser.dp,
        token: generateToken(updatedUser._id)
    });
});