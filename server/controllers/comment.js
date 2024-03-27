import { createError } from "../error.js"
import Comment from "../models/Comment.js"
import Video from "../models/Video.js"

//adding comment function
export const addComment = async (req,res,next) =>{
    const newComment = new Comment({desc:req.body.input, videoId:req.body.videoId, userId:req.user.id})
    try{
        const savedComment = await newComment.save()
        res.status(200).send(savedComment)
    } catch(error) {
        next(error)
    }
}

//delete comment function
export const deleteComment = async (req,res,next) =>{
    try{
        const comment = await Comment.findById(res.params.id)
        const video = await Video.findById(res.params.id)
        //check for if the user owns the comment or video
        if(req.user.id === comment.userId || req.user.id === video.userId){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("The comment has been deleted.")
        }else{
            return next(createError(403, "You can only delete your comment."))
        }
    } catch(error) {
        next(error)
    }
}

//grab comments function
export const getComment = async (req,res,next) =>{
    try{
        const comments = await Comment.find({videoId: req.params.videoId})
        res.status(200).json(comments);
    } catch(error) {
        next(error)
    }
}