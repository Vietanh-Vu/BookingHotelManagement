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


INSERT INTO Users (FirstName, LastName, Email, Phone, Address, IsAdmin, Password)
VALUES
    ('Liam', 'Romano', 'liam.romano@example.com', '5556667777', '890 Cedar Street', 0, 'password101'),
    ('Charlotte', 'Ricci', 'charlotte.ricci@example.com', '7778889999', '123 Pine Road', 0, 'password102'),
    ('Ethan', 'Sorrentino', 'ethan.sorrentino@example.com', '5554443333', '456 Cedar Street', 0, 'password103'),
    ('Olivia', 'De Angelis', 'olivia.deangelis@example.com', '2223334444', '789 Elm Street', 0, 'password104'),
    ('Aiden', 'Marini', 'aiden.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password105'),
    ('Mia', 'Lombardi', 'mia.lombardi@example.com', '5556667777', '654 Maple Lane', 0, 'password106'),
    ('Lucas', 'De Rosa', 'lucas.derosa@example.com', '1112223333', '987 Elm Street', 0, 'password107'),
    ('Isabella', 'Russo', 'isabella.russo@example.com', '4445556666', '234 Pine Road', 0, 'password108'),
    ('James', 'Ferrante', 'james.ferrante@example.com', '6665554444', '567 Oak Avenue', 0, 'password109'),
    ('Amelia', 'DAmico', 'amelia.damico@example.com', '5556667777', '890 Cedar Street', 0, 'password110'),
    -- User 111-120
    ('Henry', 'Battaglia', 'henry.battaglia@example.com', '7778889999', '123 Pine Road', 0, 'password111'),
    ('Elizabeth', 'Rinaldi', 'elizabeth.rinaldi@example.com', '5554443333', '456 Cedar Street', 0, 'password112'),
    ('Alexander', 'Guerra', 'alexander.guerra@example.com', '2223334444', '789 Elm Street', 0, 'password113'),
    ('Samantha', 'Marini', 'samantha.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password114'),
    ('Daniel', 'Caruso', 'daniel.caruso@example.com', '5556667777', '654 Maple Lane', 0, 'password115'),
    ('Scarlett', 'Barone', 'scarlett.barone@example.com', '1112223333', '987 Elm Street', 0, 'password116'),
    ('Joseph', 'Valentini', 'joseph.valentini@example.com', '4445556666', '234 Pine Road', 0, 'password117'),
    ('Emily', 'Battaglia', 'emily.battaglia@example.com', '6665554444', '567 Oak Avenue', 0, 'password118'),
    ('Benjamin', 'Bianchi', 'benjamin.bianchi@example.com', '5556667777', '890 Cedar Street', 0, 'password119'),
    ('Evelyn', 'Leone', 'evelyn.leone@example.com', '7778889999', '123 Pine Road', 0, 'password120'),
    -- User 121-130
    ('Sebastian', 'Romano', 'sebastian.romano@example.com', '5556667777', '890 Cedar Street', 0, 'password121'),
    ('Avery', 'Ricci', 'avery.ricci@example.com', '7778889999', '123 Pine Road', 0, 'password122'),
    ('Matthew', 'Sorrentino', 'matthew.sorrentino@example.com', '5554443333', '456 Cedar Street', 0, 'password123'),
    ('Harper', 'De Angelis', 'harper.deangelis@example.com', '2223334444', '789 Elm Street', 0, 'password124'),
    ('David', 'Marini', 'david.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password125'),
    ('Victoria', 'Lombardi', 'victoria.lombardi@example.com', '5556667777', '654 Maple Lane', 0, 'password126'),
    ('Joseph', 'De Rosa', 'joseph.derosa@example.com', '1112223333', '987 Elm Street', 0, 'password127'),
    ('Aria', 'Russo', 'aria.russo@example.com', '4445556666', '234 Pine Road', 0, 'password128'),
    ('Samuel', 'Ferrante', 'samuel.ferrante@example.com', '6665554444', '567 Oak Avenue', 0, 'password129'),
    ('Grace', 'DAmico', 'grace.damico@example.com', '5556667777', '890 Cedar Street', 0, 'password130'),
    -- User 131-140
    ('Jack', 'Battaglia', 'jack.battaglia@example.com', '7778889999', '123 Pine Road', 0, 'password131'),
    ('Sophia', 'Rinaldi', 'sophia.rinaldi@example.com', '5554443333', '456 Cedar Street', 0, 'password132'),
    ('Owen', 'Guerra', 'owen.guerra@example.com', '2223334444', '789 Elm Street', 0, 'password133'),
    ('Abigail', 'Marini', 'abigail.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password134'),
    ('Logan', 'Caruso', 'logan.caruso@example.com', '5556667777', '654 Maple Lane', 0, 'password135'),
    ('Avery', 'Barone', 'avery.barone@example.com', '1112223333', '987 Elm Street', 0, 'password136'),
    ('Emma', 'Valentini', 'emma.valentini@example.com', '4445556666', '234 Pine Road', 0, 'password137'),
    ('Carter', 'Battaglia', 'carter.battaglia@example.com', '6665554444', '567 Oak Avenue', 0, 'password138'),
    ('Madison', 'Bianchi', 'madison.bianchi@example.com', '5556667777', '890 Cedar Street', 0, 'password139'),
    ('Henry', 'Leone', 'henry.leone@example.com', '7778889999', '123 Pine Road', 0, 'password140'),
    -- User 141-150
    ('Jackson', 'Romano', 'jackson.romano@example.com', '5556667777', '890 Cedar Street', 0, 'password141'),
    ('Layla', 'Ricci', 'layla.ricci@example.com', '7778889999', '123 Pine Road', 0, 'password142'),
    ('Michael', 'Sorrentino', 'michael.sorrentino@example.com', '5554443333', '456 Cedar Street', 0, 'password143'),
    ('Chloe', 'De Angelis', 'chloe.deangelis@example.com', '2223334444', '789 Elm Street', 0, 'password144'),
    ('John', 'Marini', 'john.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password145'),
    ('Penelope', 'Lombardi', 'penelope.lombardi@example.com', '5556667777', '654 Maple Lane', 0, 'password146'),
    ('Daniel', 'De Rosa', 'daniel.derosa@example.com', '1112223333', '987 Elm Street', 0, 'password147'),
    ('Zoe', 'Russo', 'zoe.russo@example.com', '4445556666', '234 Pine Road', 0, 'password148'),
    ('Elijah', 'Ferrante', 'elijah.ferrante@example.com', '6665554444', '567 Oak Avenue', 0, 'password149'),
    ('Lily', 'DAmico', 'lily.damico@example.com', '5556667777', '890 Cedar Street', 0, 'password150'),
    -- User 151-160
    ('Gabriel', 'Battaglia', 'gabriel.battaglia@example.com', '7778889999', '123 Pine Road', 0, 'password151'),
    ('Sofia', 'Rinaldi', 'sofia.rinaldi@example.com', '5554443333', '456 Cedar Street', 0, 'password152'),
    ('Caleb', 'Guerra', 'caleb.guerra@example.com', '2223334444', '789 Elm Street', 0, 'password153'),
    ('Alyssa', 'Marini', 'alyssa.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password154'),
    ('Ryan', 'Caruso', 'ryan.caruso@example.com', '5556667777', '654 Maple Lane', 0, 'password155'),
    ('Leah', 'Barone', 'leah.barone@example.com', '1112223333', '987 Elm Street', 0, 'password156'),
    ('Nathan', 'Valentini', 'nathan.valentini@example.com', '4445556666', '234 Pine Road', 0, 'password157'),
    ('Audrey', 'Battaglia', 'audrey.battaglia@example.com', '6665554444', '567 Oak Avenue', 0, 'password158'),
    ('Anthony', 'Bianchi', 'anthony.bianchi@example.com', '5556667777', '890 Cedar Street', 0, 'password159'),
    ('Hannah', 'Leone', 'hannah.leone@example.com', '7778889999', '123 Pine Road', 0, 'password160'),
    -- User 161-170
    ('Isaac', 'Romano', 'isaac.romano@example.com', '5556667777', '890 Cedar Street', 0, 'password161'),
    ('Arianna', 'Ricci', 'arianna.ricci@example.com', '7778889999', '123 Pine Road', 0, 'password162'),
    ('Andrew', 'Sorrentino', 'andrew.sorrentino@example.com', '5554443333', '456 Cedar Street', 0, 'password163'),
    ('Mila', 'De Angelis', 'mila.deangelis@example.com', '2223334444', '789 Elm Street', 0, 'password164'),
    ('Julian', 'Marini', 'julian.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password165'),
    ('Nora', 'Lombardi', 'nora.lombardi@example.com', '5556667777', '654 Maple Lane', 0, 'password166'),
    ('Jonathan', 'De Rosa', 'jonathan.derosa@example.com', '1112223333', '987 Elm Street', 0, 'password167'),
    ('Camila', 'Russo', 'camila.russo@example.com', '4445556666', '234 Pine Road', 0, 'password168'),
    ('Josiah', 'Ferrante', 'josiah.ferrante@example.com', '6665554444', '567 Oak Avenue', 0, 'password169'),
    ('Addison', 'DAmico', 'addison.damico@example.com', '5556667777', '890 Cedar Street', 0, 'password170'),
    -- User 171-180
    ('Charles', 'Battaglia', 'charles.battaglia@example.com', '7778889999', '123 Pine Road', 0, 'password171'),
    ('Scarlett', 'Rinaldi', 'scarlett.rinaldi@example.com', '5554443333', '456 Cedar Street', 0, 'password172'),
    ('Jeremiah', 'Guerra', 'jeremiah.guerra@example.com', '2223334444', '789 Elm Street', 0, 'password173'),
    ('Hazel', 'Marini', 'hazel.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password174'),
    ('Josiah', 'Caruso', 'josiah.caruso@example.com', '5556667777', '654 Maple Lane', 0, 'password175'),
    ('Grace', 'Barone', 'grace.barone@example.com', '1112223333', '987 Elm Street', 0, 'password176'),
    ('Eli', 'Valentini', 'eli.valentini@example.com', '4445556666', '234 Pine Road', 0, 'password177'),
    ('Aubrey', 'Battaglia', 'aubrey.battaglia@example.com', '6665554444', '567 Oak Avenue', 0, 'password178'),
    ('Thomas', 'Bianchi', 'thomas.bianchi@example.com', '5556667777', '890 Cedar Street', 0, 'password179'),
    ('Aaliyah', 'Leone', 'aaliyah.leone@example.com', '7778889999', '123 Pine Road', 0, 'password180'),
    -- User 181-190
    ('Levi', 'Romano', 'levi.romano@example.com', '5556667777', '890 Cedar Street', 0, 'password181'),
    ('Victoria', 'Ricci', 'victoria.ricci@example.com', '7778889999', '123 Pine Road', 0, 'password182'),
    ('Nathan', 'Sorrentino', 'nathan.sorrentino@example.com', '5554443333', '456 Cedar Street', 0, 'password183'),
    ('Aurora', 'De Angelis', 'aurora.deangelis@example.com', '2223334444', '789 Elm Street', 0, 'password184'),
    ('Christopher', 'Marini', 'christopher.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password185'),
    ('Ella', 'Lombardi', 'ella.lombardi@example.com', '5556667777', '654 Maple Lane', 0, 'password186'),
    ('Adrian', 'De Rosa', 'adrian.derosa@example.com', '1112223333', '987 Elm Street', 0, 'password187'),
    ('Brooklyn', 'Russo', 'brooklyn.russo@example.com', '4445556666', '234 Pine Road', 0, 'password188'),
    ('Jonathan', 'Ferrante', 'jonathan.ferrante@example.com', '6665554444', '567 Oak Avenue', 0, 'password189'),
    ('Ellie', 'DAmico', 'ellie.damico@example.com', '5556667777', '890 Cedar Street', 0, 'password190'),
    -- User 191-200
    ('Aaron', 'Battaglia', 'aaron.battaglia@example.com', '7778889999', '123 Pine Road', 0, 'password191'),
    ('Maya', 'Rinaldi', 'maya.rinaldi@example.com', '5554443333', '456 Cedar Street', 0, 'password192'),
    ('Hunter', 'Guerra', 'hunter.guerra@example.com', '2223334444', '789 Elm Street', 0, 'password193'),
    ('Mila', 'Marini', 'mila.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password194'),
    ('Elias', 'Caruso', 'elias.caruso@example.com', '5556667777', '654 Maple Lane', 0, 'password195'),
    ('Stella', 'Barone', 'stella.barone@example.com', '1112223333', '987 Elm Street', 0, 'password196'),
    ('Jeremiah', 'Valentini', 'jeremiah.valentini@example.com', '4445556666', '234 Pine Road', 0, 'password197'),
    ('Gabriella', 'Battaglia', 'gabriella.battaglia@example.com', '6665554444', '567 Oak Avenue', 0, 'password198'),
    ('Christopher', 'Bianchi', 'christopher.bianchi@example.com', '5556667777', '890 Cedar Street', 0, 'password199'),
    ('Lucy', 'Leone', 'lucy.leone@example.com', '7778889999', '123 Pine Road', 0, 'password200'),
    -- User 201-210
    ('Asher', 'Romano', 'asher.romano@example.com', '5556667777', '890 Cedar Street', 0, 'password201'),
    ('Nova', 'Ricci', 'nova.ricci@example.com', '7778889999', '123 Pine Road', 0, 'password202'),
    ('Jeremiah', 'Sorrentino', 'jeremiah.sorrentino@example.com', '5554443333', '456 Cedar Street', 0, 'password203'),
    ('Luna', 'De Angelis', 'luna.deangelis@example.com', '2223334444', '789 Elm Street', 0, 'password204'),
    ('Mateo', 'Marini', 'mateo.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password205'),
    ('Aria', 'Lombardi', 'aria.lombardi@example.com', '5556667777', '654 Maple Lane', 0, 'password206'),
    ('Adam', 'De Rosa', 'adam.derosa@example.com', '1112223333', '987 Elm Street', 0, 'password207'),
    ('Hannah', 'Russo', 'hannah.russo@example.com', '4445556666', '234 Pine Road', 0, 'password208'),
    ('Julian', 'Ferrante', 'julian.ferrante@example.com', '6665554444', '567 Oak Avenue', 0, 'password209'),
    ('Zoe', 'DAmico', 'zoe.damico@example.com', '5556667777', '890 Cedar Street', 0, 'password210'),
    -- User 211-220
    ('Elijah', 'Battaglia', 'elijah.battaglia@example.com', '7778889999', '123 Pine Road', 0, 'password211'),
    ('Lily', 'Rinaldi', 'lily.rinaldi@example.com', '5554443333', '456 Cedar Street', 0, 'password212'),
    ('Sebastian', 'Guerra', 'sebastian.guerra@example.com', '2223334444', '789 Elm Street', 0, 'password213'),
    ('Grace', 'Marini', 'grace.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password214'),
    ('Eli', 'Caruso', 'eli.caruso@example.com', '5556667777', '654 Maple Lane', 0, 'password215'),
    ('Mia', 'Barone', 'mia.barone@example.com', '1112223333', '987 Elm Street', 0, 'password216'),
    ('Joseph', 'Valentini', 'joseph.valentini@example.com', '4445556666', '234 Pine Road', 0, 'password217'),
    ('Eleanor', 'Battaglia', 'eleanor.battaglia@example.com', '6665554444', '567 Oak Avenue', 0, 'password218'),
    ('David', 'Bianchi', 'david.bianchi@example.com', '5556667777', '890 Cedar Street', 0, 'password219'),
    ('Mila', 'Leone', 'mila.leone@example.com', '7778889999', '123 Pine Road', 0, 'password220'),
    -- User 221-230
    ('Caleb', 'Romano', 'caleb.romano@example.com', '5556667777', '890 Cedar Street', 0, 'password221'),
    ('Amelia', 'Ricci', 'amelia.ricci@example.com', '7778889999', '123 Pine Road', 0, 'password222'),
    ('Daniel', 'Sorrentino', 'daniel.sorrentino@example.com', '5554443333', '456 Cedar Street', 0, 'password223'),
    ('Sophia', 'De Angelis', 'sophia.deangelis@example.com', '2223334444', '789 Elm Street', 0, 'password224'),
    ('Michael', 'Marini', 'michael.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password225'),
    ('Avery', 'Lombardi', 'avery.lombardi@example.com', '5556667777', '654 Maple Lane', 0, 'password226'),
    ('Scarlett', 'De Rosa', 'scarlett.derosa@example.com', '1112223333', '987 Elm Street', 0, 'password227'),
    ('Henry', 'Russo', 'henry.russo@example.com', '4445556666', '234 Pine Road', 0, 'password228'),
    ('Violet', 'Ferrante', 'violet.ferrante@example.com', '6665554444', '567 Oak Avenue', 0, 'password229'),
    ('Ethan', 'DAmico', 'ethan.damico@example.com', '5556667777', '890 Cedar Street', 0, 'password230'),
    -- User 231-240
    ('Abigail', 'Battaglia', 'abigail.battaglia@example.com', '7778889999', '123 Pine Road', 0, 'password231'),
    ('Charlotte', 'Rinaldi', 'charlotte.rinaldi@example.com', '5554443333', '456 Cedar Street', 0, 'password232'),
    ('Benjamin', 'Guerra', 'benjamin.guerra@example.com', '2223334444', '789 Elm Street', 0, 'password233'),
    ('Elizabeth', 'Marini', 'elizabeth.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password234'),
    ('Sofia', 'Caruso', 'sofia.caruso@example.com', '5556667777', '654 Maple Lane', 0, 'password235'),
    ('Daniel', 'Barone', 'daniel.barone@example.com', '1112223333', '987 Elm Street', 0, 'password236'),
    ('Mason', 'Valentini', 'mason.valentini@example.com', '4445556666', '234 Pine Road', 0, 'password237'),
    ('Emily', 'Battaglia', 'emily.battaglia@example.com', '6665554444', '567 Oak Avenue', 0, 'password238'),
    ('Jackson', 'Bianchi', 'jackson.bianchi@example.com', '5556667777', '890 Cedar Street', 0, 'password239'),
    ('Evelyn', 'Leone', 'evelyn.leone@example.com', '7778889999', '123 Pine Road', 0, 'password240'),
    -- User 241-250
    ('Oliver', 'Romano', 'oliver.romano@example.com', '5556667777', '890 Cedar Street', 0, 'password241'),
    ('Ava', 'Ricci', 'ava.ricci@example.com', '7778889999', '123 Pine Road', 0, 'password242'),
    ('William', 'Sorrentino', 'william.sorrentino@example.com', '5554443333', '456 Cedar Street', 0, 'password243'),
    ('Harper', 'De Angelis', 'harper.deangelis@example.com', '2223334444', '789 Elm Street', 0, 'password244'),
    ('James', 'Marini', 'james.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password245'),
    ('Mila', 'Lombardi', 'mila.lombardi@example.com', '5556667777', '654 Maple Lane', 0, 'password246'),
    ('Sebastian', 'De Rosa', 'sebastian.derosa@example.com', '1112223333', '987 Elm Street', 0, 'password247'),
    ('Evelyn', 'Russo', 'evelyn.russo@example.com', '4445556666', '234 Pine Road', 0, 'password248'),
    ('Michael', 'Ferrante', 'michael.ferrante@example.com', '6665554444', '567 Oak Avenue', 0, 'password249'),
    ('Emma', 'DAmico', 'emma.damico@example.com', '5556667777', '890 Cedar Street', 0, 'password250'),
    -- User 251-260
    ('Jacob', 'Battaglia', 'jacob.battaglia@example.com', '7778889999', '123 Pine Road', 0, 'password251'),
    ('Ella', 'Rinaldi', 'ella.rinaldi@example.com', '5554443333', '456 Cedar Street', 0, 'password252'),
    ('Alexander', 'Guerra', 'alexander.guerra@example.com', '2223334444', '789 Elm Street', 0, 'password253'),
    ('Liam', 'Marini', 'liam.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password254'),
    ('Mia', 'Caruso', 'mia.caruso@example.com', '5556667777', '654 Maple Lane', 0, 'password255'),
    ('Emily', 'Barone', 'emily.barone@example.com', '1112223333', '987 Elm Street', 0, 'password256'),
    ('Samuel', 'Valentini', 'samuel.valentini@example.com', '4445556666', '234 Pine Road', 0, 'password257'),
    ('Victoria', 'Battaglia', 'victoria.battaglia@example.com', '6665554444', '567 Oak Avenue', 0, 'password258'),
    ('Daniel', 'Bianchi', 'daniel.bianchi@example.com', '5556667777', '890 Cedar Street', 0, 'password259'),
    ('Aria', 'Leone', 'aria.leone@example.com', '7778889999', '123 Pine Road', 0, 'password260'),
    -- User 261-270
    ('Jackson', 'Romano', 'jackson.romano@example.com', '5556667777', '890 Cedar Street', 0, 'password261'),
    ('Luna', 'Ricci', 'luna.ricci@example.com', '7778889999', '123 Pine Road', 0, 'password262'),
    ('Benjamin', 'Sorrentino', 'benjamin.sorrentino@example.com', '5554443333', '456 Cedar Street', 0, 'password263'),
    ('Lily', 'De Angelis', 'lily.deangelis@example.com', '2223334444', '789 Elm Street', 0, 'password264'),
    ('William', 'Marini', 'william.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password265'),
    ('Elijah', 'Lombardi', 'elijah.lombardi@example.com', '5556667777', '654 Maple Lane', 0, 'password266'),
    ('Avery', 'De Rosa', 'avery.derosa@example.com', '1112223333', '987 Elm Street', 0, 'password267'),
    ('Ella', 'Russo', 'ella.russo@example.com', '4445556666', '234 Pine Road', 0, 'password268'),
    ('Oliver', 'Ferrante', 'oliver.ferrante@example.com', '6665554444', '567 Oak Avenue', 0, 'password269'),
    ('Charlotte', 'DAmico', 'charlotte.damico@example.com', '5556667777', '890 Cedar Street', 0, 'password270'),
    -- User 271-280
    ('Lucas', 'Battaglia', 'lucas.battaglia@example.com', '7778889999', '123 Pine Road', 0, 'password271'),
    ('Sophia', 'Rinaldi', 'sophia.rinaldi@example.com', '5554443333', '456 Cedar Street', 0, 'password272'),
    ('Henry', 'Guerra', 'henry.guerra@example.com', '2223334444', '789 Elm Street', 0, 'password273'),
    ('Daniel', 'Marini', 'daniel.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password274'),
    ('Harper', 'Caruso', 'harper.caruso@example.com', '5556667777', '654 Maple Lane', 0, 'password275'),
    ('Ava', 'Barone', 'ava.barone@example.com', '1112223333', '987 Elm Street', 0, 'password276'),
    ('Ethan', 'Valentini', 'ethan.valentini@example.com', '4445556666', '234 Pine Road', 0, 'password277'),
    ('Isabella', 'Battaglia', 'isabella.battaglia@example.com', '6665554444', '567 Oak Avenue', 0, 'password278'),
    ('Mason', 'Bianchi', 'mason.bianchi@example.com', '5556667777', '890 Cedar Street', 0, 'password279'),
    ('Liam', 'Leone', 'liam.leone@example.com', '7778889999', '123 Pine Road', 0, 'password280'),
    -- User 281-290
    ('Olivia', 'Romano', 'olivia.romano@example.com', '5556667777', '890 Cedar Street', 0, 'password281'),
    ('Emma', 'Ricci', 'emma.ricci@example.com', '7778889999', '123 Pine Road', 0, 'password282'),
    ('Aiden', 'Sorrentino', 'aiden.sorrentino@example.com', '5554443333', '456 Cedar Street', 0, 'password283'),
    ('Noah', 'De Angelis', 'noah.deangelis@example.com', '2223334444', '789 Elm Street', 0, 'password284'),
    ('Aria', 'Marini', 'aria.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password285'),
    ('Sophia', 'Lombardi', 'sophia.lombardi@example.com', '5556667777', '654 Maple Lane', 0, 'password286'),
    ('Jackson', 'De Rosa', 'jackson.derosa@example.com', '1112223333', '987 Elm Street', 0, 'password287'),
    ('Evelyn', 'Russo', 'evelyn.russo@example.com', '4445556666', '234 Pine Road', 0, 'password288'),
    ('Michael', 'Ferrante', 'michael.ferrante@example.com', '6665554444', '567 Oak Avenue', 0, 'password289'),
    ('Isabella', 'DAmico', 'isabella.damico@example.com', '5556667777', '890 Cedar Street', 0, 'password290'),
    -- User 291-300
    ('James', 'Battaglia', 'james.battaglia@example.com', '7778889999', '123 Pine Road', 0, 'password291'),
    ('Olivia', 'Rinaldi', 'olivia.rinaldi@example.com', '5554443333', '456 Cedar Street', 0, 'password292'),
    ('William', 'Guerra', 'william.guerra@example.com', '2223334444', '789 Elm Street', 0, 'password293'),
    ('Emma', 'Marini', 'emma.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password294'),
    ('Noah', 'Caruso', 'noah.caruso@example.com', '5556667777', '654 Maple Lane', 0, 'password295'),
    ('Sophia', 'Barone', 'sophia.barone@example.com', '1112223333', '987 Elm Street', 0, 'password296'),
    ('Aiden', 'Valentini', 'aiden.valentini@example.com', '4445556666', '234 Pine Road', 0, 'password297'),
    ('Isabella', 'Battaglia', 'isabella.battaglia@example.com', '6665554444', '567 Oak Avenue', 0, 'password298'),
    ('Michael', 'Bianchi', 'michael.bianchi@example.com', '5556667777', '890 Cedar Street', 0, 'password299'),
    ('Evelyn', 'Leone', 'evelyn.leone@example.com', '7778889999', '123 Pine Road', 0, 'password300');

INSERT INTO Users (FirstName, LastName, Email, Phone, Address, IsAdmin, Password)
VALUES
    ('Liam', 'Romano', 'liam.romano@example.com', '5556667777', '890 Cedar Street', 0, 'password301'),
    ('Olivia', 'Ricci', 'olivia.ricci@example.com', '7778889999', '123 Pine Road', 0, 'password302'),
    ('Noah', 'Sorrentino', 'noah.sorrentino@example.com', '5554443333', '456 Cedar Street', 0, 'password303'),
    ('Emma', 'De Angelis', 'emma.deangelis@example.com', '2223334444', '789 Elm Street', 0, 'password304'),
    ('Ava', 'Marini', 'ava.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password305'),
    ('Sophia', 'Lombardi', 'sophia.lombardi@example.com', '5556667777', '654 Maple Lane', 0, 'password306'),
    ('Jackson', 'De Rosa', 'jackson.derosa@example.com', '1112223333', '987 Elm Street', 0, 'password307'),
    ('Oliver', 'Russo', 'oliver.russo@example.com', '4445556666', '234 Pine Road', 0, 'password308'),
    ('Avery', 'Ferrante', 'avery.ferrante@example.com', '6665554444', '567 Oak Avenue', 0, 'password309'),
    ('Ella', 'DAmico', 'ella.damico@example.com', '5556667777', '890 Cedar Street', 0, 'password310'),
    -- User 311-320
    ('Lucas', 'Battaglia', 'lucas.battaglia@example.com', '7778889999', '123 Pine Road', 0, 'password311'),
    ('Sophia', 'Rinaldi', 'sophia.rinaldi@example.com', '5554443333', '456 Cedar Street', 0, 'password312'),
    ('Henry', 'Guerra', 'henry.guerra@example.com', '2223334444', '789 Elm Street', 0, 'password313'),
    ('Daniel', 'Marini', 'daniel.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password314'),
    ('Harper', 'Caruso', 'harper.caruso@example.com', '5556667777', '654 Maple Lane', 0, 'password315'),
    ('Ava', 'Barone', 'ava.barone@example.com', '1112223333', '987 Elm Street', 0, 'password316'),
    ('Ethan', 'Valentini', 'ethan.valentini@example.com', '4445556666', '234 Pine Road', 0, 'password317'),
    ('Isabella', 'Battaglia', 'isabella.battaglia@example.com', '6665554444', '567 Oak Avenue', 0, 'password318'),
    ('Mason', 'Bianchi', 'mason.bianchi@example.com', '5556667777', '890 Cedar Street', 0, 'password319'),
    ('Liam', 'Leone', 'liam.leone@example.com', '7778889999', '123 Pine Road', 0, 'password320'),
    -- User 321-330
    ('Olivia', 'Romano', 'olivia.romano@example.com', '5556667777', '890 Cedar Street', 0, 'password321'),
    ('Noah', 'Ricci', 'noah.ricci@example.com', '7778889999', '123 Pine Road', 0, 'password322'),
    ('Emma', 'Sorrentino', 'emma.sorrentino@example.com', '5554443333', '456 Cedar Street', 0, 'password323'),
    ('Liam', 'De Angelis', 'liam.deangelis@example.com', '2223334444', '789 Elm Street', 0, 'password324'),
    ('Oliver', 'Marini', 'oliver.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password325'),
    ('Ava', 'Lombardi', 'ava.lombardi@example.com', '5556667777', '654 Maple Lane', 0, 'password326'),
    ('Sophia', 'De Rosa', 'sophia.derosa@example.com', '1112223333', '987 Elm Street', 0, 'password327'),
    ('Jackson', 'Russo', 'jackson.russo@example.com', '4445556666', '234 Pine Road', 0, 'password328'),
    ('Olivia', 'Ferrante', 'olivia.ferrante@example.com', '6665554444', '567 Oak Avenue', 0, 'password329'),
    ('William', 'DAmico', 'william.damico@example.com', '5556667777', '890 Cedar Street', 0, 'password330'),
    -- User 331-340
    ('Emma', 'Battaglia', 'emma.battaglia@example.com', '7778889999', '123 Pine Road', 0, 'password331'),
    ('Noah', 'Rinaldi', 'noah.rinaldi@example.com', '5554443333', '456 Cedar Street', 0, 'password332'),
    ('Oliver', 'Guerra', 'oliver.guerra@example.com', '2223334444', '789 Elm Street', 0, 'password333'),
    ('Ava', 'Marini', 'ava.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password334'),
    ('Liam', 'Caruso', 'liam.caruso@example.com', '5556667777', '654 Maple Lane', 0, 'password335'),
    ('Olivia', 'Barone', 'olivia.barone@example.com', '1112223333', '987 Elm Street', 0, 'password336'),
    ('Noah', 'Valentini', 'noah.valentini@example.com', '4445556666', '234 Pine Road', 0, 'password337'),
    ('Emma', 'Battaglia', 'emma.battaglia@example.com', '6665554444', '567 Oak Avenue', 0, 'password338'),
    ('Oliver', 'Bianchi', 'oliver.bianchi@example.com', '5556667777', '890 Cedar Street', 0, 'password339'),
    ('Ava', 'Leone', 'ava.leone@example.com', '7778889999', '123 Pine Road', 0, 'password340'),
    -- User 341-350
    ('Liam', 'Romano', 'liam.romano@example.com', '5556667777', '890 Cedar Street', 0, 'password341'),
    ('Olivia', 'Ricci', 'olivia.ricci@example.com', '7778889999', '123 Pine Road', 0, 'password342'),
    ('Noah', 'Sorrentino', 'noah.sorrentino@example.com', '5554443333', '456 Cedar Street', 0, 'password343'),
    ('Emma', 'De Angelis', 'emma.deangelis@example.com', '2223334444', '789 Elm Street', 0, 'password344'),
    ('Ava', 'Marini', 'ava.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password345'),
    ('Sophia', 'Lombardi', 'sophia.lombardi@example.com', '5556667777', '654 Maple Lane', 0, 'password346'),
    ('Jackson', 'De Rosa', 'jackson.derosa@example.com', '1112223333', '987 Elm Street', 0, 'password347'),
    ('Oliver', 'Russo', 'oliver.russo@example.com', '4445556666', '234 Pine Road', 0, 'password348'),
    ('Avery', 'Ferrante', 'avery.ferrante@example.com', '6665554444', '567 Oak Avenue', 0, 'password349'),
    ('Ella', 'DAmico', 'ella.damico@example.com', '5556667777', '890 Cedar Street', 0, 'password350'),
    -- User 351-360
    ('Lucas', 'Battaglia', 'lucas.battaglia@example.com', '7778889999', '123 Pine Road', 0, 'password351'),
    ('Sophia', 'Rinaldi', 'sophia.rinaldi@example.com', '5554443333', '456 Cedar Street', 0, 'password352'),
    ('Henry', 'Guerra', 'henry.guerra@example.com', '2223334444', '789 Elm Street', 0, 'password353'),
    ('Daniel', 'Marini', 'daniel.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password354'),
    ('Harper', 'Caruso', 'harper.caruso@example.com', '5556667777', '654 Maple Lane', 0, 'password355'),
    ('Ava', 'Barone', 'ava.barone@example.com', '1112223333', '987 Elm Street', 0, 'password356'),
    ('Ethan', 'Valentini', 'ethan.valentini@example.com', '4445556666', '234 Pine Road', 0, 'password357'),
    ('Isabella', 'Battaglia', 'isabella.battaglia@example.com', '6665554444', '567 Oak Avenue', 0, 'password358'),
    ('Mason', 'Bianchi', 'mason.bianchi@example.com', '5556667777', '890 Cedar Street', 0, 'password359'),
    ('Liam', 'Leone', 'liam.leone@example.com', '7778889999', '123 Pine Road', 0, 'password360'),
    -- User 361-370
    ('Olivia', 'Romano', 'olivia.romano@example.com', '5556667777', '890 Cedar Street', 0, 'password361'),
    ('Noah', 'Ricci', 'noah.ricci@example.com', '7778889999', '123 Pine Road', 0, 'password362'),
    ('Emma', 'Sorrentino', 'emma.sorrentino@example.com', '5554443333', '456 Cedar Street', 0, 'password363'),
    ('Liam', 'De Angelis', 'liam.deangelis@example.com', '2223334444', '789 Elm Street', 0, 'password364'),
    ('Oliver', 'Marini', 'oliver.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password365'),
    ('Ava', 'Lombardi', 'ava.lombardi@example.com', '5556667777', '654 Maple Lane', 0, 'password366'),
    ('Sophia', 'De Rosa', 'sophia.derosa@example.com', '1112223333', '987 Elm Street', 0, 'password367'),
    ('Jackson', 'Russo', 'jackson.russo@example.com', '4445556666', '234 Pine Road', 0, 'password368'),
    ('Olivia', 'Ferrante', 'olivia.ferrante@example.com', '6665554444', '567 Oak Avenue', 0, 'password369'),
    ('William', 'DAmico', 'william.damico@example.com', '5556667777', '890 Cedar Street', 0, 'password370'),
    -- User 371-380
    ('Emma', 'Battaglia', 'emma.battaglia@example.com', '7778889999', '123 Pine Road', 0, 'password371'),
    ('Noah', 'Rinaldi', 'noah.rinaldi@example.com', '5554443333', '456 Cedar Street', 0, 'password372'),
    ('Oliver', 'Guerra', 'oliver.guerra@example.com', '2223334444', '789 Elm Street', 0, 'password373'),
    ('Ava', 'Marini', 'ava.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password374'),
    ('Liam', 'Caruso', 'liam.caruso@example.com', '5556667777', '654 Maple Lane', 0, 'password375'),
    ('Olivia', 'Barone', 'olivia.barone@example.com', '1112223333', '987 Elm Street', 0, 'password376'),
    ('Noah', 'Valentini', 'noah.valentini@example.com', '4445556666', '234 Pine Road', 0, 'password377'),
    ('Emma', 'Battaglia', 'emma.battaglia@example.com', '6665554444', '567 Oak Avenue', 0, 'password378'),
    ('Oliver', 'Bianchi', 'oliver.bianchi@example.com', '5556667777', '890 Cedar Street', 0, 'password379'),
    ('Ava', 'Leone', 'ava.leone@example.com', '7778889999', '123 Pine Road', 0, 'password380'),
    -- User 381-390
    ('Liam', 'Romano', 'liam.romano@example.com', '5556667777', '890 Cedar Street', 0, 'password381'),
    ('Olivia', 'Ricci', 'olivia.ricci@example.com', '7778889999', '123 Pine Road', 0, 'password382'),
    ('Noah', 'Sorrentino', 'noah.sorrentino@example.com', '5554443333', '456 Cedar Street', 0, 'password383'),
    ('Emma', 'De Angelis', 'emma.deangelis@example.com', '2223334444', '789 Elm Street', 0, 'password384'),
    ('Ava', 'Marini', 'ava.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password385'),
    ('Sophia', 'Lombardi', 'sophia.lombardi@example.com', '5556667777', '654 Maple Lane', 0, 'password386'),
    ('Jackson', 'De Rosa', 'jackson.derosa@example.com', '1112223333', '987 Elm Street', 0, 'password387'),
    ('Oliver', 'Russo', 'oliver.russo@example.com', '4445556666', '234 Pine Road', 0, 'password388'),
    ('Avery', 'Ferrante', 'avery.ferrante@example.com', '6665554444', '567 Oak Avenue', 0, 'password389'),
    ('Ella', 'DAmico', 'ella.damico@example.com', '5556667777', '890 Cedar Street', 0, 'password390'),
    -- User 391-400
    ('Lucas', 'Battaglia', 'lucas.battaglia@example.com', '7778889999', '123 Pine Road', 0, 'password391'),
    ('Sophia', 'Rinaldi', 'sophia.rinaldi@example.com', '5554443333', '456 Cedar Street', 0, 'password392'),
    ('Henry', 'Guerra', 'henry.guerra@example.com', '2223334444', '789 Elm Street', 0, 'password393'),
    ('Daniel', 'Marini', 'daniel.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password394'),
    ('Harper', 'Caruso', 'harper.caruso@example.com', '5556667777', '654 Maple Lane', 0, 'password395'),
    ('Ava', 'Barone', 'ava.barone@example.com', '1112223333', '987 Elm Street', 0, 'password396'),
    ('Ethan', 'Valentini', 'ethan.valentini@example.com', '4445556666', '234 Pine Road', 0, 'password397'),
    ('Isabella', 'Battaglia', 'isabella.battaglia@example.com', '6665554444', '567 Oak Avenue', 0, 'password398'),
    ('Mason', 'Bianchi', 'mason.bianchi@example.com', '5556667777', '890 Cedar Street', 0, 'password399'),
    ('Liam', 'Leone', 'liam.leone@example.com', '7778889999', '123 Pine Road', 0, 'password400');

INSERT INTO Users (FirstName, LastName, Email, Phone, Address, IsAdmin, Password) VALUES
    -- User 401-410
    ('Olivia', 'Romano', 'olivia.romano@example.com', '5556667777', '890 Cedar Street', 0, 'password401'),
    ('Noah', 'Ricci', 'noah.ricci@example.com', '7778889999', '123 Pine Road', 0, 'password402'),
    ('Emma', 'Sorrentino', 'emma.sorrentino@example.com', '5554443333', '456 Cedar Street', 0, 'password403'),
    ('Liam', 'De Angelis', 'liam.deangelis@example.com', '2223334444', '789 Elm Street', 0, 'password404'),
    ('Oliver', 'Marini', 'oliver.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password405'),
    ('Ava', 'Lombardi', 'ava.lombardi@example.com', '5556667777', '654 Maple Lane', 0, 'password406'),
    ('Sophia', 'De Rosa', 'sophia.derosa@example.com', '1112223333', '987 Elm Street', 0, 'password407'),
    ('Jackson', 'Russo', 'jackson.russo@example.com', '4445556666', '234 Pine Road', 0, 'password408'),
    ('Olivia', 'Ferrante', 'olivia.ferrante@example.com', '6665554444', '567 Oak Avenue', 0, 'password409'),
    ('William', 'DAmico', 'william.damico@example.com', '5556667777', '890 Cedar Street', 0, 'password410'),
    -- User 411-420
    ('Emma', 'Battaglia', 'emma.battaglia@example.com', '7778889999', '123 Pine Road', 0, 'password411'),
    ('Noah', 'Rinaldi', 'noah.rinaldi@example.com', '5554443333', '456 Cedar Street', 0, 'password412'),
    ('Oliver', 'Guerra', 'oliver.guerra@example.com', '2223334444', '789 Elm Street', 0, 'password413'),
    ('Ava', 'Marini', 'ava.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password414'),
    ('Liam', 'Caruso', 'liam.caruso@example.com', '5556667777', '654 Maple Lane', 0, 'password415'),
    ('Olivia', 'Barone', 'olivia.barone@example.com', '1112223333', '987 Elm Street', 0, 'password416'),
    ('Noah', 'Valentini', 'noah.valentini@example.com', '4445556666', '234 Pine Road', 0, 'password417'),
    ('Emma', 'Battaglia', 'emma.battaglia@example.com', '6665554444', '567 Oak Avenue', 0, 'password418'),
    ('Oliver', 'Bianchi', 'oliver.bianchi@example.com', '5556667777', '890 Cedar Street', 0, 'password419'),
    ('Ava', 'Leone', 'ava.leone@example.com', '7778889999', '123 Pine Road', 0, 'password420'),
    -- User 421-430
    ('Sophia', 'Romano', 'sophia.romano@example.com', '5556667777', '890 Cedar Street', 0, 'password421'),
    ('Jackson', 'Ricci', 'jackson.ricci@example.com', '7778889999', '123 Pine Road', 0, 'password422'),
    ('Olivia', 'Sorrentino', 'olivia.sorrentino@example.com', '5554443333', '456 Cedar Street', 0, 'password423'),
    ('Noah', 'De Angelis', 'noah.deangelis@example.com', '2223334444', '789 Elm Street', 0, 'password424'),
    ('Emma', 'Marini', 'emma.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password425'),
    ('Liam', 'Lombardi', 'liam.lombardi@example.com', '5556667777', '654 Maple Lane', 0, 'password426'),
    ('Oliver', 'De Rosa', 'oliver.derosa@example.com', '1112223333', '987 Elm Street', 0, 'password427'),
    ('Ava', 'Russo', 'ava.russo@example.com', '4445556666', '234 Pine Road', 0, 'password428'),
    ('Sophia', 'Ferrante', 'sophia.ferrante@example.com', '6665554444', '567 Oak Avenue', 0, 'password429'),
    ('Jackson', 'DAmico', 'jackson.damico@example.com', '5556667777', '890 Cedar Street', 0, 'password430'),
    -- User 431-440
    ('Oliver', 'Battaglia', 'oliver.battaglia@example.com', '7778889999', '123 Pine Road', 0, 'password431'),
    ('Ava', 'Rinaldi', 'ava.rinaldi@example.com', '5554443333', '456 Cedar Street', 0, 'password432'),
    ('Liam', 'Guerra', 'liam.guerra@example.com', '2223334444', '789 Elm Street', 0, 'password433'),
    ('Olivia', 'Marini', 'olivia.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password434'),
    ('Noah', 'Caruso', 'noah.caruso@example.com', '5556667777', '654 Maple Lane', 0, 'password435'),
    ('Emma', 'Barone', 'emma.barone@example.com', '1112223333', '987 Elm Street', 0, 'password436'),
    ('Liam', 'Valentini', 'liam.valentini@example.com', '4445556666', '234 Pine Road', 0, 'password437'),
    ('Oliver', 'Battaglia', 'oliver.battaglia@example.com', '6665554444', '567 Oak Avenue', 0, 'password438'),
    ('Ava', 'Bianchi', 'ava.bianchi@example.com', '5556667777', '890 Cedar Street', 0, 'password439'),
    ('Sophia', 'Leone', 'sophia.leone@example.com', '7778889999', '123 Pine Road', 0, 'password440'),
    -- User 441-450
    ('Noah', 'Romano', 'noah.romano@example.com', '5556667777', '890 Cedar Street', 0, 'password441'),
    ('Emma', 'Ricci', 'emma.ricci@example.com', '7778889999', '123 Pine Road', 0, 'password442'),
    ('Liam', 'Sorrentino', 'liam.sorrentino@example.com', '5554443333', '456 Cedar Street', 0, 'password443'),
    ('Oliver', 'De Angelis', 'oliver.deangelis@example.com', '2223334444', '789 Elm Street', 0, 'password444'),
    ('Ava', 'Marini', 'ava.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password445'),
    ('Sophia', 'Lombardi', 'sophia.lombardi@example.com', '5556667777', '654 Maple Lane', 0, 'password446'),
    ('Jackson', 'De Rosa', 'jackson.derosa@example.com', '1112223333', '987 Elm Street', 0, 'password447'),
    ('Olivia', 'Russo', 'olivia.russo@example.com', '4445556666', '234 Pine Road', 0, 'password448'),
    ('Noah', 'Ferrante', 'noah.ferrante@example.com', '6665554444', '567 Oak Avenue', 0, 'password449'),
    ('Emma', 'DAmico', 'emma.damico@example.com', '5556667777', '890 Cedar Street', 0, 'password450'),
    -- User 451-460
    ('Oliver', 'Battaglia', 'oliver.battaglia@example.com', '7778889999', '123 Pine Road', 0, 'password451'),
    ('Ava', 'Rinaldi', 'ava.rinaldi@example.com', '5554443333', '456 Cedar Street', 0, 'password452'),
    ('Liam', 'Guerra', 'liam.guerra@example.com', '2223334444', '789 Elm Street', 0, 'password453'),
    ('Olivia', 'Marini', 'olivia.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password454'),
    ('Noah', 'Caruso', 'noah.caruso@example.com', '5556667777', '654 Maple Lane', 0, 'password455'),
    ('Emma', 'Barone', 'emma.barone@example.com', '1112223333', '987 Elm Street', 0, 'password456'),
    ('Liam', 'Valentini', 'liam.valentini@example.com', '4445556666', '234 Pine Road', 0, 'password457'),
    ('Oliver', 'Battaglia', 'oliver.battaglia@example.com', '6665554444', '567 Oak Avenue', 0, 'password458'),
    ('Ava', 'Bianchi', 'ava.bianchi@example.com', '5556667777', '890 Cedar Street', 0, 'password459'),
    ('Sophia', 'Leone', 'sophia.leone@example.com', '7778889999', '123 Pine Road', 0, 'password460'),
    -- User 461-470
    ('Noah', 'Romano', 'noah.romano@example.com', '5556667777', '890 Cedar Street', 0, 'password461'),
    ('Emma', 'Ricci', 'emma.ricci@example.com', '7778889999', '123 Pine Road', 0, 'password462'),
    ('Liam', 'Sorrentino', 'liam.sorrentino@example.com', '5554443333', '456 Cedar Street', 0, 'password463'),
    ('Oliver', 'De Angelis', 'oliver.deangelis@example.com', '2223334444', '789 Elm Street', 0, 'password464'),
    ('Ava', 'Marini', 'ava.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password465'),
    ('Sophia', 'Lombardi', 'sophia.lombardi@example.com', '5556667777', '654 Maple Lane', 0, 'password466'),
    ('Jackson', 'De Rosa', 'jackson.derosa@example.com', '1112223333', '987 Elm Street', 0, 'password467'),
    ('Olivia', 'Russo', 'olivia.russo@example.com', '4445556666', '234 Pine Road', 0, 'password468'),
    ('Noah', 'Ferrante', 'noah.ferrante@example.com', '6665554444', '567 Oak Avenue', 0, 'password469'),
    ('Emma', 'DAmico', 'emma.damico@example.com', '5556667777', '890 Cedar Street', 0, 'password470'),
    -- User 471-480
    ('Oliver', 'Battaglia', 'oliver.battaglia@example.com', '7778889999', '123 Pine Road', 0, 'password471'),
    ('Ava', 'Rinaldi', 'ava.rinaldi@example.com', '5554443333', '456 Cedar Street', 0, 'password472'),
    ('Liam', 'Guerra', 'liam.guerra@example.com', '2223334444', '789 Elm Street', 0, 'password473'),
    ('Olivia', 'Marini', 'olivia.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password474'),
    ('Noah', 'Caruso', 'noah.caruso@example.com', '5556667777', '654 Maple Lane', 0, 'password475'),
    ('Emma', 'Barone', 'emma.barone@example.com', '1112223333', '987 Elm Street', 0, 'password476'),
    ('Liam', 'Valentini', 'liam.valentini@example.com', '4445556666', '234 Pine Road', 0, 'password477'),
    ('Oliver', 'Battaglia', 'oliver.battaglia@example.com', '6665554444', '567 Oak Avenue', 0, 'password478'),
    ('Ava', 'Bianchi', 'ava.bianchi@example.com', '5556667777', '890 Cedar Street', 0, 'password479'),
    ('Sophia', 'Leone', 'sophia.leone@example.com', '7778889999', '123 Pine Road', 0, 'password480'),
    -- User 481-490
    ('Noah', 'Romano', 'noah.romano@example.com', '5556667777', '890 Cedar Street', 0, 'password481'),
    ('Emma', 'Ricci', 'emma.ricci@example.com', '7778889999', '123 Pine Road', 0, 'password482'),
    ('Liam', 'Sorrentino', 'liam.sorrentino@example.com', '5554443333', '456 Cedar Street', 0, 'password483'),
    ('Oliver', 'De Angelis', 'oliver.deangelis@example.com', '2223334444', '789 Elm Street', 0, 'password484'),
    ('Ava', 'Marini', 'ava.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password485'),
    ('Sophia', 'Lombardi', 'sophia.lombardi@example.com', '5556667777', '654 Maple Lane', 0, 'password486'),
    ('Jackson', 'De Rosa', 'jackson.derosa@example.com', '1112223333', '987 Elm Street', 0, 'password487'),
    ('Olivia', 'Russo', 'olivia.russo@example.com', '4445556666', '234 Pine Road', 0, 'password488'),
    ('Noah', 'Ferrante', 'noah.ferrante@example.com', '6665554444', '567 Oak Avenue', 0, 'password489'),
    ('Emma', 'DAmico', 'emma.damico@example.com', '5556667777', '890 Cedar Street', 0, 'password490'),
    -- User 491-500
    ('Oliver', 'Battaglia', 'oliver.battaglia@example.com', '7778889999', '123 Pine Road', 0, 'password491'),
    ('Ava', 'Rinaldi', 'ava.rinaldi@example.com', '5554443333', '456 Cedar Street', 0, 'password492'),
    ('Liam', 'Guerra', 'liam.guerra@example.com', '2223334444', '789 Elm Street', 0, 'password493'),
    ('Olivia', 'Marini', 'olivia.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password494'),
    ('Noah', 'Caruso', 'noah.caruso@example.com', '5556667777', '654 Maple Lane', 0, 'password495'),
    ('Emma', 'Barone', 'emma.barone@example.com', '1112223333', '987 Elm Street', 0, 'password496'),
    ('Liam', 'Valentini', 'liam.valentini@example.com', '4445556666', '234 Pine Road', 0, 'password497'),
    ('Oliver', 'Battaglia', 'oliver.battaglia@example.com', '6665554444', '567 Oak Avenue', 0, 'password498'),
    ('Ava', 'Bianchi', 'ava.bianchi@example.com', '5556667777', '890 Cedar Street', 0, 'password499'),
    ('Sophia', 'Leone', 'sophia.leone@example.com', '7778889999', '123 Pine Road', 0, 'password500');

INSERT INTO Users (FirstName, LastName, Email, Phone, Address, IsAdmin, Password) VALUES
    ('Liam', 'Moretti', 'liam.moretti@example.com', '4445556666', '567 Oak Avenue', 0, 'password501'),
    ('Olivia', 'Messina', 'olivia.messina@example.com', '5556667777', '890 Cedar Street', 0, 'password502'),
    ('Noah', 'Rizzo', 'noah.rizzo@example.com', '7778889999', '123 Pine Road', 0, 'password503'),
    ('Emma', 'Marini', 'emma.marini@example.com', '5554443333', '456 Cedar Street', 0, 'password504'),
    ('Sophia', 'Ferrari', 'sophia.ferrari@example.com', '2223334444', '789 Elm Street', 0, 'password505'),
    ('Oliver', 'Bianchi', 'oliver.bianchi@example.com', '4443332222', '321 Oak Avenue', 0, 'password506'),
    ('Ava', 'Russo', 'ava.russo@example.com', '5556667777', '654 Maple Lane', 0, 'password507'),
    ('Liam', 'De Angelis', 'liam.deangelis@example.com', '1112223333', '987 Elm Street', 0, 'password508'),
    ('Olivia', 'DAmico', 'olivia.damico@example.com', '4445556666', '234 Pine Road', 0, 'password509'),
    ('Noah', 'Sorrentino', 'noah.sorrentino@example.com', '6665554444', '567 Oak Avenue', 0, 'password510'),
    -- User 511-520
    ('Emma', 'Valentini', 'emma.valentini@example.com', '5556667777', '890 Cedar Street', 0, 'password511'),
    ('Liam', 'Battaglia', 'liam.battaglia@example.com', '7778889999', '123 Pine Road', 0, 'password512'),
    ('Olivia', 'Rinaldi', 'olivia.rinaldi@example.com', '5554443333', '456 Cedar Street', 0, 'password513'),
    ('Noah', 'Guerra', 'noah.guerra@example.com', '2223334444', '789 Elm Street', 0, 'password514'),
    ('Emma', 'Marini', 'emma.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password515'),
    ('Sophia', 'Caruso', 'sophia.caruso@example.com', '5556667777', '654 Maple Lane', 0, 'password516'),
    ('Oliver', 'Barone', 'oliver.barone@example.com', '1112223333', '987 Elm Street', 0, 'password517'),
    ('Ava', 'Valentini', 'ava.valentini@example.com', '4445556666', '234 Pine Road', 0, 'password518'),
    ('Liam', 'Battaglia', 'liam.battaglia@example.com', '6665554444', '567 Oak Avenue', 0, 'password519'),
    ('Olivia', 'Bianchi', 'olivia.bianchi@example.com', '5556667777', '890 Cedar Street', 0, 'password520'),
    -- User 521-530
    ('Noah', 'Leone', 'noah.leone@example.com', '7778889999', '123 Pine Road', 0, 'password521'),
    ('Emma', 'Moretti', 'emma.moretti@example.com', '5554443333', '456 Cedar Street', 0, 'password522'),
    ('Sophia', 'Messina', 'sophia.messina@example.com', '2223334444', '789 Elm Street', 0, 'password523'),
    ('Oliver', 'Rizzo', 'oliver.rizzo@example.com', '4443332222', '321 Oak Avenue', 0, 'password524'),
    ('Ava', 'Marini', 'ava.marini@example.com', '5556667777', '654 Maple Lane', 0, 'password525'),
    ('Liam', 'Ferrari', 'liam.ferrari@example.com', '1112223333', '987 Elm Street', 0, 'password526'),
    ('Olivia', 'Bianchi', 'olivia.bianchi@example.com', '4445556666', '234 Pine Road', 0, 'password527'),
    ('Noah', 'Russo', 'noah.russo@example.com', '6665554444', '567 Oak Avenue', 0, 'password528'),
    ('Emma', 'De Angelis', 'emma.deangelis@example.com', '5556667777', '890 Cedar Street', 0, 'password529'),
    ('Sophia', 'DAmico', 'sophia.damico@example.com', '7778889999', '123 Pine Road', 0, 'password530'),
    -- User 531-540
    ('Oliver', 'Sorrentino', 'oliver.sorrentino@example.com', '5554443333', '456 Cedar Street', 0, 'password531'),
    ('Ava', 'De Angelis', 'ava.deangelis@example.com', '2223334444', '789 Elm Street', 0, 'password532'),
    ('Liam', 'Marini', 'liam.marini@example.com', '4443332222', '321 Oak Avenue', 0, 'password533'),
    ('Olivia', 'Valentini', 'olivia.valentini@example.com', '5556667777', '654 Maple Lane', 0, 'password534'),
    ('Noah', 'Battaglia', 'noah.battaglia@example.com', '1112223333', '987 Elm Street', 0, 'password535'),
    ('Emma', 'Rinaldi', 'emma.rinaldi@example.com', '4445556666', '234 Pine Road', 0, 'password536'),
    ('Sophia', 'Guerra', 'sophia.guerra@example.com', '6665554444', '567 Oak Avenue', 0, 'password537'),
    ('Oliver', 'Marini', 'oliver.marini@example.com', '5556667777', '890 Cedar Street', 0, 'password538'),
    ('Ava', 'Caruso', 'ava.caruso@example.com', '7778889999', '123 Pine Road', 0, 'password539'),
    ('Liam', 'Barone', 'liam.barone@example.com', '5554443333', '456 Cedar Street', 0, 'password540'),
    -- User 541-550
    ('Olivia', 'Valentini', 'olivia.valentini@example.com', '2223334444', '789 Elm Street', 0, 'password541'),
    ('Noah', 'Battaglia', 'noah.battaglia@example.com', '4443332222', '321 Oak Avenue', 0, 'password542'),
    ('Emma', 'Rinaldi', 'emma.rinaldi@example.com', '5556667777', '654 Maple Lane', 0, 'password543'),
    ('Sophia', 'Guerra', 'sophia.guerra@example.com', '1112223333', '987 Elm Street', 0, 'password544'),
    ('Oliver', 'Marini', 'oliver.marini@example.com', '4445556666', '234 Pine Road', 0, 'password545'),
    ('Ava', 'Caruso', 'ava.caruso@example.com', '6665554444', '567 Oak Avenue', 0, 'password546'),
    ('Liam', 'Bianchi', 'liam.bianchi@example.com', '5556667777', '890 Cedar Street', 0, 'password547'),
    ('Olivia', 'Messina', 'olivia.messina@example.com', '7778889999', '123 Pine Road', 0, 'password548'),
    ('Noah', 'Rizzo', 'noah.rizzo@example.com', '5554443333', '456 Cedar Street', 0, 'password549'),
    ('Emma', 'Marini', 'emma.marini@example.com', '2223334444', '789 Elm Street', 0, 'password550'),
    -- User 551-560
    ('Sophia', 'Ferrari', 'sophia.ferrari@example.com', '4443332222', '321 Oak Avenue', 0, 'password551'),
    ('Oliver', 'Bianchi', 'oliver.bianchi@example.com', '5556667777', '654 Maple Lane', 0, 'password552'),
    ('Ava', 'Russo', 'ava.russo@example.com', '1112223333', '987 Elm Street', 0, 'password553'),
    ('Liam', 'De Angelis', 'liam.deangelis@example.com', '4445556666', '234 Pine Road', 0, 'password554'),
    ('Olivia', 'DAmico', 'olivia.damico@example.com', '6665554444', '567 Oak Avenue', 0, 'password555'),
    ('Noah', 'Sorrentino', 'noah.sorrentino@example.com', '5554443333', '890 Cedar Street', 0, 'password556'),
    ('Emma', 'Valentini', 'emma.valentini@example.com', '2223334444', '321 Oak Avenue', 0, 'password557'),
    ('Liam', 'Battaglia', 'liam.battaglia@example.com', '4443332222', '654 Maple Lane', 0, 'password558'),
    ('Olivia', 'Rinaldi', 'olivia.rinaldi@example.com', '5556667777', '987 Elm Street', 0, 'password559'),
    ('Noah', 'Guerra', 'noah.guerra@example.com', '7778889999', '234 Pine Road', 0, 'password560'),
    -- User 561-570
    ('Emma', 'Marini', 'emma.marini@example.com', '4445556666', '567 Oak Avenue', 0, 'password561'),
    ('Sophia', 'Caruso', 'sophia.caruso@example.com', '5556667777', '890 Cedar Street', 0, 'password562'),
    ('Oliver', 'Barone', 'oliver.barone@example.com', '1112223333', '123 Pine Road', 0, 'password563'),
    ('Ava', 'Valentini', 'ava.valentini@example.com', '4443332222', '456 Cedar Street', 0, 'password564'),
    ('Liam', 'Battaglia', 'liam.battaglia@example.com', '5556667777', '789 Elm Street', 0, 'password565'),
    ('Olivia', 'Bianchi', 'olivia.bianchi@example.com', '7778889999', '321 Oak Avenue', 0, 'password566'),
    ('Noah', 'Russo', 'noah.russo@example.com', '5554443333', '654 Maple Lane', 0, 'password567'),
    ('Emma', 'De Angelis', 'emma.deangelis@example.com', '2223334444', '987 Elm Street', 0, 'password568'),
    ('Sophia', 'DAmico', 'sophia.damico@example.com', '4445556666', '234 Pine Road', 0, 'password569'),
    ('Oliver', 'Sorrentino', 'oliver.sorrentino@example.com', '6665554444', '567 Oak Avenue', 0, 'password570'),
    -- User 571-580
    ('Ava', 'De Angelis', 'ava.deangelis@example.com', '5556667777', '890 Cedar Street', 0, 'password571'),
    ('Liam', 'Marini', 'liam.marini@example.com', '7778889999', '123 Pine Road', 0, 'password572'),
    ('Olivia', 'Valentini', 'olivia.valentini@example.com', '5554443333', '456 Cedar Street', 0, 'password573'),
    ('Noah', 'Battaglia', 'noah.battaglia@example.com', '2223334444', '789 Elm Street', 0, 'password574'),
    ('Emma', 'Rinaldi', 'emma.rinaldi@example.com', '4443332222', '321 Oak Avenue', 0, 'password575'),
    ('Sophia', 'Guerra', 'sophia.guerra@example.com', '5556667777', '654 Maple Lane', 0, 'password576'),
    ('Oliver', 'Marini', 'oliver.marini@example.com', '1112223333', '987 Elm Street', 0, 'password577'),
    ('Ava', 'Caruso', 'ava.caruso@example.com', '4445556666', '234 Pine Road', 0, 'password578'),
    ('Liam', 'Bianchi', 'liam.bianchi@example.com', '6665554444', '567 Oak Avenue', 0, 'password579'),
    ('Olivia', 'Messina', 'olivia.messina@example.com', '5556667777', '890 Cedar Street', 0, 'password580'),
    -- User 581-590
    ('Noah', 'Rizzo', 'noah.rizzo@example.com', '7778889999', '123 Pine Road', 0, 'password581'),
    ('Emma', 'Marini', 'emma.marini@example.com', '5554443333', '456 Cedar Street', 0, 'password582'),
    ('Sophia', 'Ferrari', 'sophia.ferrari@example.com', '2223334444', '789 Elm Street', 0, 'password583'),
    ('Oliver', 'Bianchi', 'oliver.bianchi@example.com', '4443332222', '321 Oak Avenue', 0, 'password584'),
    ('Ava', 'Russo', 'ava.russo@example.com', '5556667777', '654 Maple Lane', 0, 'password585'),
    ('Liam', 'De Angelis', 'liam.deangelis@example.com', '1112223333', '987 Elm Street', 0, 'password586'),
    ('Olivia', 'DAmico', 'olivia.damico@example.com', '4445556666', '234 Pine Road', 0, 'password587'),
    ('Noah', 'Sorrentino', 'noah.sorrentino@example.com', '6665554444', '567 Oak Avenue', 0, 'password588'),
    ('Emma', 'Valentini', 'emma.valentini@example.com', '5556667777', '890 Cedar Street', 0, 'password589'),
    ('Sophia', 'Caruso', 'sophia.caruso@example.com', '7778889999', '123 Pine Road', 0, 'password590'),
    -- User 591-600
    ('Oliver', 'Barone', 'oliver.barone@example.com', '5554443333', '456 Cedar Street', 0, 'password591'),
    ('Ava', 'Valentini', 'ava.valentini@example.com', '2223334444', '789 Elm Street', 0, 'password592'),
    ('Liam', 'Battaglia', 'liam.battaglia@example.com', '4443332222', '321 Oak Avenue', 0, 'password593'),
    ('Olivia', 'Rinaldi', 'olivia.rinaldi@example.com', '5556667777', '654 Maple Lane', 0, 'password594'),
    ('Noah', 'Guerra', 'noah.guerra@example.com', '1112223333', '987 Elm Street', 0, 'password595'),
    ('Emma', 'Marini', 'emma.marini@example.com', '4445556666', '234 Pine Road', 0, 'password596'),
    ('Sophia', 'Ferrari', 'sophia.ferrari@example.com', '6665554444', '567 Oak Avenue', 0, 'password597'),
    ('Oliver', 'Bianchi', 'oliver.bianchi@example.com', '5556667777', '890 Cedar Street', 0, 'password598'),
    ('Ava', 'Russo', 'ava.russo@example.com', '7778889999', '123 Pine Road', 0, 'password599'),
    ('Liam', 'De Angelis', 'liam.deangelis@example.com', '5554443333', '456 Cedar Street', 0, 'password600');

INSERT INTO Users (FirstName, LastName, Email, Phone, Address, IsAdmin, Password) VALUES
    ('Olivia', 'Messina', 'olivia.messina@example.com', '5556667777', '890 Cedar Street', 0, 'password601'),
    ('Noah', 'Rizzo', 'noah.rizzo@example.com', '7778889999', '123 Pine Road', 0, 'password602'),
    ('Emma', 'Marini', 'emma.marini@example.com', '5554443333', '456 Cedar Street', 0, 'password603'),
    ('Sophia', 'Ferrari', 'sophia.ferrari@example.com', '2223334444', '789 Elm Street', 0, 'password604'),
    ('Oliver', 'Bianchi', 'oliver.bianchi@example.com', '4443332222', '321 Oak Avenue', 0, 'password605'),
    ('Ava', 'Russo', 'ava.russo@example.com', '5556667777', '654 Maple Lane', 0, 'password606'),
    ('Liam', 'De Angelis', 'liam.deangelis@example.com', '1112223333', '987 Elm Street', 0, 'password607'),
    ('Olivia', 'DAmico', 'olivia.damico@example.com', '4445556666', '234 Pine Road', 0, 'password608'),
    ('Noah', 'Sorrentino', 'noah.sorrentino@example.com', '5556667777', '567 Oak Avenue', 0, 'password609'),
    ('Emma', 'Valentini', 'emma.valentini@example.com', '7778889999', '890 Cedar Street', 0, 'password610'),
    -- User 611-620
    ('Sophia', 'Caruso', 'sophia.caruso@example.com', '5554443333', '123 Pine Road', 0, 'password611'),
    ('Oliver', 'Barone', 'oliver.barone@example.com', '2223334444', '456 Cedar Street', 0, 'password612'),
    ('Ava', 'Valentini', 'ava.valentini@example.com', '4443332222', '789 Elm Street', 0, 'password613'),
    ('Liam', 'Battaglia', 'liam.battaglia@example.com', '5556667777', '321 Oak Avenue', 0, 'password614'),
    ('Olivia', 'Rinaldi', 'olivia.rinaldi@example.com', '1112223333', '654 Maple Lane', 0, 'password615'),
    ('Noah', 'Guerra', 'noah.guerra@example.com', '4445556666', '987 Elm Street', 0, 'password616'),
    ('Emma', 'Marini', 'emma.marini@example.com', '6665554444', '234 Pine Road', 0, 'password617'),
    ('Sophia', 'Ferrari', 'sophia.ferrari@example.com', '5556667777', '567 Oak Avenue', 0, 'password618'),
    ('Oliver', 'Bianchi', 'oliver.bianchi@example.com', '7778889999', '890 Cedar Street', 0, 'password619'),
    ('Ava', 'Russo', 'ava.russo@example.com', '5554443333', '123 Pine Road', 0, 'password620'),
    -- User 621-630
    ('Liam', 'De Angelis', 'liam.deangelis@example.com', '5556667777', '456 Cedar Street', 0, 'password621'),
    ('Olivia', 'Messina', 'olivia.messina@example.com', '2223334444', '789 Elm Street', 0, 'password622'),
    ('Noah', 'Rizzo', 'noah.rizzo@example.com', '4443332222', '321 Oak Avenue', 0, 'password623'),
    ('Emma', 'Marini', 'emma.marini@example.com', '5556667777', '654 Maple Lane', 0, 'password624'),
    ('Sophia', 'Ferrari', 'sophia.ferrari@example.com', '1112223333', '987 Elm Street', 0, 'password625'),
    ('Oliver', 'Bianchi', 'oliver.bianchi@example.com', '4445556666', '234 Pine Road', 0, 'password626'),
    ('Ava', 'Russo', 'ava.russo@example.com', '6665554444', '567 Oak Avenue', 0, 'password627'),
    ('Liam', 'De Angelis', 'liam.deangelis@example.com', '5554443333', '890 Cedar Street', 0, 'password628'),
    ('Olivia', 'DAmico', 'olivia.damico@example.com', '7778889999', '123 Pine Road', 0, 'password629'),
    ('Noah', 'Sorrentino', 'noah.sorrentino@example.com', '5556667777', '456 Cedar Street', 0, 'password630');

------------------ hash lại mât khau da insert
-- Đầu tiên, hãy tạo một hàm hash bcrypt
CREATE FUNCTION dbo.HashPassword
(
    @Password VARCHAR(128)
)
RETURNS VARCHAR(128)
AS
BEGIN
    DECLARE @HashedPassword VARCHAR(128);

    -- Sử dụng bcrypt để mã hóa mật khẩu
    SET @HashedPassword = HASHBYTES('SHA2_512', @Password);

    RETURN @HashedPassword;
END
GO

-- Sau đó, cập nhật bảng Users để mã hóa mật khẩu
UPDATE Users
SET Password = dbo.HashPassword(Password);

--######################## RESERVATION ###############

select * from Reservation
UPDATE Reservation
     SET TotalPrice = 0
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
