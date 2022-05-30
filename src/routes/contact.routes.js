import express from "express";
import * as contactController from "../controllers/contact.js";
import auth from "../middlewares/authUser.js";

const router = express.Router();

router.get("/", auth, contactController.getContacts);
router.post("/add", auth, contactController.createContact);
router.get("/:id", auth, contactController.getContact);

export default router;
