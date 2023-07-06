import { connect, sql } from "../connectDB.js";

class RoomModel {
  // Lấy tất cả các room type
  static async getRoomType(callback) {
    const pool = await connect;
    const sqlQuery = `SELECT * FROM RoomType`;
    return await pool.request().query(sqlQuery, function (err, data) {
      if (data.recordset.length > 0) {
        callback(null, data.recordset);
      } else {
        callback(true, null);
      }
    });
  }
  // Lấy danh sách phòng trong một khách sạn
  static async getByHotel(hotelId, callback) {
    // Logic kết nối và truy vấn cơ sở dữ liệu SQL Server để lấy danh sách phòng
    const pool = await connect;
    const sqlQuery = `SELECT * FROM Room 
                      INNER JOIN RoomType ON Room.RoomTypeId = RoomType.RoomTypeId
                      WHERE HotelId = @HotelId`;
    return await pool
      .request()
      .input("HotelId", sql.VarChar, hotelId)
      .query(sqlQuery, function (err, data) {
        if (data.recordset.length > 0) {
          callback(null, data.recordset);
        } else {
          callback(true, null);
        }
      });
  }

  // Thêm phòng vào khách sạn
  static async create(hotelId, roomData, callback) {
    // Logic kết nối và truy vấn cơ sở dữ liệu SQL Server để thêm phòng
    const pool = await connect;
    const sqlQuery = `INSERT INTO Room (HotelId, RoomTypeId, RoomName, CurrentPrice, IsAvailable, Description, IsActive) VALUES 
                      (@HotelId, @RoomTypeId, @RoomName, @CurrentPrice, @IsAvailable, @Description, @IsActive)`;
    return await pool
      .request()
      .input("HotelId", sql.VarChar, hotelId)
      .input("RoomTypeId", sql.VarChar, roomData.RoomTypeId)
      .input("RoomName", sql.VarChar, roomData.RoomName)
      .input("CurrentPrice", sql.Decimal, roomData.CurrentPrice)
      .input("IsAvailable", sql.Bit, roomData.IsAvailable)
      .input("Description", sql.VarChar, roomData.Description)
      .input("IsActive", sql.Bit, roomData.IsActive)
      .query(sqlQuery, function (err, data) {
        if (err) {
          callback(true, null);
          console.log(err);
        } else {
          callback(null, data);
        }
      });
  }

  // Sửa thông tin phòng
  static async update(roomId, roomData, callback) {
    // Logic kết nối và truy vấn cơ sở dữ liệu SQL Server để sửa phòng
    const pool = await connect;
    let sqlQuery =
      "UPDATE Room SET HotelId = @HotelId, RoomTypeId = @RoomTypeId, RoomName = @RoomName, CurrentPrice = @CurrentPrice, IsAvailable = @IsAvailable, Description = @Description, IsActive = @IsActive WHERE RoomId = @id";
    const result = await pool
      .request()
      .input("id", sql.VarChar, roomId)
      .input("HotelId", sql.VarChar, roomData.HotelId)
      .input("RoomTypeId", sql.VarChar, roomData.RoomTypeId)
      .input("RoomName", sql.VarChar, roomData.RoomName)
      .input("CurrentPrice", sql.Decimal, roomData.CurrentPrice)
      .input("IsAvailable", sql.Bit, roomData.IsAvailable)
      .input("Description", sql.VarChar, roomData.Description)
      .input("IsActive", sql.Bit, roomData.IsActive)
      .query(sqlQuery, (err, data) => {
        if (err) {
          callback(true, null);
        } else {
          callback(null, data);
        }
      });
  }

  static async delete(roomId, callback) {
    // Logic kết nối và truy vấn cơ sở dữ liệu SQL Server để xóa phòng
    const pool = await connect;
    let sqlQuery = "UPDATE Room SET IsActive = 0 WHERE RoomId = @id";
    const result = await pool
      .request()
      .input("id", sql.VarChar, roomId)
      .query(sqlQuery, (err, data) => {
        if (err) {
          callback(true, null);
        } else {
          callback(null, data);
        }
      });
  }

  static async history(roomId, callback) {
    const pool = await connect;
    let sqlQuery = `SELECT * 
                    FROM RoomReserved 
                    INNER JOIN Reservation ON RoomReserved.ReservationID = Reservation.ReservationID
                    WHERE RoomId = @RoomId`;
    return await pool
      .request()
      .input("RoomId", sql.VarChar, roomId)
      .query(sqlQuery, function (err, data) {
        if (data.recordset.length > 0) {
          callback(null, data.recordset);
        } else {
          callback(true, null);
        }
      });
  }
}

export default RoomModel;
