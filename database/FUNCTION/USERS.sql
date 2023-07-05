----################### COUNT(USERS) SECTION ##################
 -- TỔNG 10 FUNCTIONS, GIẢI THÍCH INPUT, OUTPUT, CÔNG DỤNG CỦA FUNCTION
--------------Tổng users theo tháng của hệ thống khách sạn
-- INPUT : NĂM
-- OUTPUT : TỔNG USERS(GUEST) ĐẾN ĐẶT PHÒNG TRONG 12 THÁNG 
-- Cụ thể : Month(int), NumberofUsers(int)

DROP FUNCTION USERS_month
CREATE FUNCTION USERS_month
(@year INT)
RETURNS TABLE
AS
  RETURN (SELECT  MONTH(EndDate) AS Month , COUNT(Users.ID) AS NumberofUsers
  FROM Users
  JOIN Reservation ON Reservation.UsersId = Users.UsersId 
  WHERE YEAR(EndDate) = @year
  GROUP BY MONTH(EndDate));
SELECT * FROM dbo.USERS_month(2021) ORDER BY Month

-----A. LOẠI KHÁCH SẠN-----------------------------------------------------
---------------------------------------------------------------------------

--1.---------------------Tổng users của 1 LOẠI KHÁCH SẠN trong 12 tháng
-- INPUT: NĂM, CATEGORYID
-- OUTPUT: CATEGORYNAME, THÁNG(INT), Năm(INT), NumberofUser(INT)

DROP FUNCTION USERS_month_per_Category
CREATE FUNCTION USERS_month_per_Category
(@year INT, @CAID VARCHAR(5))
RETURNS TABLE
AS
  RETURN (SELECT Category.CategoryName, MONTH(EndDate) AS Month, YEAR(EndDate) AS Year , COUNT(Users.ID) AS NumberofUsers
  FROM Users
  JOIN Reservation ON Reservation.UsersId = Users.UsersId 
  JOIN RoomReserved ON RoomReserved.ReservationID = Reservation.ReservationId
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  JOIN Hotel ON Hotel.HotelId = Room.HotelId
  JOIN Category ON Category.CategoryId = Hotel.CategoryId
  WHERE YEAR(EndDate) = @year AND Category.CategoryId = @CAID
  GROUP BY MONTH(EndDate), YEAR(EndDate), Category.CategoryName);
SELECT * FROM dbo.USERS_month_per_Category(2021,'CA04') ORDER BY Month

--2. --------------------Tổng users của TẤT CẢ LOẠI KHÁCH SẠN trong 1 tháng
-- INPUT: MONTH(INT), YEAR(INT)
-- OUTPUT: THÁNG(INT), CATEGORYNAME, NumberofUser(INT)

DROP FUNCTION USERS_ALL_CA_PER_MONTH
CREATE FUNCTION USERS_ALL_CA_PER_MONTH
(@month INT, @year INT)
RETURNS TABLE
AS
  RETURN (SELECT MONTH(EndDate) AS Month, YEAR(EndDate) AS Year, Category.CategoryName , COUNT(Users.ID) AS NumberofUsers
  FROM Users
  JOIN Reservation ON Reservation.UsersId = Users.UsersId 
  JOIN RoomReserved ON RoomReserved.ReservationID = Reservation.ReservationId
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  JOIN Hotel ON Hotel.HotelId = Room.HotelId
  JOIN Category ON Category.CategoryId = Hotel.CategoryId
  WHERE YEAR(EndDate) = @year AND MONTH(EndDate) = @month
  GROUP BY MONTH(EndDate), Category.CategoryName, YEAR(EndDate));

SELECT * FROM dbo.USERS_ALL_CA_PER_MONTH(6,2021) ORDER BY NumberofUsers

--3. --------------------Tổng users của TỪNG LOẠI KHÁCH SẠN trong 1 năm
-- INPUT: YEAR(INT)
-- OUTPUT: CATEGORYNAME, NumberofUser(INT)

DROP FUNCTION USERS_ALL_CA_PER_YEAR
CREATE FUNCTION USERS_ALL_CA_PER_YEAR
(@year INT)
RETURNS TABLE
AS
  RETURN (SELECT YEAR(EndDate) AS YEAR, Category.CategoryName , COUNT(Users.ID) AS NumberofUsers
  FROM Users
  JOIN Reservation ON Reservation.UsersId = Users.UsersId 
  JOIN RoomReserved ON RoomReserved.ReservationID = Reservation.ReservationId
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  JOIN Hotel ON Hotel.HotelId = Room.HotelId
  JOIN Category ON Category.CategoryId = Hotel.CategoryId
  WHERE YEAR(EndDate) = @year 
  GROUP BY YEAR(EndDate), Category.CategoryName);

SELECT * FROM dbo.USERS_ALL_CA_PER_YEAR(2021) ORDER BY NumberofUsers


-----------B. KHÁCH SẠN-----------------------------------------
----------------------------------------------------------------

--1.--------------------Tổng users của KHÁCH SẠN trong 12 tháng
-- INPUT: NĂM, HOTELID
-- OUTPUT: HOTELNAME, THÁNG(INT), Năm(INT), NumberofUser(INT)

DROP FUNCTION USERS_month_per_Hotel
CREATE FUNCTION USERS_month_per_Hotel
(@year INT, @HID VARCHAR(5))
RETURNS TABLE
AS
  RETURN (SELECT Hotel.HotelName, MONTH(EndDate) AS Month, YEAR(EndDate) AS Year , COUNT(Users.ID) AS NumberofUsers
  FROM Users
  JOIN Reservation ON Reservation.UsersId = Users.UsersId 
  JOIN RoomReserved ON RoomReserved.ReservationID = Reservation.ReservationId
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  JOIN Hotel ON Hotel.HotelId = Room.HotelId
  WHERE YEAR(EndDate) = @year AND Hotel.HotelId = @HID
  GROUP BY MONTH(EndDate), YEAR(EndDate), Hotel.HotelName);

SELECT * FROM dbo.USERS_month_per_Hotel(2021,'HO04') ORDER BY Month

--2.--------------------Tổng users của TỪNG KHÁCH SẠN trong 1 tháng
-- INPUT: MONTH(INT), YEAR(INT)
-- OUTPUT: THÁNG(INT), YEAR, HOTELNAME, NumberofUser(INT)

DROP FUNCTION USERS_ALL_HO_PER_MONTH
CREATE FUNCTION USERS_ALL_HO_PER_MONTH
(@month INT, @year INT)
RETURNS TABLE
AS
  RETURN (SELECT MONTH(EndDate) AS Month, YEAR(EndDate) AS Year, Hotel.HotelName , COUNT(Users.ID) AS NumberofUsers
  FROM Users
  JOIN Reservation ON Reservation.UsersId = Users.UsersId 
  JOIN RoomReserved ON RoomReserved.ReservationID = Reservation.ReservationId
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  JOIN Hotel ON Hotel.HotelId = Room.HotelId
  WHERE YEAR(EndDate) = @year AND MONTH(EndDate) = @month
  GROUP BY MONTH(EndDate), Hotel.HotelName, YEAR(EndDate));

SELECT * FROM dbo.USERS_ALL_HO_PER_MONTH(6,2021) ORDER BY NumberofUsers

--3.--------------------Tổng users của TỪNG KHÁCH SẠN trong 1 năm
-- INPUT: YEAR(INT)
-- OUTPUT: HOTELNAME, NumberofUser(INT)

DROP FUNCTION USERS_ALL_HO_PER_YEAR
CREATE FUNCTION USERS_ALL_HO_PER_YEAR
(@year INT)
RETURNS TABLE
AS
  RETURN (SELECT YEAR(EndDate) AS YEAR, Hotel.HotelName , COUNT(Users.ID) AS NumberofUsers
  FROM Users
  JOIN Reservation ON Reservation.UsersId = Users.UsersId 
  JOIN RoomReserved ON RoomReserved.ReservationID = Reservation.ReservationId
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  JOIN Hotel ON Hotel.HotelId = Room.HotelId
  WHERE YEAR(EndDate) = @year 
  GROUP BY YEAR(EndDate), Hotel.HotelName);

SELECT * FROM dbo.USERS_ALL_HO_PER_YEAR(2021) ORDER BY NumberofUsers

--------- C. THEO ROOMTYPE----------------------------
------------------------------------------------------


--1.---------------------Tổng users của 1 ROOMTYPE trong 12 tháng
-- INPUT: NĂM, ROOMTYPEID
-- OUTPUT: ROOMTYPENAME, THÁNG(INT), Năm(INT), NumberofUser(INT)

DROP FUNCTION USERS_month_per_RT
CREATE FUNCTION USERS_month_per_RT
(@year INT, @RTID VARCHAR(5))
RETURNS TABLE
AS
  RETURN (SELECT RoomType.RoomTypeName, MONTH(EndDate) AS Month, YEAR(EndDate) AS Year , COUNT(Users.ID) AS NumberofUsers
  FROM Users
  JOIN Reservation ON Reservation.UsersId = Users.UsersId 
  JOIN RoomReserved ON RoomReserved.ReservationID = Reservation.ReservationId
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  JOIN RoomType ON Room.RoomTypeId = RoomType.RoomTypeId
  WHERE YEAR(EndDate) = @year AND Room.RoomTypeId = @RTID
  GROUP BY MONTH(EndDate), YEAR(EndDate), RoomType.RoomTypeName);

SELECT * FROM dbo.USERS_month_per_RT(2021,'RT04') ORDER BY Month

--2. --------------------Tổng users của TẤT CẢ ROOMTYPE trong 1 tháng
-- INPUT: MONTH(INT), YEAR(INT)
-- OUTPUT: THÁNG(INT), NĂM(INT), ROOMTYPE, NumberofUser(INT)

DROP FUNCTION USERS_ALL_RT_PER_MONTH
CREATE FUNCTION USERS_ALL_RT_PER_MONTH
(@month INT, @year INT)
RETURNS TABLE
AS
  RETURN (SELECT MONTH(EndDate) AS Month, YEAR(EndDate) AS Year, RoomType.RoomTypeName, COUNT(Users.ID) AS NumberofUsers
  FROM Users
  JOIN Reservation ON Reservation.UsersId = Users.UsersId 
  JOIN RoomReserved ON RoomReserved.ReservationID = Reservation.ReservationId
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  JOIN RoomType ON Room.RoomTypeId = RoomType.RoomTypeId
  WHERE YEAR(EndDate) = @year AND MONTH(EndDate) = @month
  GROUP BY MONTH(EndDate), RoomType.RoomTypeName, YEAR(EndDate));

SELECT * FROM dbo.USERS_ALL_RT_PER_MONTH(6,2021) 

--3. --------------------Tổng users của TỪNG ROOMTYPE trong 1 năm
-- INPUT: YEAR(INT)
-- OUTPUT: ROOMTYPE, NumberofUser(INT)

DROP FUNCTION USERS_ALL_RT_YEAR
CREATE FUNCTION USERS_ALL_RT_YEAR
(@year INT)
RETURNS TABLE
AS
  RETURN (SELECT YEAR(EndDate) AS Year, RoomType.RoomTypeName, COUNT(Users.ID) AS NumberofUsers
  FROM Users
  JOIN Reservation ON Reservation.UsersId = Users.UsersId 
  JOIN RoomReserved ON RoomReserved.ReservationID = Reservation.ReservationId
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  JOIN RoomType ON Room.RoomTypeId = RoomType.RoomTypeId
  WHERE YEAR(EndDate) = @year 
  GROUP BY RoomType.RoomTypeName, YEAR(EndDate));

SELECT * FROM dbo.USERS_ALL_RT_YEAR(2021) ORDER BY NumberofUsers
