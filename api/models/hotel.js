import { connect, sql } from "../connectDB.js";

class HotelModel {
  // Tìm khách sạn theo tên
  static async getByName(stringName, callback) {
    // Logic kết nối và truy vấn cơ sở dữ liệu SQL Server để lấy danh sách khách sạn
    const pool = await connect;
    const sqlQuery = "SELECT * FROM Hotel WHERE HotelName Like '%@name%'";
    return await pool
      .request()
      .input("name", sql.VarChar(128), stringName)
      .query(sqlQuery, function (err, data) {
        if (data.recordset.length > 0) {
          callback(null, data.recordset);
        } else {
          callback(true, null);
        }
      });
  }
  // Lấy danh sách khách sạn
  static async getAll(callback) {
    // Logic kết nối và truy vấn cơ sở dữ liệu SQL Server để lấy danh sách khách sạn
    const pool = await connect;
    const sqlQuery = "SELECT * FROM Hotel";
    return await pool.request().query(sqlQuery, function (err, data) {
      if (data.recordset.length > 0) {
        callback(null, data.recordset);
      } else {
        callback(true, null);
      }
    });
  }

  // Thêm khách sạn
  static async create(hotelData, callback) {
    // Logic kết nối và truy vấn cơ sở dữ liệu SQL Server để thêm khách sạn
    var pool = await connect;
    const sqlQuery = "INSERT INTO Hotel () VALUES (@, @, @, @)";
    return await pool
      .request()
      .input()
      .query(sqlQuery, function (err, data) {
        if (err) {
          callback(true, null);
        } else {
          callback(null, data);
        }
      });
  }

  // Sửa khách sạn
  static async update(hotelId, hotelData, callback) {
    // Logic kết nối và truy vấn cơ sở dữ liệu SQL Server để sửa khách sạn
    const pool = await connect;
    let sqlQuery =
      "UPDATE Hotel SET Name = @name, Email = @email, Phone = @phone WHERE ID = @id";
    const result = await pool
      .request()
      .input("id", sql.NVarChar, hotelId)
      .input("name", sql.NVarChar, hotelData.name)
      .input("email", sql.NVarChar, hotelData.email)
      .input("phone", sql.VarChar, hotelData.phone)
      .query(sqlQuery, (err, data) => {
        if (err) {
          callback(true, null);
        } else {
          callback(null, data);
        }
      });
  }

  // Xóa khách sạn
  static async deleteHotel(hotelId, callback) {
    // Logic kết nối và truy vấn cơ sở dữ liệu SQL Server để xóa khách sạn
    const pool = await connect;
    let sqlQuery = "DELETE FROM Hotel WHERE ID = @id";
    const result = await pool
      .request()
      .input("id", sql.Int, Number(hotelId))
      .query(sqlQuery, (err, data) => {
        if (err) {
          callback(true, null);
        } else {
          callback(null, data);
        }
      });
  }
}

export default HotelModel;
