import express from "express";
import HotelModel from "../models/hotel.js";
import bodyParser from "body-parser";
// import { upload, imgUploadPath } from "../routes/uploadImg.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

// See hotel list
export const getHotelsByName = (req, res) => {
  HotelModel.getHotelByName(req.params.name, (err, hotels) => {
    if (err) {
      return res.status(500).json({
        error:
          "Không tìm thấy khách sạn hoặc đã xảy ra lỗi trong quá trình lấy danh sách khách sạn.",
      });
    }
    res.json(hotels);
  });
};

export const getHotels = (req, res) => {
  HotelModel.getAll((err, hotels) => {
    if (err) {
      return res.status(500).json({
        error: "Đã xảy ra lỗi trong quá trình lấy danh sách khách sạn.",
      });
    }
    res.json(hotels);
  });
};

// send category
export const getCategory = (req, res) => {
  HotelModel.getCategory((err, roomType) => {
    if (err) {
      return res.status(500).json({
        error: "Đã xảy ra lỗi trong quá trình lấy danh sách category.",
      });
    }
    res.json(roomType);
  });
};

export const addHotel = (req, res) => {
  // Get hotel information from request body
  const hotelData = req.body;

  HotelModel.create(hotelData, (err, hotel) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi thêm khách sạn." });
    }
    res.json({ message: "Đã thêm thành công." });
  });
};

export const updateHotel = (req, res) => {
  // Get hotel ID from request params
  const hotelId = req.params.id;

  // Get hotel information from request body
  const hotelData = req.body;

  HotelModel.update(hotelId, hotelData, (err, hotel) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Đã xảy ra lỗi trong quá trình sửa khách sạn." });
    }
    res.json({ message: "Đã sửa thành công." });
  });
};

// // Delete the hotel and the rooms belonging to that hotel
export const deleteHotel = (req, res) => {
  // Get hotel ID from request params
  const hotelId = req.params.id;

  HotelModel.delete(hotelId, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Đã xảy ra lỗi trong quá trình xóa khách sạn." });
    }
    res.json({ message: "Xóa khách sạn thành công." });
  });
};

export default {
  getHotelsByName,
  getHotels,
  addHotel,
  updateHotel,
  deleteHotel,
  getCategory,
};
