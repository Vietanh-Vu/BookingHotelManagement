import { connect, sql } from "../connectDB.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// const currentFilePath = fileURLToPath(import.meta.url);
// const currentDirPath = dirname(currentFilePath);
// const imgUploadPath = path.join(currentDirPath, "../../img/"); // thư mục upload ảnh

class HotelModel {
  static async getHotelByName(stringName, callback) {
    const pool = await connect;
    const sqlQuery =
      "SELECT * FROM Hotel WHERE HotelName LIKE '%' + @name + '%'";
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

  static async getAll(callback) {
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

  static async create(hotelData, callback) {
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

  static async update(hotelId, hotelData, callback) {
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
          callback(true, null);
        } else {
          callback(null, data);
        }
      });
  }

  static async delete(hotelId, callback) {
    const pool = await connect;
    //  The database already has the trigger which handles when HoteHotel is deleted; all the rooms belonging to that hotel are deleted.
    let sqlQuery = `UPDATE Hotel SET IsActive = 0 WHERE HotelId = @id;`;
    const result = await pool
      .request()
      .input("id", sql.VarChar, hotelId)
      .query(sqlQuery, (err, data) => {
        if (err) {
          callback(true, null);
        } else {
          callback(null, data);
        }
      });
  }

  // get Category
  static async getCategory(callback) {
    const pool = await connect;
    const sqlQuery = `SELECT * FROM Category`;
    return await pool.request().query(sqlQuery, function (err, data) {
      if (data.recordset.length > 0) {
        callback(null, data.recordset);
      } else {
        callback(true, null);
      }
    });
  }
}

export default HotelModel;
