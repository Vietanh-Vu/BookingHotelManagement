import express from "express";
import {
  getHotelsByName,
  getHotels,
  addHotel,
  updateHotel,
  deleteHotel,
} from "../controllers/hotel.js";

const router = express.Router();

// get by name
router.get("/find", getHotelsByName);

// getAll
router.get("/", getHotels);

// addHotel
router.post("/", addHotel);

// update hotel
router.put("/:id", updateHotel);

// delete hotel
router.delete("/:id", deleteHotel);

export default router;
