import express from "express";
import HotelModel from "../models/hotel.js";

const app = express();

// Xem danh sách khách sạn
export const getHotelsByName = (req, res) => {
  // Logic lấy danh sách khách sạn từ cơ sở dữ liệu
  HotelModel.getByName(req.body, (err, hotels) => {
    if (err) {
      return res.status(500).json({
        error: "Đã xảy ra lỗi trong quá trình lấy danh sách khách sạn.",
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

// Thêm khách sạn
export const addHotel = (req, res) => {
  // Lấy thông tin khách sạn từ request body
  const hotelData = req.body;

  // Logic thêm khách sạn vào cơ sở dữ liệu
  HotelModel.create(hotelData, (err, hotel) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Đã xảy ra lỗi trong quá trình thêm khách sạn." });
    }
    res.json(hotel);
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
    res.json(hotel);
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

export default {
  getHotelsByName,
  getHotels,
  addHotel,
  updateHotel,
  deleteHotel,
};
