------------------------OVERVIEW
---------------- Doanh thu theo tháng

CREATE FUNCTION Doanhthu_month
(@months INT, @year INT)
RETURNS INT
AS
BEGIN
  RETURN (SELECT SUM(TotalPrice) AS Doanhthu
  FROM Reservation
  WHERE YEAR(EndDate) = @year AND MONTH(EndDate) = @months)
END;

---------------- Doanh thu theo năm

CREATE FUNCTION Doanhthu_year
(@year INT)
RETURNS INT
AS
BEGIN
  RETURN (SELECT SUM(TotalPrice) AS Doanhthu
  FROM Reservation
  WHERE YEAR(EndDate) = @year)
END;

SELECT dbo.Doanhthu_year(2021)

-----------------   Tổng users theo tháng
CREATE FUNCTION USERS_month
(@months INT, @year INT)
RETURNS INT
AS
BEGIN
  RETURN (SELECT COUNT(Users.ID) AS SumUsers
  FROM Users
  JOIN Reservation ON Reservation.UsersId = Users.UsersId 
  WHERE YEAR(EndDate) = @year AND MONTH(EndDate) = @months)
END;

SELECT dbo.USERS_month(2,2021)

--------------------- Tổng users theo năm
CREATE FUNCTION USERS_year
(@year INT)
RETURNS INT
AS
BEGIN
  RETURN (SELECT COUNT(Users.ID) AS SumUsers
  FROM Users
  JOIN Reservation ON Reservation.UsersId = Users.UsersId 
  WHERE YEAR(EndDate) = @year)
END;

SELECT dbo.USERS_year(2021)

------------------------ KHÁCH SẠN ----------------------------

-----------------Tổng khách sạn theo loại
CREATE FUNCTION CA_Hotel
(@id_Cat VARCHAR(5))
RETURNS INT
AS
BEGIN
  RETURN (SELECT COUNT(Hotel.HotelId)
  FROM Hotel
  WHERE Hotel.CategoryId = @id_Cat)
END;

SELECT dbo.CA_Hotel('CA01') AS NumberofHotel

----------------Tổng khách sạn hệ thống
CREATE FUNCTION CA_Hotel_all
()
RETURNS INT
AS
BEGIN
  RETURN (SELECT COUNT(Hotel.HotelId)
  FROM Hotel)
END;

SELECT dbo.CA_Hotel_all() AS 

-------------- ----------------- PHÒNG -----------------------
---------------------Tổng phòng sạn theo loại
drop function Type_room
CREATE FUNCTION Type_room
(@id_tp VARCHAR(5))
RETURNS INT
AS
BEGIN
  RETURN (SELECT COUNT(Room.RoomId)
  FROM Room
  WHERE Room.RoomTypeId = @id_tp)
END;

SELECT dbo.Type_room('RT01') AS NumberofRoom

-----------------------Tổng phòng hệ thống
CREATE FUNCTION Type_Room_all
()
RETURNS INT
AS
BEGIN
  RETURN (SELECT COUNT(Room.RoomId)
  FROM Room)
END;

SELECT dbo.Type_Room_all() AS NumberofRoom

-----------------------DOANH THU THEO LOẠI PHÒNG/KHÁCH SẠN

------ Doanh thu theo loại khách sạn theo tháng 

CREATE FUNCTION Doanhthu_CA
(@months INT, @year INT, @CA VARCHAR(5))
RETURNS INT
AS
BEGIN
  RETURN (SELECT SUM(TotalPrice) AS Doanhthu
  FROM Reservation
  JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  JOIN Hotel ON Hotel.HotelId = Room.HotelId
  WHERE YEAR(EndDate) = @year AND MONTH(EndDate) = @months AND Hotel.CategoryId = @CA)
END;

SELECT dbo.Doanhthu_CA(6,2021,'CA01')

-- Doanh thu loại khách sạn theo năm

CREATE FUNCTION Doanhthu_CA_year
(@year INT, @CA VARCHAR(5))
RETURNS INT
AS
BEGIN
  RETURN (SELECT SUM(TotalPrice) AS Doanhthu
  FROM Reservation
  JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  JOIN Hotel ON Hotel.HotelId = Room.HotelId
  WHERE YEAR(EndDate) = @year AND Hotel.CategoryId = @CA)
END;

SELECT dbo.Doanhthu_CA_year(2021,'CA02')

------------------ Doanh thu theo khách sạn theo tháng

drop function Doanhthu_Hotel
CREATE FUNCTION Doanhthu_Hotel
(@months INT, @year INT, @HID VARCHAR(7))
RETURNS INT
AS
BEGIN
  RETURN (SELECT SUM(TotalPrice) AS Doanhthu
  FROM Reservation
  JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  JOIN Hotel ON Hotel.HotelId = Room.HotelId
  WHERE YEAR(EndDate) = @year AND MONTH(EndDate) = @months AND Hotel.HotelId = @HID)
END;

SELECT dbo.Doanhthu_Hotel(6,2021,'HO01')

--------------------- Doanh thu loại khách sạn theo năm

drop function Doanhthu_Hotel_year

CREATE FUNCTION Doanhthu_Hotel_year
(@year INT, @HID VARCHAR(7))
RETURNS INT
AS
BEGIN
  RETURN (SELECT SUM(TotalPrice) AS Doanhthu
  FROM Reservation
  JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  JOIN Hotel ON Hotel.HotelId = Room.HotelId
  WHERE YEAR(EndDate) = @year AND Hotel.HotelId = @HID)
END;
SELECT dbo.Doanhthu_Hotel_year(2021,'HO01')

------------------- Doanh thu theo loại phòng theo tháng 
CREATE FUNCTION Doanhthu_RT
(@months INT, @year INT, @RTID VARCHAR(5))
RETURNS INT
AS
BEGIN
  RETURN (SELECT SUM(TotalPrice) AS Doanhthu
  FROM Reservation
  JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  WHERE YEAR(EndDate) = @year AND MONTH(EndDate) = @months AND Room.RoomTypeId = @RTID)
END;

SELECT dbo.Doanhthu_RT(6,2021,'RT01')

----------------------- Doanh thu loại phòng theo năm
CREATE FUNCTION Doanhthu_RT_year
(@year INT, @RTID VARCHAR(5))
RETURNS INT
AS
BEGIN
  RETURN (SELECT SUM(TotalPrice) AS Doanhthu
  FROM Reservation
  JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  WHERE YEAR(EndDate) = @year AND Room.RoomTypeId = @RTID)
END;

SELECT dbo.Doanhthu_RT_year(2021,'RT01')

--######### Số lượng đặt phòng theo LOẠI khách sạn

-- Lượng đặt phòng theo loại khách sạn theo tháng 
CREATE FUNCTION Reserve_CA
(@months INT, @year INT, @CA VARCHAR(5))
RETURNS INT
AS
BEGIN
  RETURN (SELECT COUNT(Reservation.ReservationId) AS Doanhthu
  FROM Reservation
  JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  JOIN Hotel ON Hotel.HotelId = Room.HotelId
  WHERE YEAR(EndDate) = @year AND MONTH(EndDate) = @months AND Hotel.CategoryId = @CA)
END;

SELECT dbo.Reserve_CA(6,2021,'CA01')

-- Đặt phòng LOẠI khách sạn theo năm
drop function Reserve_CA_year
CREATE FUNCTION Reserve_CA_year
( @year INT, @CA VARCHAR(5))
RETURNS INT
AS
BEGIN
  RETURN (SELECT COUNT(Reservation.ReservationId) AS Doanhthu
  FROM Reservation
  JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  JOIN Hotel ON Hotel.HotelId = Room.HotelId
  WHERE YEAR(EndDate) = @year AND Hotel.CategoryId = @CA)
END;

SELECT dbo.Reserve_CA_year(2021,'CA01')

-- Lượng đặt phòng theo khách sạn theo tháng 
drop function Reserve_HT
CREATE FUNCTION Reserve_HT
(@months INT, @year INT, @HID VARCHAR(7))
RETURNS INT
AS
BEGIN
  RETURN (SELECT COUNT(Reservation.ReservationId) 
  FROM Reservation
  JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  JOIN Hotel ON Hotel.HotelId = Room.HotelId
  WHERE YEAR(EndDate) = @year AND MONTH(EndDate) = @months AND Hotel.HotelId = @HID)
END;
SELECT dbo.Reserve_HT(6,2021,'HO01')

-- Lượng đặt phòng theo khách sạn theo năm
CREATE FUNCTION Reserve_HT_year
(@year INT, @HID VARCHAR(7))
RETURNS INT
AS
BEGIN
  RETURN (SELECT COUNT(Reservation.ReservationId) 
  FROM Reservation
  JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  JOIN Hotel ON Hotel.HotelId = Room.HotelId
  WHERE YEAR(EndDate) = @year AND Hotel.HotelId = @HID)
END;
SELECT dbo.Reserve_HT_year(2021,'HO01')

-- Lượng đặt phòng theo loại phòng theo tháng 
drop function Reserve_RT
CREATE FUNCTION Reserve_RT
(@months INT, @year INT, @RTID VARCHAR(7))
RETURNS INT
AS
BEGIN
  RETURN (SELECT COUNT(Reservation.ReservationId) 
  FROM Reservation
  JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  WHERE YEAR(EndDate) = @year AND MONTH(EndDate) = @months AND Room.RoomTypeId = @RTID)
END;

SELECT dbo.Reserve_RT(6,2021,'RT01')

-- Lượng đặt phòng theo loại phòng theo năm 
drop function Reserve_RT_year
CREATE FUNCTION Reserve_RT_year
(@year INT, @RTID VARCHAR(7))
RETURNS INT
AS
BEGIN
  RETURN (SELECT COUNT(Reservation.ReservationId) 
  FROM Reservation
  JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  WHERE YEAR(EndDate) = @year AND Room.RoomTypeId = @RTID)
END;

SELECT dbo.Reserve_RT_year(2021,'RT01')



-- Doanh thu theo loại phòng theo tháng 

CREATE FUNCTION Doanhthu_RT
(@months INT, @year INT, @RTID VARCHAR(5))
RETURNS INT
AS
BEGIN
  RETURN (SELECT SUM(TotalPrice) AS Doanhthu
  FROM Reservation
  JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  WHERE YEAR(EndDate) = @year AND MONTH(EndDate) = @months AND Room.RoomTypeId = @RTID)
END;

SELECT dbo.Doanhthu_RT(6,2021,'RT01')

-- Doanh thu loại phòng theo năm
CREATE FUNCTION Doanhthu_RT_year
(@year INT, @RTID VARCHAR(5))
RETURNS INT
AS
BEGIN
  RETURN (SELECT SUM(TotalPrice) AS Doanhthu
  FROM Reservation
  JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  WHERE YEAR(EndDate) = @year AND Room.RoomTypeId = @RTID)
END;

SELECT dbo.Doanhthu_RT_year(2021,'RT01')

