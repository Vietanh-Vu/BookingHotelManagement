import jwt from "jsonwebtoken";
import express from "express";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

const middlewareController = {
  // Verify token
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      // 'Beaer [token]'
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, data) => {
        if (err) {
          return res.status(403).json({ status: "Token is not valid!" });
        }
        next();
      });
    } else {
      return res.status(401).json({ status: "You are not authenticated!" });
    }
  },
};

export default middlewareController;
