import express from "express";
import { getEvents, addEvent, deleteEvent, updateEvent } from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/", addEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
