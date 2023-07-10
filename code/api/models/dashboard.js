import { connect, sql } from "../connectDB.js";

class Dashboard {
  // revenue for the last 12 months
  static async revenueLast12Month(callback) {
    const pool = await connect;
    const sqlQuery =
      "SELECT * FROM dbo.Doanhthu_12_LATEST_MONTHS() AS DOANHTHU ORDER BY YEAR, MONTH";
    return await pool.request().query(sqlQuery, function (err, data) {
      if (data.recordset.length > 0) {
        callback(null, data.recordset);
      } else {
        callback(true, null);
      }
    });
  }

  // Last 1 month revenue of each type of hotel
  static async lastMonthRevenueCategory(callback) {
    const pool = await connect;
    const sqlQuery = "SELECT * FROM dbo.Doanhthu_CA_LATEST_MONTH()";
    return await pool.request().query(sqlQuery, function (err, data) {
      if (data.recordset.length > 0) {
        callback(null, data.recordset);
      } else {
        callback(true, null);
      }
    });
  }

  // Revenue of a hotel in the last 12 months
  static async hotelRevenueLast12Month(HotelId, callback) {
    const pool = await connect;
    const sqlQuery =
      "SELECT MONTH, YEAR, INCOME FROM dbo.Doanhthu_Hotel_12months(@HotelId) ORDER BY YEAR, MONTH";
    return await pool
      .request()
      .input("HotelId", sql.VarChar, HotelId)
      .query(sqlQuery, function (err, data) {
        if (data.recordset.length > 0) {
          callback(null, data.recordset);
        } else {
          callback(true, null);
        }
      });
  }

  // List the revenue of room types in the last 1 month
  static async lastMonthRevenueRoomType(callback) {
    const pool = await connect;
    const sqlQuery =
      "SELECT RoomTypeName, Doanhthu FROM dbo.Doanhthu_ALL_RT_1month()";
    return await pool.request().query(sqlQuery, function (err, data) {
      if (data.recordset.length > 0) {
        callback(null, data.recordset);
      } else {
        callback(true, null);
      }
    });
  }

  // Total monthly users of the hotel system in the last 12 months
  static async totalMonthlyUsersLast12Month(callback) {
    const pool = await connect;
    const sqlQuery = "SELECT * FROM dbo.USERS_12months() ORDER BY YEAR, MONTH";
    return await pool.request().query(sqlQuery, function (err, data) {
      if (data.recordset.length > 0) {
        callback(null, data.recordset);
      } else {
        callback(true, null);
      }
    });
  }

  // Total new users in each hotel last month
  static async totalNewUsersLastMonth(callback) {
    const pool = await connect;
    const sqlQuery = "SELECT * FROM dbo.GetNewUsersLastMonth()";
    return await pool.request().query(sqlQuery, function (err, data) {
      if (data.recordset.length > 0) {
        callback(null, data.recordset);
      } else {
        callback(true, null);
      }
    });
  }

  // Total old users in each hotel last month (user has at least 2 reservation)
  static async totalOldUsersLastMonth(callback) {
    const pool = await connect;
    const sqlQuery = "SELECT * FROM dbo.GetOLDUsersLastMonth()";
    return await pool.request().query(sqlQuery, function (err, data) {
      if (data.recordset.length > 0) {
        callback(null, data.recordset);
      } else {
        callback(true, null);
      }
    });
  }
}

export default Dashboard;
