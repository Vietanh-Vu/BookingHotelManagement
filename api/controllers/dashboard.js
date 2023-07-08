import express from "express";
import Dashboard from "../models/dashboard.js";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

export const revenueLast12Month = (req, res) => {
  Dashboard.revenueLast12Month((err, data) => {
    if (err) {
      return res.status(500).json({
        error: "Không tìm thấy dữ liệu doanh thu 12 tháng gần nhất.",
      });
    }
    res.json(data);
  });
};

export const lastMonthRevenueCategory = (req, res) => {
  Dashboard.lastMonthRevenueCategory((err, data) => {
    if (err) {
      return res.status(500).json({
        error:
          "Không tìm thấy dữ liệu doanh thu tháng gần nhất của từng loại khách sạn.",
      });
    }
    res.json(data);
  });
};

export const hotelRevenueLast12Month = (req, res) => {
  const HotelId = req.params.id;
  Dashboard.hotelRevenueLast12Month(HotelId, (err, data) => {
    if (err) {
      return res.status(500).json({
        error: "Không tìm thấy dữ liệu doanh thu của khách sạn.",
      });
    }
    res.json(data);
  });
};

export const lastMonthRevenueRoomType = (req, res) => {
  Dashboard.lastMonthRevenueRoomType((err, data) => {
    if (err) {
      return res.status(500).json({
        error:
          "Không tìm thấy dữ liệu doanh thu tháng gần nhất của từng loại phòng.",
      });
    }
    res.json(data);
  });
};

export const totalMonthlyUsersLast12Month = (req, res) => {
  Dashboard.totalMonthlyUsersLast12Month((err, data) => {
    if (err) {
      return res.status(500).json({
        error: "Không tìm thấy dữ liệu tổng user trong 12 tháng gần nhất.",
      });
    }
    res.json(data);
  });
};

export const totalNewUsersLastMonth = (req, res) => {
  Dashboard.totalNewUsersLastMonth((err, data) => {
    if (err) {
      return res.status(500).json({
        error:
          "Không tìm thấy dữ liệu tổng user mới ở tháng trước của từng khách sạn.",
      });
    }
    res.json(data);
  });
};

export const totalOldUsersLastMonth = (req, res) => {
  Dashboard.totalOldUsersLastMonth((err, data) => {
    if (err) {
      return res.status(500).json({
        error:
          "Không tìm thấy dữ liệu tổng user cũ tháng trước của từng khách sạn.",
      });
    }
    res.json(data);
  });
};
