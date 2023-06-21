import express from "express";
import {
  getHotelsByName,
  getHotels,
  addHotel,
  updateHotel,
  deleteHotel,
  getUsers,
  deleteUserAdmin,
} from "../controllers/hotel.js";

const HotelRouter = express.Router();
const UserRouter = express.Router();

// get by name
HotelRouter.get("/search/:name", getHotelsByName);

// getAll
HotelRouter.get("/", getHotels);

// addHotel
HotelRouter.post("/add", addHotel);

// update hotel
HotelRouter.put("/update/:id", updateHotel);

// delete hotel
HotelRouter.delete("/delete/:id", deleteHotel);

// getUsers
UserRouter.get("/listUser", getUsers);

// delete user
UserRouter.delete("/delete/:id", deleteUserAdmin);

export { HotelRouter, UserRouter };
