import mongoose from "mongoose"
//creating structure for users in mongo db
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    img: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/video-64c39.appspot.com/o/Default_pfp.png?alt=media&token=01f40067-6e30-4b0e-9c46-d4ab7424af48"
    },
    banner: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/video-64c39.appspot.com/o/Default_banner.jpg?alt=media&token=d8a61ba6-eef9-47b0-9f5d-06da12e0a396"
    },
    about: {
        type: String,
    },
    subscribers:{
        type: Number,
        default: 0
    },
    subscribedUsers:{
        type: [String]
    },
    fromGoogle:{
        type:Boolean,
        default:false,
    },
    pTags:{
        type: [String]
    },
    history:{
        type: [String],
        default: [],
    },
    watchLater:{
        type: [String],
        default: [],
    },
    
},
{ timestamps: true }
);

export default mongoose.model("User", UserSchema)