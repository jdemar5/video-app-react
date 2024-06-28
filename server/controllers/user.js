import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js";

//function to update user
export const update = async (req, res, next) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.user.id, { $set: req.body, }, { new: true });
            res.status(200).json(updatedUser)
        } catch (error) {
            next(error)
        }
};

//function for deletion of users
export const deleteUser = async (req,res,next)=>{
    if(req.params.id === req.user.id){
        try{
            await User.findByIdAndDelete(req.params.id,);
            res.status(200).json("User is now deleted.")
        } catch(error){
            next(error)
        }
    }else{
        return next(createError(403, "You can only delete your account."))
    }
};

//function for grabbing a user
export const getUser = async (req,res,next)=>{
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(error){
        next(error)
    }
};

//function to subscribe to user
export const subscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, { $push: { subscribedUsers: req.params.id } })
        await User.findByIdAndUpdate(req.params.id, { $inc: { subscribers: 1 }, })
        res.status(200).json("You are now subscribed!")
    } catch (error) {
        next(error)
    }
};

//function for unsubscribing to a user
export const unsubscribe = async (req,res,next)=>{
    try{
        await User.findByIdAndUpdate(req.user.id, { $pull: { subscribedUsers: req.params.id }})
        await User.findByIdAndUpdate(req.params.id, { $inc: { subscribers: -1 }, })
        res.status(200).json("You are now unsubscribed!")
    }catch(error){
        next(error)
    }
};

//like functionallity
export const like = async (req,res,next)=>{
    const id = req.user.id;
    const videoId = req.params.videoId;
    try{
        await Video.findByIdAndUpdate(videoId, { $addToSet: {likes:id}, $pull: {dislikes:id}})
        res.status(200).json("Video is now liked")
    }catch(error){
        next(error)
    }
};

//dislike functionallity
export const dislike = async (req,res,next)=>{
    const id = req.user.id;
    const videoId = req.params.videoId;
    try{
        await Video.findByIdAndUpdate(videoId, { $addToSet: {dislikes:id}, $pull: {likes:id}})
        res.status(200).json("Video is now disliked")
    }catch(error){
        next(error)
    }
};

export const watch = async (req,res,next)=>{
    const userId = req.user.id;
    const videoId = req.params.videoId;
    try{
        await User.findByIdAndUpdate(userId, { $addToSet: {history:videoId}})
        res.status(200).json("Video is now watched")
    }catch(error){
        next(error)
    }
};

export const watchLater = async (req,res,next)=>{
    const userId = req.user.id;
    const videoId = req.params.videoId;
    try{
        await User.findByIdAndUpdate(userId, { $addToSet: {watchLater:videoId}})
        res.status(200).json("Video is now watched")
    }catch(error){
        next(error)
    }
};

export const addTags = async (req,res,next)=>{
    const userId = req.user.id;
    const tags = req.params.tags.split(",");
    try{
        await User.findByIdAndUpdate(userId, { $addToSet: {pTags:tags}})
        res.status(200).json("Tags are now added")
    }catch(error){
        next(error)
    }
};

export const removeTags = async (req,res,next)=>{
    const userId = req.user.id;
    const tags = req.params.tags.split(",");
    try{
        await User.findByIdAndUpdate(userId, { $pull: {pTags:tags}})
        res.status(200).json("Tags are now removed")
    }catch(error){
        next(error)
    }
};