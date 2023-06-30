import express from "express";
import {
  getUsers,
  deleteUserAdmin,
  getUsersByName,
} from "../controllers/user.js";

const UserRouter = express.Router();

// getUsers
UserRouter.get("/listUser", getUsers);

UserRouter.get("/listUser/search/:name", getUsersByName);

// delete user
UserRouter.delete("/delete/:id", deleteUserAdmin);

export default UserRouter;
