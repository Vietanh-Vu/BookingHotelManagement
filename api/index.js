import express from "express";
import bodyParser from "body-parser";
import HotelRouter from "./routes/hotel.js";
import UserRouter from "./routes/user.js";
import RoomRouter from "./routes/room.js";
import AuthRouter from "./routes/auth.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import middlewareController from "./controllers/middleware.js";

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

///////////////////////////////////////////////////////////////////////////
// auth route
app.use("", AuthRouter);
///////////////////////////////////////////////////////////////////////////
// admin route
app.use("/admin/hotel", middlewareController.verifyToken, HotelRouter);
app.use("/admin/users", middlewareController.verifyToken, UserRouter);
app.use("/admin/hotel/rooms", middlewareController.verifyToken, RoomRouter);

// app.use("/admin/hotel", HotelRouter);
// app.use("/admin/users", UserRouter);
// app.use("/admin/hotel/rooms", RoomRouter);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
