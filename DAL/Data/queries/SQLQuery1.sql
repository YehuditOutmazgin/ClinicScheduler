-- מחיקת נתונים קיימים מכל הטבלאות
DELETE FROM [dbo].[CanceledAppointments];
DELETE FROM [dbo].[PassedAppointments];
DELETE FROM [dbo].[Appointments];
DELETE FROM [dbo].[AvailableAppointments];
DELETE FROM [dbo].[WorkHours];
DELETE FROM [dbo].[Therapists];
DELETE FROM [dbo].[Patients];

-- הכנסת נתונים לטבלה Patients
SET IDENTITY_INSERT [dbo].[Patients] ON;

INSERT INTO [dbo].[Patients] (PatientID, FirstName, LastName, Age, PhoneNumber)
VALUES 
(1, 'David', 'Cohen', 45, '0531234567'),
(2, 'Sara', 'Levi', 30, '0529876543'),
(3, 'Rachel', 'Green', 28, '0538765432'),
(4, 'Noah', 'Smith', 40, '0501234567'),
(5, 'Olivia', 'Brown', 33, '0546543210'),
(6, 'Liam', 'Johnson', 25, '0532345678'),
(7, 'Ava', 'Williams', 37, '0520987654'),
(8, 'Ethan', 'Jones', 29, '0548765432'),
(9, 'Isabella', 'Garcia', 34, '0536549870'),
(10, 'Mason', 'Martinez', 42, '0527654321');

SET IDENTITY_INSERT [dbo].[Patients] OFF;

-- הכנסת נתונים לטבלה Therapists
INSERT INTO [dbo].[Therapists] (TherapistID, FirstName, LastName, Specialization, PhoneNumber)
VALUES 
(1, 'John', 'Doe', 101, '0521234567'),
(2, 'Jane', 'Smith', 102, '0549876543'),
(3, 'Michael', 'Brown', 103, '0501122334'),
(4, 'Sarah', 'Johnson', 104, '0534567890'),
(5, 'David', 'Williams', 105, '0523456789'),
(6, 'Emily', 'Jones', 106, '0541234567'),
(7, 'Daniel', 'Garcia', 107, '0539876543'),
(8, 'Sophia', 'Martinez', 108, '0528765432'),
(9, 'James', 'Lopez', 109, '0543456789'),
(10, 'Emma', 'Gonzalez', 110, '0532345678');

-- הכנסת נתונים לטבלה WorkHours
INSERT INTO [dbo].[WorkHours] (Id, TherapistID, DayOfWeek, StartTime, EndTime)
VALUES 
(1, 1, 'Monday', '09:00:00', '15:00:00'),
(2, 2, 'Tuesday', '10:00:00', '16:00:00'),
(3, 3, 'Wednesday', '08:00:00', '14:00:00'),
(4, 4, 'Thursday', '11:00:00', '17:00:00'),
(5, 5, 'Friday', '09:30:00', '15:30:00'),
(6, 6, 'Monday', '10:00:00', '16:00:00'),
(7, 7, 'Tuesday', '12:00:00', '18:00:00'),
(8, 8, 'Wednesday', '09:00:00', '15:00:00'),
(9, 9, 'Thursday', '08:30:00', '14:30:00'),
(10, 10, 'Friday', '10:00:00', '16:00:00');

-- הכנסת נתונים לטבלה AvailableAppointments
INSERT INTO [dbo].[AvailableAppointments] (TherapistID, AppointmentDate, TimeSlot, DurationMinutes, Specialization)
VALUES 
(1, '2025-05-14', '09:00:00', 30, 101),
(2, '2025-05-14', '10:00:00', 45, 102),
(3, '2025-05-14', '11:00:00', 60, 103),
(4, '2025-05-15', '09:30:00', 30, 104),
(5, '2025-05-15', '10:30:00', 45, 105),
(6, '2025-05-16', '11:30:00', 60, 106),
(7, '2025-05-16', '12:00:00', 30, 107),
(8, '2025-05-16', '13:00:00', 45, 108),
(9, '2025-05-17', '14:00:00', 60, 109),
(10, '2025-05-17', '15:00:00', 30, 110);

-- הכנסת נתונים לטבלה Appointments
INSERT INTO [dbo].[Appointments] (PatientID, TherapistID, AppointmentDate, AppointmentTime)
VALUES 
(1, 1, '2025-05-14', '09:00:00'),
(2, 2, '2025-05-14', '10:00:00'),
(3, 3, '2025-05-14', '11:00:00'),
(4, 4, '2025-05-15', '09:30:00'),
(5, 5, '2025-05-15', '10:30:00'),
(6, 6, '2025-05-16', '11:30:00'),
(7, 7, '2025-05-16', '12:00:00'),
(8, 8, '2025-05-16', '13:00:00'),
(9, 9, '2025-05-17', '14:00:00'),
(10, 10, '2025-05-17', '15:00:00');

-- הכנסת נתונים לטבלה PassedAppointments
INSERT INTO [dbo].[PassedAppointments] (PatientID, TherapistID, AppointmentDate, AppointmentTime, Status)
VALUES 
(1, 1, '2025-05-01', '09:00:00', 'Completed'),
(2, 2, '2025-05-01', '10:00:00', 'Canceled'),
(3, 3, '2025-05-02', '11:00:00', 'Completed'),
(4, 4, '2025-05-03', '09:30:00', 'No Show'),
(5, 5, '2025-05-03', '10:30:00', 'Completed'),
(6, 6, '2025-05-04', '11:30:00', 'Completed'),
(7, 7, '2025-05-04', '12:00:00', 'Canceled'),
(8, 8, '2025-05-05', '13:00:00', 'Completed'),
(9, 9, '2025-05-06', '14:00:00', 'No Show'),
(10, 10, '2025-05-07', '15:00:00', 'Completed');

-- הכנסת נתונים לטבלה CanceledAppointments
INSERT INTO [dbo].[CanceledAppointments] (Id, AppointmentID, PatientID)
VALUES 
(1, 2, 1),
(2, 4, 3),
(3, 6, 5),
(4, 8, 7),
(5, 10, 9),
(6, 5, 8),
(7, 3, 6),
(8, 7, 4),
(9, 9, 2),
(10, 1, 10);



INSERT INTO [dbo].[CanceledAppointments] (Id, AppointmentID, PatientID)
VALUES 
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 6, 6),
(7, 7, 7),
(8, 8, 8),
(9, 9, 9),
(10, 10, 10);

SELECT AppointmentID FROM [dbo].[Appointments];
INSERT INTO [dbo].[CanceledAppointments] (Id, AppointmentID, PatientID)
VALUES 
(1, 9, 1),
(2, 10, 2),
(3, 11, 3),
(4, 12, 4),
(5, 13, 5),
(6, 14, 6),
(7, 15, 7),
(8, 16, 8),
(9, 17, 9),
(10, 18, 10);