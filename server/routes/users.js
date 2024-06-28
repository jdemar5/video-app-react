import  Express from "express";
import { update, deleteUser, subscribe, unsubscribe, like, dislike, getUser, watch, addTags, removeTags, watchLater } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = Express.Router()
//routes for each user function
router.put("/update/", verifyToken, update)
router.delete("/:id", verifyToken, deleteUser)
router.get("/find/:id", getUser)
router.put("/sub/:id", verifyToken, subscribe)
router.put("/unsub/:id", verifyToken, unsubscribe)
router.put("/like/:videoId", verifyToken, like)
router.put("/dislike/:videoId", verifyToken, dislike)
router.put("/watch/:videoId", verifyToken, watch)
router.put("/watchLater/:videoId", verifyToken, watchLater)
router.put("/addTags/:tags", verifyToken, addTags)
router.put("/removeTags/:tags", verifyToken, removeTags)

export default router;