--######################### FUNCTION ###############################

--1.--------------- Doanh thu 12 tháng GẦN NHẤT của cả hệ thống
-- OUTPUT : DOANH THU 12 THÁNG CỦA CẢ HỆ THỐNG KHÁCH SẠN
-- Cụ thể: Month(int), Income

DROP FUNCTION Doanhthu_12_LATEST_MONTHS
CREATE FUNCTION Doanhthu_12_LATEST_MONTHS ()
RETURNS TABLE 
AS
RETURN 
(
    SELECT 
        MONTH(EndDate) AS [MONTH],
        YEAR(EndDate) AS [YEAR],
        SUM(TotalPrice) AS REVENUE 
    FROM Reservation 
    WHERE EndDate >= DATEADD(MONTH, -12, '2023-07-01') 
    GROUP BY 
        MONTH(EndDate),
        YEAR(EndDate)
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
    EndDate >= DATEADD(MONTH, -1, '2023-07-01') 
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
  WHERE EndDate >= DATEADD(MONTH, -12, '2023-07-01') AND Hotel.HotelId = @HID
  GROUP BY Hotel.HotelName, MONTH(EndDate), YEAR(EndDate) 
);

SELECT * FROM dbo.Doanhthu_Hotel_12months('HO01') ORDER BY MONTH

--4. Liệt kê doanh thu các loại phòng trong 1 THÁNG GẦN NHẤT
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
  WHERE EndDate >= DATEADD(MONTH, -1, '2023-07-01')
  GROUP BY RoomType.RoomTypeName,MONTH(EndDate) ,YEAR(EndDate));

SELECT * FROM dbo.Doanhthu_ALL_RT_1month()

--5.---------Tổng users theo tháng của hệ thống khách sạn TRONG 12 THÁNG GẦN NHẤT
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
  WHERE EndDate >= DATEADD(MONTH, -12,'2023-07-01')
  GROUP BY MONTH(EndDate), YEAR(EndDate));

SELECT * FROM dbo.USERS_12months() ORDER BY NumberofUsers

----------------------------------------------------
--6. ----------------Tổng user mới nhất tháng trước
-- OUTPUT: hotelname, new_users
DROP FUNCTION GetNewUsersLastMonth
CREATE FUNCTION GetNewUsersLastMonth()
RETURNS TABLE
AS
    -- Truy vấn để tính số người dùng mới của tháng gần nhất
    RETURN (
        SELECT COUNT(DISTINCT Reservation.UsersId) AS New_Users
        FROM Reservation 
		JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
		JOIN Room ON Room.RoomId = RoomReserved.RoomId
		JOIN Hotel ON Hotel.HotelId = Room.HotelId
        WHERE 
		StartDate >= DATEADD(MONTH, DATEDIFF(MONTH, 0, '2023-07-01') - 1, 0)
		AND Reservation.UsersId NOT IN (
            SELECT DISTINCT UsersId
            FROM Reservation
            WHERE StartDate < (DATEADD(MONTH, DATEDIFF(MONTH, 0, '2023-07-01') - 1, 0))
        )

	);

SELECT * FROM dbo.GetNewUsersLastMonth()

	
-----------------------------------------------------
--7.------------Tổng user cũ nhất tháng trước
-- OUTPUT: hotelname, old_users
DROP FUNCTION GetOLDUsersLastMonth
CREATE FUNCTION GetOLDUsersLastMonth()
RETURNS TABLE
AS
    -- Truy vấn để tính số người dùng mới của tháng gần nhất
    RETURN (    SELECT COUNT(DISTINCT Reservation.UsersId) AS Old_Users
        FROM Reservation 
		JOIN RoomReserved ON Reservation.ReservationId = RoomReserved.ReservationID
		JOIN Room ON Room.RoomId = RoomReserved.RoomId
		JOIN Hotel ON Hotel.HotelId = Room.HotelId
        WHERE 
		StartDate >= DATEADD(MONTH, DATEDIFF(MONTH, 0, '2023-07-01') - 1, 0)
		AND Reservation.UsersId IN (
            SELECT DISTINCT UsersId
            FROM Reservation
            WHERE StartDate < (DATEADD(MONTH, DATEDIFF(MONTH, 0, '2023-07-01') - 1, 0))
        )
	);

SELECT * FROM dbo.GetOLDUsersLastMonth()

--8.---------Tổng users ĐẾN TỪNG tháng của hệ thống khách sạn TRONG 12 THÁNG GẦN NHẤT 
-- OUTPUT : TỔNG USERS(GUEST) ĐẾN ĐẶT PHÒNG TRONG 12 THÁNG 
-- Cụ thể : Month(int), NumberofUsers(int)

CREATE FUNCTION GetCumulativeUsersByMonth()
RETURNS @Result TABLE
(
    [Month] INT,
    [Year] INT,
    UsersCount INT
)
AS
BEGIN
    INSERT INTO @Result ([Month], [Year], UsersCount)
    SELECT
        MONTH(StartDate) AS [Month],
        YEAR(StartDate) AS [Year],
        SUM(COUNT(DISTINCT UsersId)) OVER (ORDER BY YEAR(StartDate), MONTH(StartDate)) AS CumulativeUsers
    FROM
        Reservation
    GROUP BY
        YEAR(StartDate), MONTH(StartDate)
    ORDER BY
        YEAR(StartDate), MONTH(StartDate);

    RETURN;
END;

SELECT * FROM dbo.GetCumulativeUsersByMonth()    

