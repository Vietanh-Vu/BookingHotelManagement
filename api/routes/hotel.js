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
router.get("/search", getHotelsByName);

// getAll
router.get("/", getHotels);

// addHotel
router.post("/add", addHotel);

// update hotel
router.put("/:id", updateHotel);

// delete hotel
router.delete("/:id", deleteHotel);

export default router;
