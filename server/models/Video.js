import mongoose from "mongoose"
//creating structure for videos in mongo db
const VideoSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required: true,
    },
    imgUrl:{
        type: String,
        required: true,
    },
    videoUrl:{
        type: String,
        required: true,
    },
    views:{
        type: Number,
        default: 0,
    },
    tags:{
        type: [String],
        default: [],
    },
    likes:{
        type: [String],
        default: [],
    },
    dislikes:{
        type: [String],
        default: [],
    },
    duration:{
        type: String,
        required: true,
    },
},
{ timestamps: true }
);

export default mongoose.model("Video", VideoSchema)