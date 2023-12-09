import express from "express";
import {
  register,
  login,
  requestRefreshToken,
  logout,
} from "../controllers/auth.js";
import middlewareController from "../controllers/middleware.js";

const AuthRouter = express.Router();

AuthRouter.post("/register", register);

AuthRouter.post("/login", login);

AuthRouter.post("/refresh", requestRefreshToken);

AuthRouter.post("/logout", middlewareController.verifyToken, logout);

export default AuthRouter;
