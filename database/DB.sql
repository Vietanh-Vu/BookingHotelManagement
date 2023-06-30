create database BookingHotel

-- DROP TABLE Country;
-- CREATE TABLE Country (
--     ID INT IDENTITY(1,1),
--     CountryId AS 'CT' + RIGHT('0' + CAST(ID AS VARCHAR(3)), 3) PERSISTED,
--     CONSTRAINT PK_Country PRIMARY KEY(CountryId),
--     CountryName VARCHAR(128) NOT NULL,
-- );

-- DROP TABLE City;
-- CREATE TABLE City (
--     ID INT IDENTITY(1,1),
--     CityId AS 'CI' + RIGHT('0' + CAST(ID AS VARCHAR(3)), 3) PERSISTED,
--     CountryId VARCHAR(5),
--     CityName VARCHAR(128) NOT NULL,
--     CONSTRAINT PK_City PRIMARY KEY(CityId),
--     CONSTRAINT FK_CountryCity FOREIGN KEY(CountryId) REFERENCES Country(CountryId)
-- );

DROP TABLE Hotel;
CREATE TABLE Hotel (
    ID INT IDENTITY(1,1),
    HotelId AS 'HO' + RIGHT('0' + CAST(ID AS VARCHAR(3)), 3) PERSISTED,
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
 ALTER TABLE Hotel ALTER COLUMN IsActive BIT
  ALTER TABLE Hotel ALTER COLUMN HotelImg VARCHAR(128)


DROP CONSTRAINT FK_CityHotel

DROP TABLE Category;
CREATE TABLE Category (
    ID INT IDENTITY(1,1),
    CategoryId AS 'CA' + RIGHT('0' + CAST(ID AS VARCHAR(3)), 3) PERSISTED,
    CategoryName VARCHAR(128) NOT NULL,
    CONSTRAINT PK_Category PRIMARY KEY(CategoryId)
);

INSERT INTO Category (CategoryName) VALUES
    ('Luxury'),
    ('Boutique'),
    ('Budget'),
    ('Resort'),
    ('Extended Stay');



DROP TABLE Room;
CREATE TABLE Room (
    ID INT IDENTITY(1,1),
    RoomId AS 'RO' + RIGHT('0' + CAST(ID AS VARCHAR(3)), 3) PERSISTED,
    HotelId VARCHAR(5),
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

ALTER TABLE Room ALTER COLUMN IsAvailable BIT


DROP TABLE RoomType;
CREATE TABLE RoomType (
    ID INT IDENTITY(1,1),
    RoomTypeId AS 'RT' + RIGHT('0' + CAST(ID AS VARCHAR(3)), 3) PERSISTED,
    RoomTypeName VARCHAR(128) NOT NULL,
    CONSTRAINT PK_RoomType PRIMARY KEY(RoomTypeId),
);

ALTER TABLE RoomType DROP COLUMN RoomName
ALTER TABLE RoomType ADD RoomTypeName VARCHAR(128) NOT NULL

DROP TABLE Reservation;
CREATE TABLE Reservation (
    ID INT IDENTITY(1,1),
    ReservationId AS 'RV' + RIGHT('0' + CAST(ID AS VARCHAR(3)), 3) PERSISTED,
    UsersId VARCHAR(5),
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    TsCreated DATETIME NOT NULL,
    TsUpdated DATETIME NOT NULL,
    DiscountPercent DECIMAL(5, 2),
    TotalPrice DECIMAL(10, 2) NOT NULL,
    CONSTRAINT PK_Reservation PRIMARY KEY(ReservationID),
    CONSTRAINT FK_UsersReservation FOREIGN KEY(UsersId) REFERENCES Users(UsersId)
);

DROP TABLE Users;
CREATE TABLE Users (
    ID INT IDENTITY(1,1),
    UsersId AS 'US' + RIGHT('0' + CAST(ID AS VARCHAR(3)), 3) PERSISTED,
    FirstName VARCHAR(128) NOT NULL,
    LastName VARCHAR(128) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Phone VARCHAR(255) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    IsAdmin BIT,
    CONSTRAINT PK_Users PRIMARY KEY(UsersId)
);

DROP TABLE RoomReserved;
CREATE TABLE RoomReserved (
    ID INT IDENTITY(1,1),
    RoomReservedId AS 'RR' + RIGHT('0' + CAST(ID AS VARCHAR(3)), 3) PERSISTED,
    ReservationID VARCHAR(5),
    RoomId VARCHAR(5),
    CONSTRAINT PK_RoomReserved PRIMARY KEY(RoomReservedID),
    CONSTRAINT FK_ReservationRoomReserved FOREIGN KEY (ReservationID) REFERENCES Reservation(ReservationID),
    CONSTRAINT FK_RoomRoomReserved FOREIGN KEY (RoomId) REFERENCES Room(RoomId)
);

DROP TABLE ReservationStatus;
CREATE TABLE ReservationStatus (
    ID INT IDENTITY(1,1),
    RSId AS 'RS' + RIGHT('0' + CAST(ID AS VARCHAR(3)), 3) PERSISTED,
    StatusName VARCHAR(128) NOT NULL,
    CONSTRAINT PK_ReservationStatus PRIMARY KEY(RSId)
);

DROP TABLE ReservationStatusEvents;
CREATE TABLE ReservationStatusEvents (
    ID INT IDENTITY(1,1),
    RSEId AS 'RE' + RIGHT('0' + CAST(ID AS VARCHAR(3)), 3) PERSISTED,
    RSETsCreated DATETIME NOT NULL,
    Details TEXT NOT NULL,
    RSId VARCHAR(5),
    ReservationId VARCHAR(5),
    CONSTRAINT PK_RSE PRIMARY KEY(RSEId),
    CONSTRAINT FK_RSCRSE FOREIGN KEY(RSId) REFERENCES ReservationStatus(RSId),
    CONSTRAINT FK_ReservationRSE FOREIGN KEY(ReservationId) REFERENCES Reservation(ReservationId),
);

DROP TABLE InvoiceUsers;
CREATE TABLE InvoiceUsers (
    ID INT IDENTITY(1,1),
    InvoiceId AS 'IV' + RIGHT('0' + CAST(ID AS VARCHAR(3)), 3) PERSISTED,
    UsersId VARCHAR(5),
    ReservationId VARCHAR(5),
    InvoiceAmount DECIMAL(10, 2) NOT NULL,
    TsIssued DATETIME NOT NULL,
    TsPaid DATETIME NOT NULL,
    TsCanceled DATETIME NOT NULL,
    CONSTRAINT PK_InvoiceUsers PRIMARY KEY(InvoiceID),
    CONSTRAINT FK_UsersInvoiceUsers FOREIGN KEY (UsersId) REFERENCES Users(UsersId),
    CONSTRAINT FK_ReservationInvoiceUsers FOREIGN KEY (ReservationId) REFERENCES Reservation(ReservationId),
);
