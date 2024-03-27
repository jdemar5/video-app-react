import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"

//setting up connection to mongoDB 
dotenv.config();
const myApp = express();
const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("Connected to DB");
    }).catch((error) => {
        throw error;
    });
};

//tools for API use
myApp.use(cookieParser())
myApp.use(express.json())

//Using the different routes for the api
myApp.use("/api/users", userRoutes)
myApp.use("/api/videos", videoRoutes)
myApp.use("/api/comments", commentRoutes)
myApp.use("/api/auth", authRoutes)

//Using specific error handling 
myApp.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})


//setting up connection to server
myApp.listen(8800, () => {
    connect()
    console.log("Connected to Server");
})