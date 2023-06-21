import express from "express";
import bodyParser from "body-parser";
import hotelsRoute from "./routes/hotel.js";
// import {} from "./routes/hotel.js"
// import usersRoute from "./routes/user.js";
import roomsRoute from "./routes/room.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/admin/hotel", hotelsRoute);
app.use("/admin/users", hotelsRoute);
app.use("/admin/hotel/rooms", roomsRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
