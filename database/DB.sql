create database BookingHotel

--#################### HOTEL SECTION #########################

--delete from Hotel
--DROP TABLE ROOM
--DROP TABLE Hotel;
CREATE TABLE Hotel (
    ID INT IDENTITY(1,1),
	--sửa đoạn này RIGHT('0' + CAST(ID AS VARCHAR(4)), 5) 
    HotelId AS 'HO' + RIGHT('0' + CAST(ID AS VARCHAR(4)), 5) PERSISTED,
    -- CityId VARCHAR(5),
    CategoryId VARCHAR(5),
    HotelName VARCHAR(128) NOT NULL,
    IsActive BIT,
    Address TEXT NOT NULL,
    HotelImg VARCHAR(128),
    Description VARCHAR(MAX),
    CONSTRAINT PK_Hotel PRIMARY KEY(HotelId),
    -- CONSTRAINT FK_CityHotel FOREIGN KEY(CityId) REFERENCES City(CityId),
    CONSTRAINT FK_CategoryHotel FOREIGN KEY(CategoryId) REFERENCES Category(CategoryId)
);
--ALTER TABLE Hotel ALTER COLUMN IsActive BIT
--ALTER TABLE Hotel ALTER COLUMN HotelImg VARCHAR(128)

--############################ CATEGORY SECTION ##############################
DROP TABLE Category;
CREATE TABLE Category (
    ID INT IDENTITY(1,1),
    CategoryId AS 'CA' + RIGHT('0' + CAST(ID AS VARCHAR(3)), 3) PERSISTED,
    CategoryName VARCHAR(128) NOT NULL,
    CONSTRAINT PK_Category PRIMARY KEY(CategoryId)
);
--select * from Category

--############################## ROOM SECTION ##############################
DROP TABLE Room;
CREATE TABLE Room (
    ID INT IDENTITY(1,1),
	-- sửa lại đoạn này RIGHT('0' + CAST(ID AS VARCHAR(4)), 5) 
    RoomId AS 'RO' + RIGHT('0' + CAST(ID AS VARCHAR(4)), 5) PERSISTED,
    HotelId VARCHAR(7),
    RoomTypeId VARCHAR(5),
    RoomName VARCHAR(128) NOT NULL,
    CurrentPrice DECIMAL(10, 2) NOT NULL,
    IsAvailable BIT,
    IsActive BIT,
    Description VARCHAR(MAX),
    CONSTRAINT PK_Room PRIMARY KEY(RoomId),
    CONSTRAINT FK_HotelRoom FOREIGN KEY(HotelId) REFERENCES Hotel(HotelId),
    CONSTRAINT FK_RoomTypeRoom FOREIGN KEY(RoomTypeId) REFERENCES RoomType(RoomTypeId)
);

--ALTER TABLE Room ALTER COLUMN IsAvailable BIT
--select * from Room

--########################### ROOM TYPE SECTION ###########################

DROP TABLE RoomType;
CREATE TABLE RoomType (
    ID INT IDENTITY(1,1),
    RoomTypeId AS 'RT' + RIGHT('0' + CAST(ID AS VARCHAR(3)), 3) PERSISTED,
    RoomTypeName VARCHAR(128) NOT NULL,
    CONSTRAINT PK_RoomType PRIMARY KEY(RoomTypeId),
);
--select * from RoomType

--############## RESERVATION ################

DROP TABLE Reservation;
CREATE TABLE Reservation (
    ID INT IDENTITY(1,1),
	--RIGHT('0' + CAST(ID AS VARCHAR(4)), 5) 
    ReservationId AS 'RV' + RIGHT('0' + CAST(ID AS VARCHAR(4)), 5) PERSISTED,
    UsersId VARCHAR(7),
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    TsCreated DATETIME NOT NULL,
    TsUpdated DATETIME NOT NULL,
    DiscountPercent DECIMAL(5, 2),
    TotalPrice DECIMAL(10, 2) DEFAULT 0.00,
    CONSTRAINT PK_Reservation PRIMARY KEY(ReservationID),
    CONSTRAINT FK_UsersReservation FOREIGN KEY(UsersId) REFERENCES Users(UsersId)
);

--############################USER##################

DROP TABLE Users;
CREATE TABLE Users (
    ID INT IDENTITY(1,1),
	--RIGHT('0' + CAST(ID AS VARCHAR(4)), 5) 
    UsersId AS 'US' + RIGHT('0' + CAST(ID AS VARCHAR(4)), 5) PERSISTED,
    FirstName VARCHAR(128) NOT NULL,
    LastName VARCHAR(128) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Phone VARCHAR(255) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    IsAdmin BIT,
	Password VARCHAR(128),
    CONSTRAINT PK_Users PRIMARY KEY(UsersId)
);

--######################## RESERVATION ###############


DROP TABLE RoomReserved;
CREATE TABLE RoomReserved (
    ID INT IDENTITY(1,1),
	--RIGHT('0' + CAST(ID AS VARCHAR(4)), 5) 
    RoomReservedId AS 'RR' + RIGHT('0' + CAST(ID AS VARCHAR(5)), 6) PERSISTED,
    ReservationID VARCHAR(7),
    RoomId VARCHAR(7),
    CONSTRAINT PK_RoomReserved PRIMARY KEY(RoomReservedID),
    CONSTRAINT FK_ReservationRoomReserved FOREIGN KEY (ReservationID) REFERENCES Reservation(ReservationID),
    CONSTRAINT FK_RoomRoomReserved FOREIGN KEY (RoomId) REFERENCES Room(RoomId)
);

-------------------TRIGGER FOR PRICE

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

--######################### RESERVATIONS STATUS #################
DROP TABLE ReservationStatus;
CREATE TABLE ReservationStatus (
    ID INT IDENTITY(1,1),
    RSId AS 'RS' + RIGHT('0' + CAST(ID AS VARCHAR(3)), 3) PERSISTED,
    StatusName VARCHAR(128) NOT NULL,
    CONSTRAINT PK_ReservationStatus PRIMARY KEY(RSId)
);

--############# RSE ##################################
DROP TABLE ReservationStatusEvents;
CREATE TABLE ReservationStatusEvents (
    ID INT IDENTITY(1,1),
    RSEId AS 'RE' + RIGHT('0' + CAST(ID AS VARCHAR(4)), 5) PERSISTED,
    RSETsCreated DATETIME NOT NULL,
    Details TEXT NOT NULL,
    RSId VARCHAR(5),
    ReservationId VARCHAR(7),
    CONSTRAINT PK_RSE PRIMARY KEY(RSEId),
    CONSTRAINT FK_RSCRSE FOREIGN KEY(RSId) REFERENCES ReservationStatus(RSId),
    CONSTRAINT FK_ReservationRSE FOREIGN KEY(ReservationId) REFERENCES Reservation(ReservationId),
);


--####################### InvoiceUsers

DROP TABLE InvoiceUsers;
CREATE TABLE InvoiceUsers (
    ID INT IDENTITY(1,1),
    InvoiceId AS 'IV' + RIGHT('0' + CAST(ID AS VARCHAR(3)), 3) PERSISTED,
    UsersId VARCHAR(7),
    ReservationId VARCHAR(7),
    InvoiceAmount DECIMAL(10, 2) NOT NULL,
    TsIssued DATETIME NOT NULL,
    TsPaid DATETIME NOT NULL,
    TsCanceled DATETIME NOT NULL,
    CONSTRAINT PK_InvoiceUsers PRIMARY KEY(InvoiceID),
    CONSTRAINT FK_UsersInvoiceUsers FOREIGN KEY (UsersId) REFERENCES Users(UsersId),
    CONSTRAINT FK_ReservationInvoiceUsers FOREIGN KEY (ReservationId) REFERENCES Reservation(ReservationId),
);
