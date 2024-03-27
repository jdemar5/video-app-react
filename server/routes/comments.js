import  Express from "express";
import { addComment, deleteComment, getComment } from "../controllers/comment.js";
import { verifyToken } from "../verifyToken.js";


const router = Express.Router()
//routes to each comment function
router.post("/", verifyToken, addComment)
router.post("/:id", verifyToken, deleteComment)
router.get("/:videoId", getComment)


export default router;