import express from "express";
import HotelModel from "../models/hotel.js";
import bodyParser from "body-parser";
// import { upload, imgUploadPath } from "../routes/uploadImg.js";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

// Xem danh sách khách sạn
export const getHotelsByName = (req, res) => {
  // Logic lấy danh sách khách sạn từ cơ sở dữ liệu
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

// Xem danh sách khách sạn
export const getHotels = (req, res) => {
  // Logic lấy danh sách khách sạn từ cơ sở dữ liệu
  HotelModel.getAll((err, hotels) => {
    if (err) {
      return res.status(500).json({
        error: "Đã xảy ra lỗi trong quá trình lấy danh sách khách sạn.",
      });
    }
    res.json(hotels);
  });
};

// gửi roomType
export const getCategory = (req, res) => {
  // Logic lấy danh sách khách sạn từ cơ sở dữ liệu
  HotelModel.getCategory((err, roomType) => {
    if (err) {
      return res.status(500).json({
        error: "Đã xảy ra lỗi trong quá trình lấy danh sách category.",
      });
    }
    res.json(roomType);
  });
};

// Thêm khách sạn
export const addHotel = (req, res) => {
  // Lấy thông tin khách sạn từ request body
  const hotelData = req.body;

  // Tiếp tục xử lý logic thêm khách sạn
  HotelModel.create(hotelData, (err, hotel) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi thêm khách sạn." });
    }
    res.json({ message: "Đã thêm thành công." });
  });
};

// Sửa khách sạn
export const updateHotel = (req, res) => {
  // Lấy ID khách sạn từ request params
  const hotelId = req.params.id;

  // Lấy thông tin khách sạn từ request body
  const hotelData = req.body;

  // Logic tìm và cập nhật khách sạn trong cơ sở dữ liệu
  HotelModel.update(hotelId, hotelData, (err, hotel) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Đã xảy ra lỗi trong quá trình sửa khách sạn." });
    }
    res.json({ message: "Đã sửa thành công." });
  });
};

// Xóa khách sạn và các phòng thuộc về khách sạn đó
export const deleteHotel = (req, res) => {
  // Lấy ID khách sạn từ request params
  const hotelId = req.params.id;

  // Logic tìm và xóa khách sạn trong cơ sở dữ liệu
  HotelModel.delete(hotelId, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Đã xảy ra lỗi trong quá trình xóa khách sạn." });
    }
    res.json({ message: "Xóa khách sạn thành công." });
  });
};

// xem danh sách user
export const getUsers = (req, res) => {
  // Logic lấy danh sách khách sạn từ cơ sở dữ liệu
  HotelModel.getAllUsers((err, users) => {
    if (err) {
      return res.status(500).json({
        error: "Đã xảy ra lỗi trong quá trình lấy danh sách user.",
      });
    }
    res.json(users);
  });
};

// tìm user theo tên
export const getUsersByName = (req, res) => {
  // Logic lấy danh sách user từ cơ sở dữ liệu
  HotelModel.getUserByName(req.params.name, (err, users) => {
    if (err) {
      return res.status(500).json({
        error:
          "Không tìm thấy user hoặc đã xảy ra lỗi trong quá trình lấy danh sách user.",
      });
    }
    res.json(users);
  });
};

// Xóa danh user
export const deleteUserAdmin = (req, res) => {
  // Lấy ID user từ request params
  const usersId = req.params.id;

  // Logic tìm và xóa khách sạn trong cơ sở dữ liệu
  HotelModel.deleteUser(usersId, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Đã xảy ra lỗi trong quá trình xóa admin." });
    }
    res.json({ message: "Xóa admin thành công." });
  });
};

export default {
  getHotelsByName,
  getHotels,
  addHotel,
  updateHotel,
  deleteHotel,
  getUsers,
  deleteUserAdmin,
  getCategory,
};
