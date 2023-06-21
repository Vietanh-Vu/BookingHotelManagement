import express from "express";
import {
  getHotelsByName,
  getHotels,
  addHotel,
  updateHotel,
  deleteHotel,
  getUsers,
  deleteUser,
} from "../controllers/hotel.js";

const router = express.Router();

// get by name
router.get("/search/:name", getHotelsByName);

// getAll
router.get("/", getHotels);

// addHotel
router.post("/add", addHotel);

// update hotel
router.put("/update/:id", updateHotel);

// delete hotel
router.delete("/delete/:id", deleteHotel);

// getUsers
router.get("/listUser", getUsers);

// delete user
router.delete("/delete/:id", deleteUser);

export default router;
