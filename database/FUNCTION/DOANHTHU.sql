--######################### FUNCTION ###############################

--1.--------------- Doanh thu 12 tháng GẦN NHẤT của cả hệ thống
-- OUTPUT : DOANH THU 12 THÁNG CỦA CẢ HỆ THỐNG KHÁCH SẠN
-- Cụ thể: Month(int), Income

DROP FUNCTION Doanhthu_12_LATEST_MONTHS
CREATE FUNCTION Doanhthu_12_LATEST_MONTHS
()
RETURNS TABLE
AS
RETURN
(
  SELECT
    MONTH(EndDate) AS [MONTH],
	YEAR(EndDate) AS [YEAR],
    SUM(TotalPrice) AS REVENUE
  FROM
    Reservation
  WHERE
    EndDate >= DATEADD(MONTH, -12, GETDATE()) -- Lấy các đặt phòng trong 12 tháng gần nhất
  GROUP BY
    MONTH(EndDate), YEAR(EndDate)
);

SELECT * FROM dbo.Doanhthu_12_LATEST_MONTHS() AS DOANHTHU ORDER BY REVENUE

--2.--------------- Doanh thu 1 tháng GẦN NHẤT của từng loại khách sạn
-- OUTPUT : DOANH THU 1 THÁNG GẦN NHẤT CỦA TỪNG LOẠI KHÁCH SẠN
-- Cụ thể: Month(int), Income

DROP FUNCTION Doanhthu_CA_LATEST_MONTH
CREATE FUNCTION Doanhthu_CA_LATEST_MONTH
()
RETURNS TABLE
AS
RETURN
(
  SELECT
    Category.CategoryName, Category.CategoryId,
    SUM(TotalPrice) AS Income
  FROM
    Reservation
    JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
    JOIN Room ON Room.RoomId = RoomReserved.RoomId
    JOIN Hotel ON Hotel.HotelId = Room.HotelId
    JOIN Category ON Category.CategoryId = Hotel.CategoryId
  WHERE
    EndDate >= DATEADD(MONTH, -1, GETDATE()) 
  GROUP BY
    Category.CategoryName, Category.CategoryId
);

SELECT * FROM dbo.Doanhthu_CA_LATEST_MONTH() 

--3.------------- Doanh thu của một khách sạn trong 12 tháng gần nhất
-- INPUT: HOTELID
-- OUTPUT: TÊN KHÁCH SẠN(VARCHAR),THÁNG(INT), Năm(int),INCOME(INT)

drop function Doanhthu_Hotel_12months
CREATE FUNCTION Doanhthu_Hotel_12months
(@HID VARCHAR(7))
RETURNS TABLE
AS
  RETURN (SELECT Hotel.HotelName ,MONTH(EndDate) AS [MONTH], YEAR(EndDate) AS [YEAR],SUM(TotalPrice) AS INCOME
  FROM Reservation
  JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  JOIN Hotel ON Hotel.HotelId = Room.HotelId
  WHERE EndDate >= DATEADD(MONTH, -12, GETDATE()) AND Hotel.HotelId = @HID
  GROUP BY Hotel.HotelName, MONTH(EndDate), YEAR(EndDate) 
);

SELECT * FROM dbo.Doanhthu_Hotel_12months('HO01') ORDER BY MONTH

--5. Liệt kê doanh thu các loại phòng trong 1 THÁNG GẦN NHẤT
-- INPUT: NULL
-- OUTPUT: YEAR, ROOMTYPENAME, INCOME

DROP FUNCTION Doanhthu_ALL_RT_1month
CREATE FUNCTION Doanhthu_ALL_RT_1month
()
RETURNS TABLE
AS
  RETURN (SELECT MONTH(EndDate) AS MONTH ,YEAR(EndDate) AS YEAR, RoomType.RoomTypeName, SUM(TotalPrice) AS Doanhthu
  FROM Reservation
  JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  JOIN RoomType ON RoomType.RoomTypeId = Room.RoomTypeId
  WHERE EndDate >= DATEADD(MONTH, -1, GETDATE())
  GROUP BY RoomType.RoomTypeName,MONTH(EndDate) ,YEAR(EndDate));

SELECT * FROM dbo.Doanhthu_ALL_RT_1month()

-6.---------Tổng users theo tháng của hệ thống khách sạn TRONG 12 THÁNG GẦN NHẤT
-- INPUT : 
-- OUTPUT : TỔNG USERS(GUEST) ĐẾN ĐẶT PHÒNG TRONG 12 THÁNG 
-- Cụ thể : Month(int), NumberofUsers(int)

DROP FUNCTION USERS_12months
CREATE FUNCTION USERS_12months
()
RETURNS TABLE
AS
  RETURN (SELECT  MONTH(EndDate) AS Month, YEAR(EndDate) AS Year , COUNT(Users.ID) AS NumberofUsers
  FROM Users
  JOIN Reservation ON Reservation.UsersId = Users.UsersId 
  WHERE EndDate >= DATEADD(MONTH, -12, GETDATE())
  GROUP BY MONTH(EndDate), YEAR(EndDate));

SELECT * FROM dbo.USERS_12months() ORDER BY NumberofUsers










------------------------PENDING-----------------------------
------------------------PENDING-----------------------------
------------------------PENDING-----------------------------
------------------------PENDING-----------------------------
-------------############## DOANH THU ######################
-- TỔNG 10 FUNCTIONS, GIẢI THÍCH INPUT, OUTPUT, CÔNG DỤNG CỦA FUNCTION
--1.--------------- Doanh thu theo tháng của cả hệ thống
-- INPUT : NĂM
-- OUTPUT : DOANH THU 12 THÁNG CỦA CẢ HỆ THỐNG KHÁCH SẠN
-- Cụ thể: Month(int), Income

DROP FUNCTION Doanhthu_month
CREATE FUNCTION Doanhthu_month
(
  @year INT
)
RETURNS TABLE
AS
RETURN
(
  SELECT
    MONTH(EndDate) AS Month,
    SUM(TotalPrice) AS Income
  FROM
    Reservation
  WHERE
    YEAR(EndDate) = @year
  GROUP BY
    MONTH(EndDate)
);

SELECT * FROM dbo.Doanhthu_month(2021) AS DOANHTHU ORDER BY Month

--A.-------------------------DOANH THU THEO LOẠI KHÁCH SẠN

--1.---------------- Doanh thu của TỪNG LOẠI khách sạn trong một tháng 
-- INPUT : THÁNG, NĂM
-- OUTPUT : CategoryName(Varchar(128)), Income(int)

DROP FUNCTION Doanhthu_CA
CREATE FUNCTION Doanhthu_CA
(
  @month INT,
  @year INT
)
RETURNS TABLE
AS
RETURN
(
  SELECT
    Category.CategoryName,
    SUM(TotalPrice) AS Income
  FROM
    Reservation
    JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
    JOIN Room ON Room.RoomId = RoomReserved.RoomId
    JOIN Hotel ON Hotel.HotelId = Room.HotelId
    JOIN Category ON Category.CategoryId = Hotel.CategoryId
  WHERE
    YEAR(EndDate) = @year
    AND MONTH(EndDate) = @month
  GROUP BY
    Category.CategoryName
);

SELECT * FROM dbo.Doanhthu_CA(6,2021) 

--2.------------- Doanh thu của TỪNG LOẠI khách sạn trong một năm
-- INPUT :  NĂM
-- OUTPUT : CategoryName(Varchar(128)), MONTH(int), Income(int)

DROP FUNCTION Doanhthu_CA_year
CREATE FUNCTION Doanhthu_CA_year
(
  @year INT
)
RETURNS TABLE
AS
RETURN
(
  SELECT
    Category.CategoryName,
    SUM(TotalPrice) AS Income
  FROM
    Reservation
    JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
    JOIN Room ON Room.RoomId = RoomReserved.RoomId
    JOIN Hotel ON Hotel.HotelId = Room.HotelId
    JOIN Category ON Category.CategoryId = Hotel.CategoryId
  WHERE
    YEAR(EndDate) = @year
  GROUP BY
    Category.CategoryName
);
SELECT * FROM dbo.Doanhthu_CA_year(2021) 


--3.------------- Doanh thu của một loại khách sạn theo tháng
-- INPUT :  CategoryId, NĂM
-- OUTPUT : CategoryName(Varchar(128)), MONTH(int), Income(int)

DROP FUNCTION Doanhthu_CA_months
CREATE FUNCTION Doanhthu_CA_months
(
  @year INT,
  @CaID VARCHAR(5)
)
RETURNS TABLE
AS
RETURN
(
  SELECT
    Category.CategoryName,
	MONTH(EndDate) AS MONTH,
    SUM(TotalPrice) AS Income
  FROM
    Reservation
    JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
    JOIN Room ON Room.RoomId = RoomReserved.RoomId
    JOIN Hotel ON Hotel.HotelId = Room.HotelId
    JOIN Category ON Category.CategoryId = Hotel.CategoryId
  WHERE
    YEAR(EndDate) = @year 
	AND Category.CategoryId = @CaID
  GROUP BY
    MONTH(EndDate),
	Category.CategoryName
);

SELECT * FROM dbo.Doanhthu_CA_months(2021,'CA05') ORDER BY MONTH

----------------------------------------------------------------
--B.--------------------DOANH THU THEO RIÊNG KHÁCH SẠN ---------

--1.------- Doanh thu của TỪNG khách sạn trong một tháng nhập vào (ví dụ nhập tháng 6 cao điểm)
-- INPUT : THÁNG, NĂM
-- OUTPUT : CategoryName(Varchar(128)), Income(int)


DROP FUNCTION Doanhthu_Hotel_by_month
CREATE FUNCTION Doanhthu_Hotel_by_month
(
  @month INT,
  @year INT
)
RETURNS TABLE
AS
RETURN
(
  SELECT
    MONTH(EndDate) AS Month,
    Hotel.HotelName,
    SUM(TotalPrice) AS Income
  FROM
    Reservation
    JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
    JOIN Room ON Room.RoomId = RoomReserved.RoomId
    JOIN Hotel ON Hotel.HotelId = Room.HotelId
  WHERE
    YEAR(EndDate) = @year
    AND MONTH(EndDate) = @month
  GROUP BY
    Hotel.HotelName,
	MONTH(EndDate)
);

SELECT * FROM dbo.Doanhthu_Hotel_by_month(12,2021) 


--2.------------- Doanh thu của một khách sạn trong 12 tháng
-- INPUT: HOTELID, NĂM
-- OUTPUT: TÊN KHÁCH SẠN(VARCHAR),THÁNG(INT), INCOME(INT)

drop function Doanhthu_Hotel_12months
CREATE FUNCTION Doanhthu_Hotel_12months
(@year INT, @HID VARCHAR(7))
RETURNS TABLE
AS
  RETURN (SELECT Hotel.HotelName ,MONTH(EndDate) AS MONTH, SUM(TotalPrice) AS Doanhthu
  FROM Reservation
  JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  JOIN Hotel ON Hotel.HotelId = Room.HotelId
  WHERE YEAR(EndDate) = @year AND Hotel.HotelId = @HID
  GROUP BY Hotel.HotelName, MONTH(EndDate)
);

SELECT * FROM dbo.Doanhthu_Hotel_12months(2021,'HO013') ORDER BY MONTH

--3.------- Doanh thu của TỪNG khách sạn trong một năm
-- INPUT : THÁNG, NĂM
-- OUTPUT : CategoryName(Varchar(128)), Income(int)

DROP FUNCTION Doanhthu_Hotel_by_year
CREATE FUNCTION Doanhthu_Hotel_by_year
(
  @year INT
)
RETURNS TABLE
AS
RETURN
(
  SELECT
    YEAR(EndDate) AS YEAR,
    Hotel.HotelName,
    SUM(TotalPrice) AS Income
  FROM
    Reservation
    JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
    JOIN Room ON Room.RoomId = RoomReserved.RoomId
    JOIN Hotel ON Hotel.HotelId = Room.HotelId
  WHERE
    YEAR(EndDate) = @year
  GROUP BY
    Hotel.HotelName,
	YEAR(EndDate)
);

SELECT * FROM dbo.Doanhthu_Hotel_by_year(2021) 

--------------------------------------------------------------------
--C. DOANH THU THEO LOẠI PHÒNG--------------------------------------

--1. Doanh thu CỦA MỘT loại phòng theo 12 tháng 
-- INPUT: YEAR, ROOMTYPEID
-- OUTPUT: MONTH, YEAR, ROOMTYPENAME, INCOME

DROP FUNCTION Doanhthu_1RT_per_MONTH
CREATE FUNCTION Doanhthu_1RT_per_MONTH
( @year INT, @RTID VARCHAR(5))
RETURNS TABLE
AS
  RETURN (SELECT MONTH(EndDate) AS MONTH, YEAR(EndDate) AS YEAR, RoomType.RoomTypeName, SUM(TotalPrice) AS Doanhthu
  FROM Reservation
  JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  JOIN RoomType ON RoomType.RoomTypeId = Room.RoomTypeId
  WHERE YEAR(EndDate) = @year  AND Room.RoomTypeId = @RTID
  GROUP BY MONTH(EndDate),YEAR(EndDate), RoomType.RoomTypeName )
;

SELECT * FROM dbo.Doanhthu_1RT_per_MONTH(2021,'RT01') ORDER BY MONTH


--2. Liệt kê doanh thu các loại phòng trong năm
-- INPUT: YEAR
-- OUTPUT: YEAR, ROOMTYPENAME, INCOME

DROP FUNCTION Doanhthu_RT_year
CREATE FUNCTION Doanhthu_RT_year
(@year INT)
RETURNS TABLE
AS
  RETURN (SELECT RoomType.RoomTypeName, SUM(TotalPrice) AS Doanhthu
  FROM Reservation
  JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  JOIN RoomType ON RoomType.RoomTypeId = Room.RoomTypeId
  WHERE YEAR(EndDate) = @year
  GROUP BY Room.RoomTypeId, RoomType.RoomTypeName);

SELECT * FROM dbo.Doanhthu_RT_year(2021)

--3. Liệt kê doanh thu các loại phòng trong 1 THÁNG
-- INPUT: YEAR
-- OUTPUT: YEAR, ROOMTYPENAME, INCOME

DROP FUNCTION Doanhthu_ALL_RT_1month
CREATE FUNCTION Doanhthu_ALL_RT_1month
(@month INT, @year INT)
RETURNS TABLE
AS
  RETURN (SELECT MONTH(EndDate) AS MONTH ,YEAR(EndDate) AS YEAR, RoomType.RoomTypeName, SUM(TotalPrice) AS Doanhthu
  FROM Reservation
  JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
  JOIN Room ON Room.RoomId = RoomReserved.RoomId
  JOIN RoomType ON RoomType.RoomTypeId = Room.RoomTypeId
  WHERE YEAR(EndDate) = @year AND MONTH(EndDate) = @month 
  GROUP BY Room.RoomTypeId, RoomType.RoomTypeName,MONTH(EndDate) ,YEAR(EndDate));

SELECT * FROM dbo.Doanhthu_ALL_RT_1month(1,2021)

------------------------------------------------------------------

