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

// should use redis but this project uses temporary array to store refresh token
let refreshTokens = [];
let returnData = {};

export const register = async (req, res) => {
  const userData = req.body;
  const hashPassword = await bcrypt.hash(userData.Password, 10);

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
          // if true return jwt
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
          // store refresh token into array
          refreshTokens.push(refreshToken);

          // store refresh token into cookies
          // res.cookie("refreshToken", refreshToken, {
          //   httpOnly: true,
          //   secure: false, // deploy chuyen thanh true
          //   sameSite: "strict",
          // });

          // store refresh token into localStorage
          // localStorage.setItem("refreshToken", refreshToken);

          // access token key
          const accessToken = jwt.sign(returnData, process.env.JWT_ACCESS_KEY, {
            expiresIn: "30s",
          });
          return res.json({ returnData, accessToken, refreshToken });
        } else {
          return res.status(401).json({
            error: "Invalid username or password or you are not admin.",
          });
        }
      }
    }
  });
};

export const requestRefreshToken = async (req, res) => {
  // get refresh token from user
  // const refreshToken = req.cookies.refreshToken;
  // console.log(req);
  // get refresh token from localStorage
  const refreshToken = req.body.refreshToken;
  // console.log(req.cookies);
  if (!refreshToken) {
    return res.status(401).json({ status: "You are not authenticated!" });
  }

  if (!refreshTokens.includes(refreshToken)) {
    // console.log(refreshTokens);
    // console.log('--------------------------')
    // console.log(refreshToken)
    return res.status(403).json({ status: "Refresh token is not valid1." });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, data) => {
    if (err) {
      return res.status(403).json({ status: "Refresh token is not valid2." });
    }
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    // make new access token and refresh token
    // refresh token key
    const newRefreshToken = jwt.sign(returnData, process.env.JWT_REFRESH_KEY, {
      expiresIn: "365d",
    });
    // store refresh token into array
    refreshTokens.push(newRefreshToken);

    // access token key
    const newAccessToken = jwt.sign(returnData, process.env.JWT_ACCESS_KEY, {
      expiresIn: "30s",
    });

    // store refresh token into cookies
    // res.cookie("refreshToken", newRefreshToken, {
    //   httpOnly: true,
    //   secure: false, // deploy chuyen thanh true
    //   sameSite: "strict",
    // });
    // store refresh token into localStorage
    return res.status(200).json({ newAccessToken, newRefreshToken });
  });
};

export const logout = async (req, res) => {
  // res.clearCookie("refreshToken");
  refreshTokens = refreshTokens.filter(
    (token) => token !== req.body.refreshToken
  );
  res.status(200).json({ status: "Successful Logout!" });
};

export default { register, login, requestRefreshToken, logout };
