
CREATE TRIGGER InsertInvoiceUsers
ON RoomReserved
AFTER INSERT
AS
BEGIN
    INSERT INTO InvoiceUsers (UsersId, ReservationId, InvoiceAmount, TsIssued, TsPaid, TsCanceled)
    SELECT r.UsersId, r.ReservationId, r.TotalPrice,
           CONVERT(DATETIME, CONVERT(VARCHAR(10), r.EndDate, 120) + ' 00:00:00', 120),
           CONVERT(DATETIME, CONVERT(VARCHAR(10), r.EndDate, 120) + ' 00:00:00', 120),
           CONVERT(DATETIME, CONVERT(VARCHAR(10), r.EndDate, 120) + ' 00:00:00', 120)
    FROM inserted i
    INNER JOIN Reservation r ON i.ReservationId = r.ReservationId;
END;
