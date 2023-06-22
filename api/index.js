import express from "express";
import bodyParser from "body-parser";
import { HotelRouter, UserRouter } from "./routes/hotel.js";
import roomsRoute from "./routes/room.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/admin/hotel", HotelRouter);
app.use("/admin/users", UserRouter);
app.use("/admin/hotel/rooms", roomsRoute);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
