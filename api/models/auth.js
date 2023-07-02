import { connect, sql } from "../connectDB.js";

class AuthModels {
  static async checkDupEmail(userData, hashPassword, callback) {
    const pool = await connect;
    // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
    const sqlQueryCheckEmail = `SELECT * FROM Users WHERE Email = @Email`;
    await pool
      .request()
      .input("Email", sql.VarChar, userData.Email)
      .query(sqlQueryCheckEmail, function (err, data) {
        if (err) {
          callback(true, null);
        } else {
          callback(false, data.recordset);
        }
      });
  }

  static async register(userData, hashPassword, callback) {
    const pool = await connect;
    // Thêm thông tin người dùng vào cơ sở dữ liệu
    const sqlQueryInsert = `INSERT INTO Users (FirstName, LastName, Email, Phone, Address, Password) VALUES (@FirstName, @LastName, @Email, @Phone, @Address, @Password)`;
    pool
      .request()
      .input("FirstName", sql.VarChar, userData.FirstName)
      .input("LastName", sql.VarChar, userData.LastName)
      .input("Email", sql.VarChar, userData.Email)
      .input("Phone", sql.VarChar, userData.Phone)
      .input("Address", sql.VarChar, userData.Address)
      .input("Password", sql.VarChar, hashPassword)
      .query(sqlQueryInsert, function (err, data) {
        if (err) {
          callback(true, null);
        } else {
          callback(null, data);
        }
      });
  }
}

export default AuthModels;
