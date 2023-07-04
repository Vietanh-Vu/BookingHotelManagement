import express from "express";
import {
  getRoomsByHotel,
  addRoom,
  updateRoom,
  deleteRoom,
  getRoomType,
} from "../controllers/room.js";

const RoomRouter = express.Router();

// get room type
RoomRouter.get("/", getRoomType);

// get room by hotel
RoomRouter.get("/:hotelId", getRoomsByHotel);

// add room
RoomRouter.post("/:hotelId", addRoom);

// update room
RoomRouter.put("/update/:roomId", updateRoom);

// delete room
RoomRouter.delete("/delete/:roomId", deleteRoom);

export default RoomRouter;
