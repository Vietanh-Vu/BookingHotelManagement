
-------------------TRIGGER FOR TOTALPRICE ------------------------

CREATE TRIGGER addPrice
ON RoomReserved
AFTER INSERT
AS
BEGIN
UPDATE Reservation
    SET TotalPrice = TotalPrice + (
        SELECT SUM(CurrentPrice) * (DAY(Reservation.EndDate)-DAY(Reservation.StartDate)+30*(MONTH(Reservation.EndDate)-MONTH(Reservation.StartDate)))
        FROM RoomReserved rr
        INNER JOIN Room r ON rr.RoomId = r.RoomId
        INNER JOIN Reservation rv ON rv.ReservationId= rr.ReservationID
        WHERE rr.ReservationID = Reservation.ReservationID
    )
    WHERE ReservationID IN (
        SELECT ReservationID
        FROM inserted
    )
END

--------------------TRIGGER THÊM XÓA KHÁCH SẠN THÌ UPDATE PHÒNG--------------

        ---------TRIGGER XÓA KHÁCH SẠN

CREATE TRIGGER UpdateRoomInactive
ON Hotel
AFTER UPDATE
AS
BEGIN
    IF UPDATE(isActive)
    BEGIN
        UPDATE Room
        SET isActive = 0
        FROM Room
        INNER JOIN inserted ON Room.HotelId = inserted.HotelId
        WHERE inserted.isActive= 0;
    END;
END;

        ---------------- TRIGGER THÊM KHÁCH SẠN -----------

CREATE TRIGGER UpdateRoomActive
ON Hotel
AFTER UPDATE
AS
BEGIN
    IF UPDATE(isActive)
    BEGIN
        UPDATE Room
        SET isActive = 1
        FROM Room
        INNER JOIN inserted ON Room.HotelId = inserted.HotelId
        WHERE inserted.isActive= 1;
    END;
END;

        ----------TEST CASE
UPDATE Hotel
SET IsActive = 1 where Hotel.HotelId = 'HO01'

select * from Room where Room.HotelId = 'HO01'

