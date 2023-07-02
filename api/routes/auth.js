import express from "express";
import { register, login } from "../controllers/auth.js";

const AuthRouter = express.Router();

AuthRouter.post("/register", register);

export default AuthRouter;
