import  Express from "express";
import { addVideo, addView, getByAuth, getByTag, getByLike, getVideo, random, search, sub, trend, getByHist, getByWL, getAuthPop, getAuthLatest, getAuthOldest } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = Express.Router()
//routes for all video functions
router.post("/", verifyToken, addVideo)
router.put("/:id", verifyToken, addVideo)
router.delete("/:id", verifyToken, addVideo)
router.get("/find/:id", getVideo)
router.put("/view/:id", addView)
router.get("/trend", trend)
router.get("/random", random)
router.get("/sub", verifyToken, sub)
router.get("/tags", getByTag)
router.get("/auth", getByAuth)
router.get("/popular", getAuthPop)
router.get("/latest", getAuthLatest)
router.get("/oldest", getAuthOldest)
router.get("/like", getByLike)
router.get("/history", getByHist)
router.get("/watchLater", getByWL)
router.get("/search", search)

export default router;