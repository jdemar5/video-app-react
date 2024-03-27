import Video from "../models/Video.js"
import User from "../models/User.js"
import { createError } from "../error.js"

//function for adding a video
export const addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try {
        const savedVideo = await newVideo.save()
        res.status(200).json(savedVideo)
    } catch (error) {
        next(error)
    }
}

//function for updating a video
export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404, "Video not found."))
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate( req.params.id, { $set: req.body, }, { new: true });
            res.status(200).json(updatedVideo)
        } else {
            return next(createError(403, "You can only update your video."))
        }
    } catch (error) {
        next(error)
    }
}

//delete video functiom
export const deleteVideo = async (req,res,next)=>{
    try{
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found."));
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete( req.params.id, );
            res.status(200).json("The video is now deleted.")
        } else {
            return next(createError(403, "You can only delete your video."))
        }
    }catch(error){
        next(error)
    }
}

//getting single video function
export const getVideo = async (req,res,next)=>{
    try{
        const video = await Video.findById(req.params.id);
        res.status(200).json(video)
    }catch(error){
        next(error)
    }
}

//function fro increasing view count
export const addView = async (req,res,next)=>{
    try{
        await Video.findByIdAndUpdate(req.params.id, { $inc:{views:1}})
        res.status(200).json("view increased")
    }catch(error){
        next(error)
    }
}

//function for grabbing a few random videos
export const random = async (req,res,next)=>{
    try{
        const videos = await Video.aggregate([{ $sample: { size: 40 }}]);
        res.status(200).json(videos);
    }catch(error){
        next(error);
    }
}

//function to grab trending videos
export const trend = async (req,res,next)=>{
    try{
        //trend is desided by view count
        const videos = await Video.find().sort ({ views:-1 });
        res.status(200).json(videos);
    }catch(error){
        next(error);
    }
}

//function to subscribe to user from video
export const sub = async (req,res,next)=>{
    try{
        const user = await User.findById(req.user.id);
        const subbedChannels = user.subscribedUsers;
        const list = await Promise.all(subbedChannels.map((channelId)=>{
                return Video.find({userId: channelId});
            })
        );

        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    }catch(err){
        next(err)
    }
}

//search for videos via tags
export const getByTag = async (req,res,next)=>{
    const tags = req.query.tags.split(",");
    try{
        const videos = await Video.find({tags: { $in: tags }}).limit(20);
        res.status(200).json(videos);
    }catch(err){
        next(err);
    }
}

export const getByLike = async (req,res,next)=>{
    const like = req.query.like;
    try{
        const videos = await Video.find({likes: { $in: like }}).limit(20);
        res.status(200).json(videos);
    }catch(err){
        next(err);
    }
}

export const getByAuth = async (req,res,next)=>{
    const auth = req.query.auth;
    try{
        const videos = await Video.find({userId: auth}).limit(20);
        res.status(200).json(videos);
    }catch(err){
        next(err);
    }
}

export const getAuthPop = async (req,res,next)=>{
    const auth = req.query.auth;
    try{
        const videos = await Video.find({userId: auth}).sort ({ views:-1 }).limit(20);
        res.status(200).json(videos);
    }catch(err){
        next(err);
    }
}

export const getAuthLatest = async (req,res,next)=>{
    const auth = req.query.auth;
    try{
        const videos = await Video.find({userId: auth}).limit(20);
        res.status(200).json(videos.sort((a, b) => b.createdAt - a.createdAt));
    }catch(err){
        next(err);
    }
}

export const getAuthOldest = async (req,res,next)=>{
    const auth = req.query.auth;
    try{
        const videos = await Video.find({userId: auth}).limit(20);
        res.status(200).json(videos.sort((a, b) => a.createdAt - b.createdAt));
    }catch(err){
        next(err);
    }
}

export const getByHist = async (req,res,next)=>{
    try{
        const user = await User.findById(req.query.history);
        const history = user.history;
        const list = await Promise.all(history.map((videoId)=>{
                return Video.findById(videoId);
            })
        );
        res.status(200).json(list);
    }catch(err){
        next(err)
    }
}

export const getByWL = async (req,res,next)=>{
    try{
        const user = await User.findById(req.query.watchLater);
        const WL = user.watchLater;
        const list = await Promise.all(WL.map((videoId)=>{
                return Video.findById(videoId);
            })
        );
        res.status(200).json(list);
    }catch(err){
        next(err)
    }
}


//search for videos via searchbar
export const search = async (req,res,next)=>{
    const query = req.query.q
    try{
        const videos = await Video.find({title: {$regex: query, $options: "i" }}).limit(40);
        res.status(200).json(videos);
    }catch(err){
        next(err);
    }
}