import { connect, sql } from "../connectDB.js";

class HotelModel {
  // Tìm khách sạn theo tên
  static async getByName(stringName, callback) {
    // Logic kết nối và truy vấn cơ sở dữ liệu SQL Server để lấy danh sách khách sạn
    const pool = await connect;
    const sqlQuery =
      "SELECT * FROM Hotel WHERE HotelName LIKE '%' + @name + '%'";
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
    const sqlQuery = `SELECT * 
                      FROM Hotel
                      INNER JOIN Category ON Hotel.CategoryId = Category.CategoryId`;
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
    const sqlQuery =
      "INSERT INTO Hotel (CategoryId, HotelName, IsActive, Address, HotelImg, Description) VALUES (@CategoryId, @HotelName, @IsActive, @Address, @HotelImg, @Description)";
    return await pool
      .request()
      .input("CategoryId", sql.VarChar, hotelData.CategoryId)
      .input("HotelName", sql.VarChar, hotelData.HotelName)
      .input("IsActive", sql.Bit, hotelData.IsActive)
      .input("Address", sql.VarChar, hotelData.Address)
      .input("HotelImg", sql.VarChar, hotelData.HotelImg)
      .input("Description", sql.VarChar, hotelData.Description)
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
      "UPDATE Hotel SET CategoryId = @CategoryId, HotelName = @HotelName, IsActive = @IsActive, Address = @Address, HotelImg = @HotelImg, Description = @Description WHERE HotelId = @id";
    const result = await pool
      .request()
      .input("id", sql.VarChar, hotelId)
      .input("CategoryId", sql.VarChar, hotelData.CategoryId)
      .input("HotelName", sql.VarChar, hotelData.HotelName)
      .input("IsActive", sql.Bit, hotelData.IsActive)
      .input("Address", sql.VarChar, hotelData.Address)
      .input("HotelImg", sql.VarChar, hotelData.HotelImg)
      .input("Description", sql.VarChar, hotelData.Description)
      .query(sqlQuery, (err, data) => {
        if (err) {
          console.log(err);
          callback(true, null);
        } else {
          callback(null, data);
        }
      });
  }

  // Xóa khách sạn
  static async delete(hotelId, callback) {
    // Logic kết nối và truy vấn cơ sở dữ liệu SQL Server để xóa khách sạn
    const pool = await connect;
    let sqlQuery = `DELETE FROM Hotel WHERE HotelId = @id;
                    DELETE FROM Room WHERE HotelId = @id`;
    const result = await pool
      .request()
      .input("id", sql.VarChar, hotelId)
      .query(sqlQuery, (err, data) => {
        if (err) {
          console.log(err);
          callback(true, null);
        } else {
          callback(null, data);
        }
      });
  }

  // Lấy thông tin của các user
  static async getAllUsers(callback) {
    // Logic kết nối và truy vấn cơ sở dữ liệu SQL Server để lấy user
    const pool = await connect;
    const sqlQuery = `SELECT UsersId, FirstName, LastName, Email, Phone, Address, IsAdmin FROM Users`;
    return await pool.request().query(sqlQuery, function (err, data) {
      if (data.recordset.length > 0) {
        callback(null, data.recordset);
      } else {
        callback(true, null);
      }
    });
  }

  // delete user
  static async deleteUser(UsersId, callback) {
    // Logic kết nối và truy vấn cơ sở dữ liệu SQL Server để xóa khách sạn
    const pool = await connect;
    let sqlQuery = "DELETE FROM Users WHERE UsersId = @id AND isAdmin = 1";
    const result = await pool
      .request()
      .input("id", sql.VarChar, UsersId)
      .query(sqlQuery, (err, data) => {
        if (err) {
          console.log(err);
          callback(true, null);
        } else {
          callback(null, data);
        }
      });
  }
}

export default HotelModel;
