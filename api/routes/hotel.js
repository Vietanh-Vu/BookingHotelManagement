import express from "express";
import {
  getHotelsByName,
  getHotels,
  addHotel,
  updateHotel,
  deleteHotel,
  getUsers,
  deleteUserAdmin,
  getCategory,
  getUsersByName,
} from "../controllers/hotel.js";

const HotelRouter = express.Router();
const UserRouter = express.Router();

// get by name
HotelRouter.get("/search/:name", getHotelsByName);

// getAll
HotelRouter.get("/", getHotels);

// addHotel
HotelRouter.post("/add", addHotel);
HotelRouter.get("/add", getCategory);

// update hotel
HotelRouter.put("/update/:id", updateHotel);

// delete hotel
HotelRouter.delete("/delete/:id", deleteHotel);

// getUsers
UserRouter.get("/listUser", getUsers);

UserRouter.get("/listUser/search/:name", getUsersByName);

// delete user
UserRouter.delete("/delete/:id", deleteUserAdmin);

export { HotelRouter, UserRouter };
