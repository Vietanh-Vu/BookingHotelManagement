import RoomModel from "../models/room.js";
import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// send roomType
export const getRoomType = (req, res) => {
  RoomModel.getRoomType((err, roomType) => {
    if (err) {
      return res.status(500).json({
        error: "Đã xảy ra lỗi trong quá trình lấy danh sách room type.",
      });
    }
    res.json(roomType);
  });
};

export const getRoomsByHotel = (req, res) => {
  const hotelId = req.params.hotelId;

  RoomModel.getByHotel(hotelId, (err, rooms) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Đã xảy ra lỗi trong quá trình lấy danh sách phòng." });
    }
    res.json(rooms);
  });
};

export const addRoom = (req, res) => {
  const hotelId = req.params.hotelId;

  const roomData = req.body;

  RoomModel.create(hotelId, roomData, (err, room) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Đã xảy ra lỗi trong quá trình thêm phòng." });
    }
    res.json({ message: "Đã thêm phòng thành công." });
  });
};

export const updateRoom = (req, res) => {
  const roomId = req.params.roomId;

  const roomData = req.body;

  RoomModel.update(roomId, roomData, (err, room) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Đã xảy ra lỗi trong quá trình sửa phòng." });
    }
    res.json({ message: "Đã sửa phòng thành công." });
  });
};

export const deleteRoom = (req, res) => {
  const roomId = req.params.roomId;

  RoomModel.delete(roomId, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Đã xảy ra lỗi trong quá trình xóa phòng." });
    }
    res.json({ message: "Xóa phòng thành công." });
  });
};

export const historyRoom = (req, res) => {
  const roomId = req.params.roomId;
  RoomModel.history(roomId, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Đã xảy ra lỗi trong quá trình lay lich su phong." });
    }
    res.json(data);
  });
};

export default {
  getRoomsByHotel,
  addRoom,
  updateRoom,
  deleteRoom,
  getRoomType,
};
