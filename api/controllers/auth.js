import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AuthModels from "../models/auth.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

// dang ra phai dung redis nhung du an nay dung tam array de luu tru refresh token
let refreshTokens = [];
let returnData = {};

export const register = async (req, res) => {
  const userData = req.body;
  const hashPassword = await bcrypt.hash(userData.Password, 10);

  // Kiểm tra email trùng
  AuthModels.checkDupEmail(userData.Email, (err, data) => {
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
  // Authentication
  const userInput = req.body; // {Email, Password}
  // check valid email
  AuthModels.checkDupEmail(userInput.Email, async (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Login failed" });
    } else {
      if (data.length === 0) {
        return res.status(401).json({ error: "Invalid Email or Password" });
      } else {
        // return res.status(200).json(data);
        const isPasswordValid = await bcrypt.compare(
          userInput.Password,
          data.at(0).Password
        );
        if (isPasswordValid && data.at(0).IsAdmin) {
          // nếu đúng thì trả về jwt
          const { Password, ...dataWithoutPass } = data.at(0);
          returnData = dataWithoutPass;
          // refresh token key
          const refreshToken = jwt.sign(
            returnData,
            process.env.JWT_REFRESH_KEY,
            {
              expiresIn: "365d",
            }
          );
          // luu refresh token vao array
          refreshTokens.push(refreshToken);

          // luu refresh token vao cookies
          // res.cookie("refreshToken", refreshToken, {
          //   httpOnly: true,
          //   secure: false, // deploy chuyen thanh true
          //   sameSite: "strict",
          // });

          // luu refresh token vao localStorage
          localStorage.setItem("refreshToken", refreshToken);

          // access token key
          const accessToken = jwt.sign(returnData, process.env.JWT_ACCESS_KEY, {
            expiresIn: "30s",
          });
          res.json({ returnData, accessToken });
        } else {
          return res.status(401).json({
            message: "Invalid username or password or you are not admin.",
          });
        }
      }
    }
  });
};

export const requestRefreshToken = async (req, res) => {
  // lay refresh token tu user
  // const refreshToken = req.cookies.refreshToken;
  // console.log(req);
  // lay refresh token tu localStorage
  const refreshToken = localStorage.getItem("refreshToken");
  // console.log(req.cookies);
  if (!refreshToken) {
    return res.status(401).json({ status: "You are not authenticated!" });
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ status: "Refresh token is not valid." });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, data) => {
    if (err) {
      return res.status(403).json({ status: "Refresh token is not valid." });
    }
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    // tao access token va refresh token moi
    // refresh token key
    const newRefreshToken = jwt.sign(returnData, process.env.JWT_REFRESH_KEY, {
      expiresIn: "365d",
    });
    // luu refresh token vao array
    refreshTokens.push(newRefreshToken);

    // access token key
    const newAccessToken = jwt.sign(returnData, process.env.JWT_ACCESS_KEY, {
      expiresIn: "30s",
    });

    // luu refresh token vao cookies
    // res.cookie("refreshToken", newRefreshToken, {
    //   httpOnly: true,
    //   secure: false, // deploy chuyen thanh true
    //   sameSite: "strict",
    // });
    // luu refresh token vao localStorage
    localStorage.setItem("refreshToken", newRefreshToken);

    return res.status(200).json({ accessToken: newAccessToken });
  });
};

export const logout = async (req, res) => {
  const refreshToken = localStorage.getItem("refreshToken");
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  localStorage.removeItem("refreshToken");
  res.status(200).json({ status: "Successful Logout!" });
};

export default { register, login, requestRefreshToken, logout };
