import express from "express";
import {
  getUsers,
  getUsersByName,
  deleteUserAdmin,
  setUserAdmin,
  historyUser,
  updateUser,
} from "../controllers/user.js";

const UserRouter = express.Router();

// getUsers
UserRouter.get("/", getUsers);

UserRouter.get("/search/:name", getUsersByName);

// delete user
UserRouter.put("/delete/:id", deleteUserAdmin);

// set user admin
UserRouter.put("/set/:id", setUserAdmin);

// history user
UserRouter.get("/history/:id", historyUser);

// update user
UserRouter.put("/update/:id", updateUser);

export default UserRouter;
