import RoomModel from "../models/room.js";
import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Xem danh sách phòng trong một khách sạn
export const getRoomsByHotel = (req, res) => {
  // Lấy ID khách sạn từ request params
  const hotelId = req.params.hotelId;

  // Logic lấy danh sách phòng trong khách sạn từ cơ sở dữ liệu
  RoomModel.getByHotel(hotelId, (err, rooms) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Đã xảy ra lỗi trong quá trình lấy danh sách phòng." });
    }
    res.json(rooms);
  });
};

// Thêm phòng vào khách sạn
export const addRoom = (req, res) => {
  // Lấy ID khách sạn từ request params
  const hotelId = req.params.hotelId;

  // Lấy thông tin phòng từ request body
  const roomData = req.body;

  // Logic thêm phòng vào khách sạn trong cơ sở dữ liệu
  RoomModel.create(hotelId, roomData, (err, room) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Đã xảy ra lỗi trong quá trình thêm phòng." });
    }
    res.json({ status: "Đã thêm phòng thành công." });
  });
};

// Sửa thông tin phòng
export const updateRoom = (req, res) => {
  // Lấy ID phòng từ request params
  const roomId = req.params.roomId;

  // Lấy thông tin phòng từ request body
  const roomData = req.body;

  // Logic tìm và cập nhật phòng trong cơ sở dữ liệu
  RoomModel.update(roomId, roomData, (err, room) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Đã xảy ra lỗi trong quá trình sửa phòng." });
    }
    res.json({ status: "Đã sửa phòng thành công." });
  });
};

// Xóa phòng
export const deleteRoom = (req, res) => {
  // Lấy ID phòng từ request params
  const roomId = req.params.roomId;

  // Logic tìm và xóa phòng trong cơ sở dữ liệu
  RoomModel.delete(roomId, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Đã xảy ra lỗi trong quá trình xóa phòng." });
    }
    res.json({ status: "Xóa phòng thành công." });
  });
};

export default {
  getRoomsByHotel,
  addRoom,
  updateRoom,
  deleteRoom,
};
