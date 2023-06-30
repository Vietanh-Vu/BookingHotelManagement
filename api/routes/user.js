import express from "express";
import {
  getUsers,
  getUsersByName,
  deleteUserAdmin,
  setUserAdmin,
} from "../controllers/user.js";

const UserRouter = express.Router();

// getUsers
UserRouter.get("/", getUsers);

UserRouter.get("/search/:name", getUsersByName);

// delete user
UserRouter.put("/delete/:id", deleteUserAdmin);

// set user admin
UserRouter.put("/set/:id", setUserAdmin);

export default UserRouter;
