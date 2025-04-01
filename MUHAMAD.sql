SHOW DATABASES;
DROP DATABASE IF EXISTS naseef_s24b38006;

CREATE DATABASE naseef_s24b38006;
USE naseef_s24b38006;

DROP TABLE IF EXISTS Patient;
CREATE TABLE Patient(
    PatientID VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Age INT,
    Gender VARCHAR(20),
    Contact VARCHAR(20)
);

DROP TABLE IF EXISTS Doctor;
CREATE TABLE Doctor(
    DoctorID VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Specialization VARCHAR(20),
    Contact VARCHAR(20)
);

DROP TABLE IF EXISTS Appointment;
CREATE TABLE Appointment(
    AppointmentID VARCHAR(10) PRIMARY KEY,
    PatientID VARCHAR(10),
    DoctorID VARCHAR(10),
    Date DATE,
    Time TIME,
    FOREIGN KEY (DoctorID) REFERENCES Doctor(DoctorID) ON DELETE SET NULL,
    FOREIGN KEY (PatientID) REFERENCES Patient(PatientID) ON DELETE SET NULL
);

DROP TABLE IF EXISTS Medicine;
CREATE TABLE Medicine(
    MedicineID INT PRIMARY KEY,
    Name VARCHAR(20) NOT NULL,
    Type VARCHAR(20),
    Price_Per_Unit_UGX DECIMAL(10,2),
    Stock_Quantity INT
);

DROP TABLE IF EXISTS Prescription;
CREATE TABLE Prescription (
    PrescriptionID INT PRIMARY KEY,
    PatientID VARCHAR(10) NOT NULL,
    DoctorID VARCHAR(10),
    MedicineID INT NOT NULL,
    Dosage_mg DECIMAL(6,2) NOT NULL,
    Duration_Days INT NOT NULL,
    FOREIGN KEY (MedicineID) REFERENCES Medicine(MedicineID) ON DELETE CASCADE,
    FOREIGN KEY (DoctorID) REFERENCES Doctor(DoctorID) ON DELETE SET NULL,
    FOREIGN KEY (PatientID) REFERENCES Patient(PatientID) ON DELETE CASCADE
);

INSERT INTO Patient(PatientID,Name,Age,Gender,Contact)
VALUES
    ('P001','John Kintu',35,'Male','0700111111'),
    ('P002','Sarah Nambi',28,'Female','0700222222'),
    ('P003','Paul Okello',42,'Male','0700333333');
SELECT * FROM Patient;

INSERT INTO Doctor(DoctorID,Name,Specialization,Contact)
VALUES
    ('101','Alex Bukenya','BPharm','0701111111'),
    ('102','Diana Musoke','BPharm','0701222222'),
    ('103','Samuel Opio','DPharm','0701333333');

INSERT INTO Medicine (MedicineID, Name, Type, Price_Per_Unit_UGX, Stock_Quantity)
VALUES 
    (201, 'Paracetamol', 'Painkiller', 5000.00, 100),
    (202, 'Amoxicillin', 'Antibiotic', 8000.50, 50),
    (203, 'Ibuprofen', 'Painkiller', 7000.25, 75);
SELECT * FROM Medicine;

CREATE TABLE SalesTransaction (
    Transaction_ID INT PRIMARY KEY,
    PrescriptionID INT NOT NULL,
    Date DATE NOT NULL,
    Quantity_Sold INT NOT NULL,
    Total_Amount_UGX DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (PrescriptionID) REFERENCES Prescription(PrescriptionID) ON DELETE CASCADE
);

INSERT INTO Prescription(PrescriptionID,PatientID,DoctorID,MedicineID,Dosage_mg,Duration_Days)
VALUES 
    (301,'P001','101',201,500.50,5),
    (302,'P002','102',202,250.25,7),
    (303,'P003','103',203,400.75,3);
DELETE FROM Prescription WHERE PrescriptionID = 301;    
SELECT*FROM Prescription;
INSERT INTO SalesTransaction (Transaction_ID, PrescriptionID, Date, Quantity_Sold, Total_Amount_UGX)
VALUES
    (401, 301, '2024-01-16', 10, 50000.10),
    (402, 302, '2024-02-11', 5, 40002.50),
    (403, 303, '2024-03-06', 7, 49001.75);
SELECT*FROM SalesTransaction;
INSERT INTO Medicine (MedicineID, Name, Type, Price_Per_Unit_UGX, Stock_Quantity)
VALUES
    (201, 'Paracetamol', 'Painkiller', 5000.00, 100),
    (202, 'Amoxicillin', 'Antibiotic', 8000.50, 50),
    (203, 'Ibuprofen', 'Painkiller', 7000.25, 75);
SELECT*FROM Medicine;
ALTER TABLE Doctor RENAME TO Pharmacist_Table;
ALTER TABLE Pharmacist_Table RENAME COLUMN DoctorID TO PharmacistID;
ALTER TABLE Pharmacist_Table RENAME COLUMN Specialization TO Qualification;
DESC Pharmacist_Table;

UPDATE Patient
SET Name='John Kintu'
WHERE PatientID='P001';
SELECT PatientID,Name FROM Patient;

CREATE VIEW view2b AS
SELECT Type
FROM Medicine
WHERE Type='Painkiller';
SELECT*FROM view2b;

CREATE VIEW view2c AS
SELECT SUM(Total_Amount_UGX) AS TotalSalesUGX
FROM SalesTransaction;
SELECT*FROM view2c;

CREATE VIEW viewleast AS
SELECT 
    p.Name AS PatientName,
    m.Name AS MedicineName,
    MIN(pr.Dosage_mg) AS SmallestDosage
FROM 
    Patient p
    INNER JOIN Prescription pr ON p.PatientID = pr.PatientID
    INNER JOIN Medicine m ON pr.MedicineID = m.MedicineID
GROUP BY 
    p.Name, m.Name;
SELECT*FROM viewleast;    

CREATE VIEW view3a AS
SELECT DISTINCT Type AS MedicineType
FROM Medicine
ORDER BY Type ASC;
SELECT*FROM view3a;

CREATE VIEW view3b AS
SELECT AVG(Dosage_mg) AS AverageDosage
FROM Prescription;
SELECT*FROM view3b;

CREATE VIEW view3c AS
SELECT *
FROM Patient
WHERE Name LIKE 'N%';

CREATE VIEW view3e AS
SELECT *
FROM SalesTransaction
WHERE Total_Amount_UGX > 50000;
SELECT*FROM view3e;

CREATE VIEW view_btn AS
SELECT *
FROM Patient
WHERE Age BETWEEN 28 AND 41;
SELECT*FROM view_btn;

CREATE VIEW view_p AS
SELECT *
FROM Medicine
WHERE Type = 'Painkiller';
SELECT*FROM view_p;

ALTER TABLE Patient ADD COLUMN email VARCHAR(100);
ALTER TABLE Medicine RENAME COLUMN MedicineID TO DrugID;
DESC Patient;
DESC Medicine;
ALTER TABLE Medicine MODIFY COLUMN Type VARCHAR(30);
CREATE TABLE PharmacyStaff (
    StaffID VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Role VARCHAR(30),
    Contact VARCHAR(20)
);


INSERT INTO PharmacyStaff (StaffID, Name, Role, Contact)
VALUES
    ('S001', 'Mary Nakato', 'Pharmacist', '0701444444'),
    ('S002', 'James Lutaaya', 'Assistant', '0701555555');

