DELETE FROM Appointments;
DELETE FROM AvailableAppointments;
DELETE FROM CanceledAppointments;
DELETE FROM PastAppointments;
DELETE FROM WorkHours;
DELETE FROM Patients;
DELETE FROM Therapists;

DBCC CHECKIDENT ('Therapists', RESEED, 0);
DBCC CHECKIDENT ('WorkHours', RESEED, 0);
DBCC CHECKIDENT ('AvailableAppointments', RESEED, 0);

INSERT INTO [dbo].[Therapists] (TherapistID, FirstName, LastName, Specialization, PhoneNumber, AppointmentDuration) VALUES
(234567890, N'אורית', N'כהן', N'SpeechTherapy', N'050-1234568', 60),
(234567891, N'דוד', N'לוי', N'OccupationalTherapy', N'052-2345679', 45),
(234567892, N'מיכל', N'מאיר', N'PhysicalTherapy', N'054-3456790', 30),
(234567893, N'יוסי', N'בראון', N'Psychology', N'050-4567891', 50),
(234567894, N'תמר', N'מזרחי', N'SocialWork', N'052-5678902', 40),
(234567895, N'אלי', N'פנחס', N'BehavioralTherapy', N'054-6789013', 55),
(234567896, N'נועה', N'פרידמן', N'EducationalTherapy', N'050-7890124', 35);

INSERT INTO [dbo].[Patients] (PatientID, FirstName, LastName, Age, PhoneNumber) VALUES
(123456789, N'יוסי', N'כהן', 30, N'050-1234567'),
(987654321, N'מיכל', N'לוי', 25, N'052-7654321'),
(123456780, N'דוד', N'מאיר', 40, N'054-1234567'),
(234537891, N'שרה', N'גולד', 35, N'050-2345678'),
(345678912, N'מיכאל', N'בראון', 50, N'052-3456789'),
(456789123, N'יעל', N'מזרחי', 28, N'054-4567890'),
(567891234, N'אורן', N'אברהם', 22, N'050-5678901'),
(678912345, N'תמר', N'פנחס', 33, N'052-6789012'),
(789123456, N'אלי', N'קצב', 45, N'054-7890123'),
(891234567, N'נועה', N'פרידמן', 29, N'050-8912345'),
(234567890, N'Alice', N'Johnson', 30, N'050-1234568'),
(234567891, N'Bob', N'Williams', 25, N'052-7654322'),
(234567892, N'Charlie', N'Jones', 40, N'054-1234569'),
(234567893, N'Diana', N'Garcia', 35, N'050-2345679'),
(234567894, N'Ethan', N'Martinez', 50, N'052-3456790'),
(234567895, N'Fiona', N'Hernandez', 28, N'054-4567891'),
(234567896, N'George', N'Lopez', 22, N'050-5678902'),
(234567897, N'Hannah', N'Gonzalez', 33, N'052-6789013'),
(234567898, N'Isaac', N'Wilson', 45, N'054-7890124'),
(234567899, N'Julia', N'Anderson', 29, N'050-8912346'),
(234567900, N'Kevin', N'Thomas', 31, N'052-1234567');

INSERT INTO [dbo].[WorkHours] (TherapistID, DayOfWeek, StartTime, EndTime) VALUES
(1, 'Sunday', '09:00:00', '17:00:00'),
(1, 'Tuesday', '09:00:00', '17:00:00'),
(1, 'Thursday', '09:00:00', '17:00:00'),

(2, 'Monday', '10:00:00', '18:00:00'),
(2, 'Wednesday', '10:00:00', '18:00:00'),
(2, 'Friday', '10:00:00', '18:00:00'),

(3, 'Sunday', '08:00:00', '16:00:00'),
(3, 'Tuesday', '08:00:00', '16:00:00'),
(3, 'Thursday', '08:00:00', '16:00:00'),

(4, 'Monday', '09:30:00', '17:30:00'),
(4, 'Wednesday', '09:30:00', '17:30:00'),
(4, 'Friday', '09:30:00', '17:30:00'),

(5, 'Sunday', '10:00:00', '18:00:00'),
(5, 'Tuesday', '10:00:00', '18:00:00'),
(5, 'Thursday', '10:00:00', '18:00:00'),

(6, 'Monday', '08:00:00', '16:00:00'),
(6, 'Wednesday', '08:00:00', '16:00:00'),
(6, 'Friday', '08:00:00', '16:00:00'),

(7, 'Sunday', '09:00:00', '17:00:00'),
(7, 'Tuesday', '09:00:00', '17:00:00'),
(7, 'Thursday', '09:00:00', '17:00:00');
