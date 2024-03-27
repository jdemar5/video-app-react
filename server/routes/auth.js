import  Express from "express";
import {  } from "../controllers/comment.js";
import { googleAuth, signin, signup } from "../controllers/auth.js";


const router = Express.Router()
//different api routes for signing up and login methods
router.post("/signup", signup)
router.post("/signin", signin)
router.post("/google", googleAuth)

export default router;