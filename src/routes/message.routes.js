import express from "express";
import * as messageController from "../controllers/message.js";
import auth from "../middlewares/authUser.js";

const router = express.Router();

router.post("/otp", auth, messageController.sendOtp);
router.post("/send", auth, messageController.sendMsg);
router.get("/", auth, messageController.getMessages);

export default router;
