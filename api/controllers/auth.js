import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthModels from "../models/auth.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

export const register = async (req, res) => {
  const userData = req.body;
  const hashPassword = await bcrypt.hash(userData.Password, 10);

  // Kiểm tra email trùng
  AuthModels.checkDupEmail(userData, hashPassword, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Registration failed" });
    } else {
      if (data.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      } else {
        AuthModels.register(userData, hashPassword, (err, data) => {
          if (err) {
            return res.status(500).json({ error: "Registration failed" });
          }
          res.json({ message: "Registration successful" });
        });
      }
    }
  });
};

export const login = async (req, res) => {
  const userInput = req.body; // {email, password}
  // Tìm người dùng trong cơ sở dữ liệu dựa trên email
};

export default { register, login };
