import express from "express";
import {
  getHotelsByName,
  getHotels,
  addHotel,
  updateHotel,
  deleteHotel,
  getUsers,
  deleteUserAdmin,
  getUsersByName,
  getCategory,
} from "../controllers/hotel.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";

const HotelRouter = express.Router();
const UserRouter = express.Router();

// get by name
HotelRouter.get("/search/:name", getHotelsByName);

// getAll
HotelRouter.get("/", getHotels);

// addHotel
HotelRouter.post("/add", addHotel);

// upload image
// lấy đường dẫn tới thư mục hiện tại
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);
const imgUploadPath = path.join(currentDirPath, "../../img/"); // thư mục upload ảnh
console.log(imgUploadPath);
console.log(currentDirPath);
// Cấu hình multer để lưu trữ tệp ảnh được tải lên
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imgUploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

HotelRouter.post("/add/image", upload.single("myImage"), (req, res) => {
  if (req.file) {
    const file = req.file;
    const targetPath = path.join(imgUploadPath, file.filename);
    console.log(targetPath);

    // Di chuyển tệp đã tải lên vào thư mục img
    fs.rename(file.path, targetPath, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Lỗi khi lưu ảnh." });
      }
      res.json({ targetPath: targetPath });
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

// getUsers
UserRouter.get("/listUser", getUsers);

UserRouter.get("/listUser/search/:name", getUsersByName);

// delete user
UserRouter.delete("/delete/:id", deleteUserAdmin);

export { HotelRouter, UserRouter };
