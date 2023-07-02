import express from "express";
import bodyParser from "body-parser";
import HotelRouter from "./routes/hotel.js";
import UserRouter from "./routes/user.js";
import RoomRouter from "./routes/room.js";
import AuthRouter from "./routes/auth.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

///////////////////////////////////////////////////////////////////////////
// admin route
app.use("/admin/hotel", HotelRouter);
app.use("/admin/users", UserRouter);
app.use("/admin/hotel/rooms", RoomRouter);

///////////////////////////////////////////////////////////////////////////
// auth route
app.use("", AuthRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
