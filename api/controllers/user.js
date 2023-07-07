import express from "express";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.js";
import AuthModels from "../models/auth.js";

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

// Xóa user admin
export const deleteUserAdmin = (req, res) => {
  // Lấy ID user từ request params
  const usersId = req.params.id;

  // Logic tìm và xóa khách sạn trong cơ sở dữ liệu
  UserModel.deleteUserAdmin(usersId, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Đã xảy ra lỗi trong quá trình xóa admin." });
    }
    res.json({ message: "Xóa admin thành công." });
  });
};

// set user to admin
export const setUserAdmin = (req, res) => {
  // Lấy ID user từ request params
  const usersId = req.params.id;

  // Logic tìm và xóa khách sạn trong cơ sở dữ liệu
  UserModel.setUserAdmin(usersId, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Đã xảy ra lỗi trong quá trình set admin." });
    }
    res.json({ message: "Set admin thành công." });
  });
};

// xem lich su user
export const historyUser = (req, res) => {
  const UsersId = req.params.id;
  UserModel.history(UsersId, (err, data) => {
    if (err) {
      return res.status(500).json({
        error: "Đã xảy ra lỗi trong quá trình lấy lich su user.",
      });
    }
    res.json(data);
  });
};

export const updateUser = async (req, res) => {
  const userData = req.body;
  const hashPassword = await bcrypt.hash(userData.Password, 10);
  // logic: check input user email,
  // if user not change the email => update (not checkDupEmail)
  // else checkDupEmail then update

  // kiem tra xem email user nhap vao co phai email moi hay ko
  UserModel.findUserById(userData.UsersId, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Update failed" });
    } else if (data.at(0).Email === userData.Email) {
      //  true => user khong doi mail, bo qua checkDupEmail, tien hanh update
      UserModel.update(userData, hashPassword, (err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Đã xảy ra lỗi trong quá trình sửa user." });
        }
        res.json({ message: "Đã sửa thành công." });
      });
    } else {
      // Kiểm tra email trùng
      AuthModels.checkDupEmail(userData.Email, (err, data) => {
        if (err) {
          return res.status(500).json({ error: "Update failed" });
        } else {
          if (data.length > 0) {
            return res.status(400).json({ error: "Email already exists" });
          } else {
            // ko trung thi tien hanh update
            UserModel.update(userData, hashPassword, (err, data) => {
              if (err) {
                return res
                  .status(500)
                  .json({ error: "Đã xảy ra lỗi trong quá trình sửa user." });
              }
              res.json({ message: "Đã sửa thành công." });
            });
          }
        }
      });
    }
  });
};

export default {
  getUsers,
  getUsersByName,
  deleteUserAdmin,
  setUserAdmin,
  historyUser,
  updateUser,
};
