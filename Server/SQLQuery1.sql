-- הוספת תורים לדוגמה לטבלת Appointments

INSERT INTO Appointments 
(AppointmentId, PatientId, TherapistId, TherapistName, AppointmentDate, DurationMinutes, Specialization, Status)
VALUES
-- תורים מהעבר (יעברו ל-PastAppointments)
(1001, 234567896, 1, N'אורית כהן', '2025-07-20 12:00:00', 60, 'SpeechTherapy', 'Scheduled'),
(1002, 234567898, 2, N'דוד לוי', '2025-07-18 11:30:00', 45, 'OccupationalTherapy', 'Scheduled'),
(1003, 234537891, 3, N'מיכל מאיר', '2025-07-22 10:00:00', 30, 'PhysicalTherapy', 'Scheduled'),

-- תורים עתידיים (יישארו בטבלת Appointments)
(1004, 234567899, 4, N'יוסי בראון', '2025-07-28 14:00:00', 45, 'Psychology', 'Scheduled'),
(1005, 234567900, 5, N'תמר מזרחי', '2025-08-01 09:00:00', 30, 'SocialWork', 'Scheduled');
