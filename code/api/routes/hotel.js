import express from "express";
import { v4 as uuidv4 } from "uuid";
import {
  getHotelsByName,
  getHotels,
  addHotel,
  updateHotel,
  deleteHotel,
  getCategory,
} from "../controllers/hotel.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";

const HotelRouter = express.Router();

// get by name
HotelRouter.get("/search/:name", getHotelsByName);

// getAll
HotelRouter.get("/", getHotels);

// addHotel
HotelRouter.post("/add", addHotel);

// upload image
// get current directory
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);
const imgUploadPath = path.join(currentDirPath, "../../img/"); // folder used to upload images is ./img/
// console.log(imgUploadPath);
// console.log(currentDirPath);
// Cấu hình multer để lưu trữ tệp ảnh được tải lên
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imgUploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}.jpg`);
  },
});

const upload = multer({ storage: storage });

HotelRouter.post("/add/image", upload.single("myImage"), (req, res) => {
  const newAccessToken = req.headers.token;
  if (req.file) {
    const file = req.file;
    const targetPath = path.join(imgUploadPath, file.filename);
    // console.log(targetPath);

    // Move uploaded file to img folder
    fs.rename(file.path, targetPath, (err) => {
      if (err) {
        // console.log(err);
        return res.status(500).json({ error: "Lỗi khi lưu ảnh." });
      }
      res.json({ nameFile: file.filename, newAccessToken: newAccessToken });
    });
  } else {
    res.json({ error: "Không có ảnh." });
  }
});

// getCategory
HotelRouter.get("/add", getCategory);

// update hotel
HotelRouter.put("/update/:id", updateHotel);

// delete hotel
HotelRouter.delete("/delete/:id", deleteHotel);

export default HotelRouter;
