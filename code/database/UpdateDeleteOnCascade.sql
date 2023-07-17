
------------------------ ROOM RESERVED ------------------------
ALTER TABLE RoomReserved
DROP CONSTRAINT FK_ReservationRoomReserved;

ALTER TABLE RoomReserved
ADD CONSTRAINT FK_ReservationRoomReserved
FOREIGN KEY (ReservationID)
REFERENCES Reservation (ReservationID)
ON DELETE CASCADE;

ALTER TABLE RoomReserved
DROP CONSTRAINT FK_RoomRoomReserved;

ALTER TABLE RoomReserved
ADD CONSTRAINT FK_RoomRoomReserved
FOREIGN KEY (RoomId)
REFERENCES Room (RoomId)
ON DELETE CASCADE;

------------------
