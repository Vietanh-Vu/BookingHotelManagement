import express from "express";
import UserModel from "../models/user.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

// xem danh sách user
export const getUsers = (req, res) => {
  // Logic lấy danh sách khách sạn từ cơ sở dữ liệu
  UserModel.getAllUsers((err, users) => {
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
  UserModel.getUserByName(req.params.name, (err, users) => {
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
  UserModel.deleteUser(usersId, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Đã xảy ra lỗi trong quá trình xóa admin." });
    }
    res.json({ message: "Xóa admin thành công." });
  });
};

export default { getUsers, deleteUserAdmin, getUsersByName };
