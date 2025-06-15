
----ריקון טבלאות
--DELETE FROM Appointments;
--DELETE FROM CanceledAppointments;
--DELETE FROM PassedAppointments;
--DELETE FROM AvailableAppointments;
--DELETE FROM WorkHours;
--DELETE FROM Patients;
--DELETE FROM Therapists;

---- לאפס זהות (Identity)
--DBCC CHECKIDENT ('Patients', RESEED, 0);
--DBCC CHECKIDENT ('Therapists', RESEED, 0);

---- מטופלים
--ALTER TABLE Patients ALTER COLUMN FirstName NVARCHAR(50) NOT NULL;
--ALTER TABLE Patients ALTER COLUMN LastName NVARCHAR(50) NOT NULL;
--ALTER TABLE Patients ALTER COLUMN PhoneNumber NVARCHAR(15) NOT NULL;

---- מטפלים
--ALTER TABLE Therapists ALTER COLUMN FirstName NVARCHAR(50) NOT NULL;
--ALTER TABLE Therapists ALTER COLUMN LastName NVARCHAR(50) NOT NULL;
--ALTER TABLE Therapists ALTER COLUMN PhoneNumber NCHAR(10) NOT NULL;

---- פגישות
--ALTER TABLE Appointments ALTER COLUMN Status NVARCHAR(15) NULL;

---- פגישות זמינות
---- (עמודות טקסט אין כאן מלבד אולי Specialization - בדוק אם זו מחרוזת או מספר)

---- פגישות שבוטלו
--ALTER TABLE CanceledAppointments ALTER COLUMN Note NTEXT NULL;

---- פגישות שהתקיימו
--ALTER TABLE PassedAppointments ALTER COLUMN Status NVARCHAR(50) NULL;

---- שעות עבודה
--ALTER TABLE WorkHours ALTER COLUMN DayOfWeek NVARCHAR(20) NOT NULL;

---- Insert therapists
--INSERT INTO Therapists (FirstName, LastName, Specialization, PhoneNumber) VALUES
--(N'נועה', N'כהן', 1, N'0501234567'),
--(N'דוד', N'לוי', 2, N'0502345678'),
--(N'רות', N'ישראלי', 3, N'0503456789'),
--(N'משה', N'ברק', 1, N'0504567890'),
--(N'מיכל', N'שקד', 2, N'0505678901'),
--(N'יוסי', N'גוטמן', 1, N'0506789012'),
--(N'אורית', N'בן דוד', 2, N'0507890123'),
--(N'עדי', N'רוזן', 3, N'0508901234'),
--(N'גיל', N'כהן', 1, N'0509012345'),
--(N'לירון', N'אברמסון', 2, N'0500123456');

---- Insert patients
--INSERT INTO Patients (FirstName, LastName, Age, PhoneNumber) VALUES
--(N'יונתן', N'כהן', 6, N'0521111111'),
--(N'רוני', N'בן חיים', 8, N'0522222222'),
--(N'מאיה', N'מור', 7, N'0523333333'),
--(N'טל', N'הורוש', 9, N'0524444444'),
--(N'עומר', N'סגל', 10, N'0525555555'),
--(N'אורי', N'דהן', 5, N'0526666666'),
--(N'שירה', N'פרץ', 8, N'0527777777'),
--(N'אופק', N'אלון', 6, N'0528888888'),
--(N'דניאל', N'סבן', 7, N'0529999999'),
--(N'אדם', N'פז', 9, N'0520000000');

---- Insert appointments
--INSERT INTO Appointments (PatientID, TherapistID, AppointmentDate, AppointmentTime, Status) VALUES
--(1, 1, '2025-05-21', '09:00', N'נקבע'),
--(2, 2, '2025-05-21', '09:30', N'נקבע'),
--(3, 3, '2025-05-21', '10:00', N'נקבע'),
--(4, 4, '2025-05-21', '10:30', N'נקבע'),
--(5, 5, '2025-05-21', '11:00', N'הושלם'),
--(6, 6, '2025-05-22', '09:00', N'הושלם'),
--(7, 7, '2025-05-22', '09:30', N'נקבע'),
--(8, 8, '2025-05-22', '10:00', N'בוטל'),
--(9, 9, '2025-05-22', '10:30', N'הושלם'),
--(10, 10, '2025-05-22', '11:00', N'נקבע');

---- Insert available appointments
--INSERT INTO AvailableAppointments (TherapistID, AppointmentDate, AppointmentTime, DurationMinutes, Specialization) VALUES
--(1, '2025-05-23', '09:00', 30, 1),
--(2, '2025-05-23', '09:30', 30, 2),
--(3, '2025-05-23', '10:00', 45, 3),
--(4, '2025-05-23', '10:30', 30, 1),
--(5, '2025-05-23', '11:00', 30, 2),
--(6, '2025-05-24', '09:00', 45, 1),
--(7, '2025-05-24', '09:30', 30, 2),
--(8, '2025-05-24', '10:00', 30, 3),
--(9, '2025-05-24', '10:30', 45, 1),
--(10, '2025-05-24', '11:00', 30, 2);

---- Insert canceled appointments
--INSERT INTO CanceledAppointments (AppointmentID, PatientID, TherapistID, AppointmentDate, AppointmentTime, Note) VALUES
--(8, 8, 8, '2025-05-22', '10:00', N'הפגישה בוטלה עקב מחלה'),
--(3, 3, 3, '2025-05-21', '10:00', N'בוטל עקב חופשה'),
--(7, 7, 7, '2025-05-22', '09:30', N'הפגישה בוטלה על ידי המטופל'),
--(4, 4, 4, '2025-05-21', '10:30', N'בוטל עקב אילוץ משפחתי'),
--(10, 10, 10, '2025-05-22', '11:00', N'בוטל עקב אילוץ אחר'),
--(5, 5, 5, '2025-05-21', '11:00', N'בוטל עקב יום גיבוש'),
--(2, 2, 2, '2025-05-21', '09:30', N'בוטל עקב תקלה טכנית'),
--(6, 6, 6, '2025-05-22', '09:00', N'המטופל לא הגיע'),
--(1, 1, 1, '2025-05-21', '09:00', N'בוטל עקב מחלה'),
--(9, 9, 9, '2025-05-22', '10:30', N'הפגישה נדחתה');

---- Insert passed appointments
--INSERT INTO PassedAppointments (AppointmentID, PatientID, TherapistID, AppointmentDate, AppointmentTime, Status) VALUES
--(5, 5, 5, '2025-05-21', '11:00', N'הושלם'),
--(6, 6, 6, '2025-05-22', '09:00', N'הושלם'),
--(9, 9, 9, '2025-05-22', '10:30', N'הושלם'),
--(3, 3, 3, '2025-05-21', '10:00', N'הושלם'),
--(4, 4, 4, '2025-05-21', '10:30', N'הושלם'),
--(1, 1, 1, '2025-05-21', '09:00', N'הושלם'),
--(2, 2, 2, '2025-05-21', '09:30', N'הושלם'),
--(8, 8, 8, '2025-05-22', '10:00', N'הושלם'),
--(7, 7, 7, '2025-05-22', '09:30', N'הושלם'),
--(10, 10, 10, '2025-05-22', '11:00', N'הושלם');

---- Insert work hours
--INSERT INTO WorkHours (TherapistID, DayOfWeek, StartTime, EndTime) VALUES
--(1, N'ראשון', '08:00', '14:00'),
--(2, N'שני', '08:00', '14:00'),
--(3, N'שלישי', '08:00', '14:00'),
--(4, N'רביעי', '08:00', '14:00'),
--(5, N'חמישי', '08:00', '14:00'),
--(6, N'ראשון', '12:00', '18:00'),
--(7, N'שני', '12:00', '18:00'),
--(8, N'רביעי', '12:00', '18:00'),
--(9, N'חמישי', '12:00', '18:00'),
--(10, N'שלישי', '12:00', '18:00');
-- Clear tables
DELETE FROM Appointments;
DELETE FROM CanceledAppointments;
DELETE FROM PassedAppointments;
DELETE FROM AvailableAppointments;
DELETE FROM WorkHours;
DELETE FROM Patients;
DELETE FROM Therapists;

-- Reset identity
DBCC CHECKIDENT ('Patients', RESEED, 0);
DBCC CHECKIDENT ('Therapists', RESEED, 0);

-- Patients table
ALTER TABLE Patients ALTER COLUMN FirstName NVARCHAR(50) NOT NULL;
ALTER TABLE Patients ALTER COLUMN LastName NVARCHAR(50) NOT NULL;
ALTER TABLE Patients ALTER COLUMN PhoneNumber NVARCHAR(15) NOT NULL;

-- Therapists table
ALTER TABLE Therapists ALTER COLUMN FirstName NVARCHAR(50) NOT NULL;
ALTER TABLE Therapists ALTER COLUMN LastName NVARCHAR(50) NOT NULL;
ALTER TABLE Therapists ALTER COLUMN PhoneNumber NCHAR(10) NOT NULL;

-- Appointments table
ALTER TABLE Appointments ALTER COLUMN Status NVARCHAR(15) NULL;

-- CanceledAppointments table ("Note" should be NVARCHAR(MAX))
ALTER TABLE CanceledAppointments ALTER COLUMN Note NVARCHAR(MAX) NULL;

-- PassedAppointments table
ALTER TABLE PassedAppointments ALTER COLUMN Status NVARCHAR(50) NULL;

-- WorkHours table
ALTER TABLE WorkHours ALTER COLUMN DayOfWeek NVARCHAR(20) NOT NULL;

-- Insert therapists
INSERT INTO Therapists (FirstName, LastName, Specialization, PhoneNumber) VALUES
(N'Noa', N'Cohen', 1, N'0501234567'),
(N'David', N'Levi', 2, N'0502345678'),
(N'Ruth', N'Israeli', 3, N'0503456789'),
(N'Moshe', N'Barak', 1, N'0504567890'),
(N'Michal', N'Shaked', 2, N'0505678901'),
(N'Yossi', N'Gutman', 1, N'0506789012'),
(N'Orit', N'Ben David', 2, N'0507890123'),
(N'Adi', N'Rosen', 3, N'0508901234'),
(N'Gil', N'Cohen', 1, N'0509012345'),
(N'Liron', N'Avramson', 2, N'0500123456');

-- Insert patients
INSERT INTO Patients (FirstName, LastName, Age, PhoneNumber) VALUES
(N'Jonathan', N'Cohen', 6, N'0521111111'),
(N'Roni', N'Ben Haim', 8, N'0522222222'),
(N'Maya', N'Mor', 7, N'0523333333'),
(N'Tal', N'Harush', 9, N'0524444444'),
(N'Omer', N'Segal', 10, N'0525555555'),
(N'Ori', N'Dahan', 5, N'0526666666'),
(N'Shira', N'Peretz', 8, N'0527777777'),
(N'Ofek', N'Alon', 6, N'0528888888'),
(N'Daniel', N'Saban', 7, N'0529999999'),
(N'Adam', N'Paz', 9, N'0520000000');

-- Insert appointments
INSERT INTO Appointments (PatientID, TherapistID, AppointmentDate, AppointmentTime, Status) VALUES
(1, 1, '2025-05-21', '09:00', N'Scheduled'),
(2, 2, '2025-05-21', '09:30', N'Scheduled'),
(3, 3, '2025-05-21', '10:00', N'Scheduled'),
(4, 4, '2025-05-21', '10:30', N'Scheduled'),
(5, 5, '2025-05-21', '11:00', N'Completed'),
(6, 6, '2025-05-22', '09:00', N'Completed'),
(7, 7, '2025-05-22', '09:30', N'Scheduled'),
(8, 8, '2025-05-22', '10:00', N'Canceled'),
(9, 9, '2025-05-22', '10:30', N'Completed'),
(10, 10, '2025-05-22', '11:00', N'Scheduled');

-- Insert available appointments
INSERT INTO AvailableAppointments (TherapistID, AppointmentDate, AppointmentTime, DurationMinutes, Specialization) VALUES
(1, '2025-05-23', '09:00', 30, 1),
(2, '2025-05-23', '09:30', 30, 2),
(3, '2025-05-23', '10:00', 45, 3),
(4, '2025-05-23', '10:30', 30, 1),
(5, '2025-05-23', '11:00', 30, 2),
(6, '2025-05-24', '09:00', 45, 1),
(7, '2025-05-24', '09:30', 30, 2),
(8, '2025-05-24', '10:00', 30, 3),
(9, '2025-05-24', '10:30', 45, 1),
(10, '2025-05-24', '11:00', 30, 2);

-- Insert canceled appointments
INSERT INTO CanceledAppointments (AppointmentID, PatientID, TherapistID, AppointmentDate, AppointmentTime, Note) VALUES
(8, 8, 8, '2025-05-22', '10:00', N'Appointment canceled due to illness'),
(3, 3, 3, '2025-05-21', '10:00', N'Canceled due to vacation'),
(7, 7, 7, '2025-05-22', '09:30', N'Appointment canceled by patient'),
(4, 4, 4, '2025-05-21', '10:30', N'Canceled due to family emergency'),
(10, 10, 10, '2025-05-22', '11:00', N'Canceled due to other reason'),
(5, 5, 5, '2025-05-21', '11:00', N'Canceled due to team event'),
(2, 2, 2, '2025-05-21', '09:30', N'Canceled due to technical issue'),
(6, 6, 6, '2025-05-22', '09:00', N'Patient did not arrive'),
(1, 1, 1, '2025-05-21', '09:00', N'Canceled due to illness'),
(9, 9, 9, '2025-05-22', '10:30', N'Appointment postponed');

-- Insert passed appointments
INSERT INTO PassedAppointments (AppointmentID, PatientID, TherapistID, AppointmentDate, AppointmentTime, Status) VALUES
(5, 5, 5, '2025-05-21', '11:00', N'Completed'),
(6, 6, 6, '2025-05-22', '09:00', N'Completed'),
(9, 9, 9, '2025-05-22', '10:30', N'Completed'),
(3, 3, 3, '2025-05-21', '10:00', N'Completed'),
(4, 4, 4, '2025-05-21', '10:30', N'Completed'),
(1, 1, 1, '2025-05-21', '09:00', N'Completed'),
(2, 2, 2, '2025-05-21', '09:30', N'Completed'),
(8, 8, 8, '2025-05-22', '10:00', N'Completed'),
(7, 7, 7, '2025-05-22', '09:30', N'Completed'),
(10, 10, 10, '2025-05-22', '11:00', N'Completed');

-- Insert work hours
INSERT INTO WorkHours (TherapistID, DayOfWeek, StartTime, EndTime) VALUES
(1, N'Sunday', '08:00', '14:00'),
(2, N'Monday', '08:00', '14:00'),
(3, N'Tuesday', '08:00', '14:00'),
(4, N'Wednesday', '08:00', '14:00'),
(5, N'Thursday', '08:00', '14:00'),
(6, N'Sunday', '12:00', '18:00'),
(7, N'Monday', '12:00', '18:00'),
(8, N'Wednesday', '12:00', '18:00'),
(9, N'Thursday', '12:00', '18:00'),
(10, N'Tuesday', '12:00', '18:00');
--
DELETE FROM Appointments;
DBCC CHECKIDENT ('Appointments', RESEED, 0);

INSERT INTO Appointments (PatientID, TherapistID, AppointmentDate, AppointmentTime, Status) VALUES
(1, 1, '2025-06-01', '09:00', N'Scheduled'),
(2, 2, '2025-06-01', '09:30', N'Completed'),
(3, 3, '2025-06-01', '10:00', N'Scheduled'),
(4, 4, '2025-06-02', '08:30', N'Canceled'),
(5, 5, '2025-06-02', '09:00', N'Completed'),
(6, 6, '2025-06-03', '10:00', N'Scheduled'),
(7, 7, '2025-06-03', '10:30', N'Scheduled'),
(8, 8, '2025-06-04', '11:00', N'Scheduled'),
(9, 9, '2025-06-04', '11:30', N'Scheduled'),
(10, 10, '2025-06-05', '12:00', N'Completed');
SELECT * FROM Appointments