import { connect, sql } from "../connectDB.js";

class UserModel {
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

  // Tìm user theo tên
  static async getUserByName(stringName, callback) {
    // Logic kết nối và truy vấn cơ sở dữ liệu SQL Server để lấy user
    const pool = await connect;
    const sqlQuery =
      "SELECT * FROM Users WHERE FirstName LIKE '%' + @name + '%' OR LastName LIKE '%' + @name + '%'";
    return await pool
      .request()
      .input("name", sql.VarChar, stringName)
      .query(sqlQuery, function (err, data) {
        if (data.recordset.length > 0) {
          callback(null, data.recordset);
        } else {
          callback(true, null);
        }
      });
  }

  // delete user admin
  static async deleteUserAdmin(UsersId, callback) {
    // Logic kết nối và truy vấn cơ sở dữ liệu SQL Server để xóa khách sạn
    const pool = await connect;
    let sqlQuery = "UPDATE Users SET IsAdmin = 0 WHERE UsersId = @id";
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

  // set user to admin
  static async setUserAdmin(UsersId, callback) {
    // Logic kết nối và truy vấn cơ sở dữ liệu SQL Server để xóa khách sạn
    const pool = await connect;
    let sqlQuery = "UPDATE Users SET IsAdmin = 1 WHERE UsersId = @id";
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

export default UserModel;
