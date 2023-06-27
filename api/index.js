import express from "express";
import bodyParser from "body-parser";
import { HotelRouter, UserRouter } from "./routes/hotel.js";
import RoomRouter from "./routes/room.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// admin route
app.use("/admin/hotel", HotelRouter);
app.use("/admin/users", UserRouter);
app.use("/admin/hotel/rooms", RoomRouter);

// user route
// hien thi hotel, tim hotel theo ten
app.use("/user/hotel", (req, res, next) => {
  if (
    req.method === "GET" &&
    (req.path.startsWith("/search/") || req.path.startsWith("/"))
  ) {
    // Chỉ cho phép người dùng truy cập vào các route getHotelsByName và getHotels
    HotelRouter(req, res, next);
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
});

// tim room trong khach san
app.use("/user/hotel/room", (req, res, next) => {
  if (req.method === "GET" && req.url === "/:hotelId") {
    // Chỉ cho phép người dùng truy cập vào các route getRoomsByHotel
    RoomRouter(req, res, next);
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
