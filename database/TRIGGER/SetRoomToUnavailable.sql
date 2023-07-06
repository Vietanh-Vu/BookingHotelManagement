---------TRIGGER SET ROOM UNVAILABLE NẾU INSERT RESERVATION-------------
DROP TRIGGER SetToUnavailable
CREATE TRIGGER SetToUnavailable
ON RoomReserved
AFTER INSERT
AS
BEGIN
    IF EXISTS (SELECT * FROM inserted 
	           JOIN Reservation ON Reservation.ReservationId = inserted.ReservationID
			   WHERE StartDate <= CONVERT(DATE, GETDATE())
			   AND EndDate >= CONVERT(DATE, GETDATE()))
    BEGIN
        UPDATE Room
        SET IsAvailable = 0
        FROM Room
        INNER JOIN inserted ON Room.RoomId = inserted.RoomId;
    END;
END;


----------------------------------------------------
--------------------TEST CASE-----------------------
INSERT INTO Reservation (UsersId, StartDate, EndDate, TsCreated, TsUpdated, DiscountPercent)
VALUES
--user 1-50 đi tháng 1/2021
('US01','2023-07-05','2023-07-14','2020-12-02 00:00:00','2020-12-02 00:00:00', 0.15)
select * from Reservation where ReservationId = 'RV01943'
delete from Reservation where ReservationId = 'RV01942'
INSERT INTO RoomReserved (ReservationID, RoomId) VALUES
--t1/2021
('RV01943', 'RO04'),
('RV01943', 'RO05')

--select * from Room 