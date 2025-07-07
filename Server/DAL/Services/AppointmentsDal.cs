using DAL.Api;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Exeptions;
namespace DAL.Services
{
    public class AppointmentsDal : IAppointmentsDal
    {
        private readonly DB_Manager _DB_Manager;

        public AppointmentsDal(DB_Manager db_Manager)
        {
            _DB_Manager = db_Manager ?? throw new DALValidationException("DB_Manager cannot be null.");
        }

        public async Task AddAppointment(Appointment appointment)
        {
            if (appointment == null)
                //!!! check if the appointment have all the fields.
                throw new DALValidationException("Appointment cannot be null.");

            try
            {
                _DB_Manager.Appointments.Add(appointment);
                await _DB_Manager.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new DALDataAccessException("Error adding appointment.", ex);
            }
        }

        public async Task<Appointment> DeleteAppointment(int id)
        {
            try
            {
                var appointment = await _DB_Manager.Appointments.FindAsync(id);
                if (!checkAppointmentNotNull(appointment))
                    throw new DALNotFoundException($"Appointment with ID {id} not found.");

                _DB_Manager.Appointments.Remove(appointment);
                await _DB_Manager.SaveChangesAsync();
                return appointment;
            }
            catch (DALNotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new DALDataAccessException($"Error deleting appointment with ID {id}.", ex);
            }
        }

        public async Task DeleteRangeAppointments(List<Appointment> appointments)
        {
            if (appointments == null)
                throw new DALValidationException("Appointments list cannot be null.");
            bool flag = true;
                appointments.ForEach(a => { 
                    if (!checkAppointmentNotNull(a)) 
                        flag = false;
                });
            if(!flag)
                throw new DALValidationException();
            try
            {
                _DB_Manager.Appointments.RemoveRange(appointments);
                await _DB_Manager.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new DALDataAccessException("Error deleting range of appointments.", ex);
            }
        }
        private bool checkAppointmentNotNull(Appointment a)
        {
            return a != null;
            //maybe add another validations
        }
        public async Task<List<Appointment>> GetAppointmentsByPatientId(int patientId)
        {
            try
            {
                return await _DB_Manager.Appointments
                    .Where(a => a.PatientId == patientId)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new DALDataAccessException($"Error retrieving appointments for patient ID {patientId}.", ex);
            }
        }

        public async Task<List<Appointment>> GetAppointmentsByPatientIdAndDate(int patientId, DateOnly date)
        {
            try
            {
                Patient patientExists = await _DB_Manager.Patients.FindAsync(patientId);
                if (patientExists==null)
                    throw new DALNotFoundException("Patient details were wrong.");

                return  patientExists.Appointments
                    .Where(a => a.PatientId == patientId && IsDateInRange(a.AppointmentDate,date))
                    .ToList();
            }
            catch (Exception ex)
            {
                throw new DALDataAccessException($"Error retrieving appointments for patient ID {patientId} on date {date}.", ex);
            }
        }
        private bool IsDateInRange(DateTime date, DateOnly startDate)
        {
            DateTime startDateTime = startDate.ToDateTime(TimeOnly.MinValue);
            DateTime endOfWeek = startDateTime.AddDays(7 - (int)startDateTime.DayOfWeek);
            return date.Date >= startDateTime.Date && date.Date <= endOfWeek.Date;
        }


        public async Task<List<Appointment>> GetAppointmentsByPatientIdAndTherapistIdAndDate(int patientId, DateOnly date, int therapistId)
        {
            try
            {
                Patient patientExists = await _DB_Manager.Patients.FindAsync(patientId);
                if (patientExists==null)
                    throw new DALNotFoundException("Patient details were wrong.");
               
                var therapistExists = await _DB_Manager.Therapists.AnyAsync(c => c.TherapistId == therapistId);
                if (!therapistExists)
                    throw new DALNotFoundException("Therapist details were wrong.");

                var appointments = patientExists.Appointments.Where(a => a.TherapistId == therapistId && IsDateInRange(a.AppointmentDate, date)).ToList();

                if (appointments == null)
                    throw new DALNotFoundException("Appointment not found.");

                return appointments;
            }
            catch (DALNotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new DALDataAccessException($"Error retrieving appointment for patient {patientId}, therapist {therapistId} on {date}.", ex);
            }
        }

        public async Task<List<Appointment>> GetAppointmentsByTherapistIdAndDate(int therapistId, DateOnly date)
        {
            try
            {
                Therapist therapistExists = await _DB_Manager.Therapists.FirstOrDefaultAsync(c => c.TherapistId == therapistId||c.Id==therapistId);
                if (therapistExists==null)
                    throw new DALNotFoundException("Therapist details were wrong.");

                var appointments = therapistExists.Appointments
                    .Where(c => IsDateInRange(c.AppointmentDate, date)).Select(c =>
                    new Appointment()
                    {
                        AppointmentDate=c.AppointmentDate,
                        DurationMinutes=c.DurationMinutes,
                        Patient=c.Patient,
                        AppointmentId=c.AppointmentId,
                        PatientId=c.PatientId,
                        Specialization = c.Specialization,
                        Status=c.Status,
                        Therapist=c.Therapist,
                        TherapistId=c.TherapistId,
                        TherapistName=c.TherapistName
                    }
                    )
                    .ToList();

                return appointments;
            }
            catch (DALNotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new DALDataAccessException($"Error retrieving appointments for therapist ID {therapistId} on date {date}.", ex);
            }
        }

        public async Task<List<Appointment>> DeleteAppointmentsByTherapistIdAndDay(int therapistId, DateOnly date)
        {
            try
            {
                var therapistExists = await _DB_Manager.Therapists.AnyAsync(c => c.TherapistId == therapistId);
                if (!therapistExists)
                    throw new DALNotFoundException("Therapist details were wrong.");

                DateTime dateTime = date.ToDateTime(TimeOnly.MinValue);
                var deleteAppointments = await _DB_Manager.Appointments
                    .Where(c => c.AppointmentDate.Date == dateTime.Date && c.TherapistId == therapistId)
                    .ToListAsync();


                _DB_Manager.Appointments.RemoveRange(deleteAppointments);
                await _DB_Manager.SaveChangesAsync();

                return deleteAppointments;
            }
            catch (DALNotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new DALDataAccessException($"Error deleting appointments for therapist ID {therapistId} on date {date}.", ex);
            }
        }

        public async Task<List<Appointment>> GetAllAppointments()
        {
            try
            {
                return await _DB_Manager.Appointments.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new DALDataAccessException("Error retrieving all appointments.", ex);
            }
        }

        public async Task<List<Appointment>> GetAllAppointmentsSet()
        {
            try
            {
                return await _DB_Manager.Appointments.Where(a => a.Status != "cancel").ToListAsync();
            }
            catch (Exception ex)
            {
                throw new DALDataAccessException("Error retrieving all set appointments.", ex);
            }
        }

        public async Task<List<Appointment>> GetAllAppointmentsCanceled()
        {
            try
            {
                return await _DB_Manager.Appointments.Where(a => a.Status == "cancel").ToListAsync();
            }
            catch (Exception ex)
            {
                throw new DALDataAccessException("Error retrieving all canceled appointments.", ex);
            }
        }
        public async Task<List<Appointment>> DeleteAppointmentsByTherapistIdAndDayGoingEarlier(int therapistId, DateOnly date, TimeOnly starthour, TimeOnly endhour)
        {
            try
            {
                var therapistExists = await _DB_Manager.Therapists.AnyAsync(c => c.TherapistId == therapistId);
                if (!therapistExists)
                    throw new DALNotFoundException("Therapist details were wrong.");

                var dateExists = await _DB_Manager.Appointments.AnyAsync(c => c.AppointmentDate.Date == date.ToDateTime(TimeOnly.MinValue).Date);
                if (!dateExists)
                    throw new DALValidationException($"Therapist doesn't work on this date: {date} or date details were wrong. Try again!");

                var deleteAppointments = await _DB_Manager.Appointments
                    .Where(c => c.AppointmentDate.Date == date.ToDateTime(TimeOnly.MinValue).Date &&
                                c.TherapistId == therapistId &&
                                (c.AppointmentDate.TimeOfDay >= starthour.ToTimeSpan() && c.AppointmentDate.TimeOfDay <= endhour.ToTimeSpan()))
                    .ToListAsync();

                _DB_Manager.Appointments.RemoveRange(deleteAppointments);
                await _DB_Manager.SaveChangesAsync();

                return deleteAppointments;
            }
            catch (DALNotFoundException)
            {
                throw;
            }
            catch (DALValidationException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new DALDataAccessException($"Error deleting appointments by therapist {therapistId} on date {date} in time range.", ex);
            }
        }


        public async Task<List<Appointment>> GetAppointmentsByDate(DateOnly date = default)
        {
            try
            {
                if (date == default)
                {
                    date = DateOnly.FromDateTime(DateTime.Now.AddDays(1));
                }

                var appointments = await _DB_Manager.Appointments
                    .Where(c => c.AppointmentDate.Date == date.ToDateTime(TimeOnly.MinValue).Date)
                    .ToListAsync();

                if (appointments == null || appointments.Count == 0)
                    throw new DALNotFoundException("No appointments found for the given date.");

                return appointments;
            }
            catch (DALNotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new DALDataAccessException($"Error retrieving appointments by date {date}.", ex);
            }
        }

        public async Task<List<Appointment>> DeleteAppointmentsByDate(DateOnly date)
        {
            try
            {
                var dateExists = await _DB_Manager.Appointments.AnyAsync(c => c.AppointmentDate.Date == date.ToDateTime(TimeOnly.MinValue).Date);
                if (!dateExists)
                    throw new DALValidationException($"No appointments found for the given date: {date} or date details were wrong. Try again!");

                var deleteAppointments = await _DB_Manager.Appointments
                    .Where(c => c.AppointmentDate.Date == date.ToDateTime(TimeOnly.MinValue).Date)
                    .ToListAsync();

                _DB_Manager.Appointments.RemoveRange(deleteAppointments);
                await _DB_Manager.SaveChangesAsync();

                return deleteAppointments;
            }
            catch (DALValidationException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new DALDataAccessException($"Error deleting appointments by date {date}.", ex);
            }
        }

        public async Task<List<Appointment>> GetAllAppointmentsByPatientIdAndTherapistId(int patientId, int therapistId)
        {
            try
            {
                var patientExists = await _DB_Manager.Patients.AnyAsync(c => c.PatientId == patientId);
                if (!patientExists)
                    throw new DALNotFoundException("Patient details were wrong.");

                var therapistExists = await _DB_Manager.Therapists.AnyAsync(c => c.TherapistId == therapistId);
                if (!therapistExists)
                    throw new DALNotFoundException("Therapist details were wrong.");

                var appointments = await _DB_Manager.Appointments
                    .Where(c => c.PatientId == patientId && c.TherapistId == therapistId)
                    .ToListAsync();

                if (appointments == null || appointments.Count == 0)
                    throw new DALNotFoundException("Appointments not found.");

                return appointments;
            }
            catch (DALNotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new DALDataAccessException($"Error retrieving appointments for patient {patientId} and therapist {therapistId}.", ex);
            }
        }


        public async Task<List<Appointment>> GetAppointmentsTherapistAndDate(int therapistId, DateOnly date)
        {
            try
            {

                int diff = date.DayOfWeek - DayOfWeek.Sunday;
                if (diff < 0) diff += 7;
                var startOfWeek = date.AddDays(-diff);
                var endOfWeek = startOfWeek.AddDays(6);

                return await _DB_Manager.Appointments
                    .Where(a => a.AppointmentDate.Date >= startOfWeek.ToDateTime(TimeOnly.MinValue).Date &&
                                 a.AppointmentDate.Date <= endOfWeek.ToDateTime(TimeOnly.MinValue).Date &&
                                 a.TherapistId == therapistId)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new DALDataAccessException($"Error retrieving appointments for therapist {therapistId} in week of date {date}.", ex);
            }
        }

        /// <summary>
        /// Rebecca add this function if you have any questions about the implementation or the function, contact me by phone:0548535515
        /// </summary>
        public async Task<Appointment> SetAppointmentStatus(int appointmentId, bool isConfirm)
        {
            try
            {
                string status = isConfirm ? "ConfirmedByPatient" : "Pending";

                var appointment = await _DB_Manager.Appointments.FirstOrDefaultAsync(a => a.AppointmentId == appointmentId);

                if (appointment == null)
                    throw new DALNotFoundException($"Appointment with ID {appointmentId} not found.");

                appointment.Status = status;

                await _DB_Manager.SaveChangesAsync();

                return appointment;
            }
            catch (DALNotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new DALDataAccessException($"Error setting status for appointment {appointmentId}.", ex);
            }
        }

        public async Task<Appointment> GetAppointmentById(int appointmentId)
        {
            try
            {
                var appointment = await _DB_Manager.Appointments.FindAsync(appointmentId);
                if (appointment == null)
                    throw new DALNotFoundException($"Appointment with ID {appointmentId} not found.");

                return appointment;
            }
            catch (DALNotFoundException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new DALDataAccessException($"Error retrieving appointment with ID {appointmentId}.", ex);
            }
        }
    }
}



//using DAL.Api;
//using DAL.Common;
//using DAL.Models;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using static System.Runtime.InteropServices.JavaScript.JSType;

//namespace DAL.Services
//{
//    public class AppointmentsDal : IAppointmentsDal
//    {

//        private readonly DB_Manager _DB_Manager;
//        // Constructor that initializes the DB_Manager instance
//        public AppointmentsDal(DB_Manager db_Manager)
//        {
//            _DB_Manager = db_Manager;
//        }

//        public async Task AddAppointment(Appointment appointment)
//        {
//            if (appointment == null)
//                throw new ArgumentNullException(nameof(appointment), "Appointment cannot be null.");

//            _DB_Manager.Appointments.Add(appointment);
//            await _DB_Manager.SaveChangesAsync();
//        }

//        public async Task<Appointment> DeleteAppointment(int id)
//        {
//            var appointment = await _DB_Manager.Appointments.FindAsync(id);
//            if (appointment == null)
//                throw new KeyNotFoundException($"Appointment with ID {id} not found.");

//            _DB_Manager.Appointments.Remove(appointment);
//            await _DB_Manager.SaveChangesAsync();
//            return appointment;
//        }
//        public async Task DeleteRangeAppointments(List<Appointment> appointments)
//        {
//            _DB_Manager.Appointments.RemoveRange(appointments);
//            await _DB_Manager.SaveChangesAsync();
//        }

//        public async Task<List<Appointment>> GetAppointmentsByPatientId(int patientId)
//        {
//            return await _DB_Manager.Appointments
//                .Where(a => a.PatientId == patientId)
//                .ToListAsync();
//        }

//        public async Task<List<Appointment>> GetAppointmentsByPatientIdAndDate(int patientId, DateOnly date)
//        {
//            return await _DB_Manager.Appointments
//                .Where(a => a.PatientId == patientId && a.AppointmentDate == date)
//                .ToListAsync();
//        }

//        public async Task<Appointment> GetAppointmentsByPatientIdAndThetherapistIdAndDate(int patientId, DateOnly date, int therapistId)
//        {
//            var patients = _DB_Manager.Patients.Where(c => c.PatientId == patientId);
//            if (patients == null)
//                throw new Exception("Patient details were worng");
//            var therapists = _DB_Manager.Therapists.Where(c => c.TherapistId == therapistId);
//            if (therapists == null)
//                throw new Exception("Therapist details were worng");
//            Appointment appointment = await _DB_Manager.Appointments
//                .Where(c => c.PatientId == patientId && c.TherapistId == therapistId && c.AppointmentDate == date)
//                .FirstOrDefaultAsync();
//            if (appointment == null)
//                throw new Exception("Appointment not found");
//            return appointment;
//        }

//        public async Task<List<Appointment>> GetAppointmentsByTherapistIdAndDate(int therapistId, DateOnly? date)
//        {

//            var therapists = _DB_Manager.Therapists.Where(c => c.TherapistId == therapistId);
//            if (therapists == null)
//                throw new Exception("therapist details were worng");
//            if (date == null)
//                date = DateOnly.FromDateTime(DateTime.Now);
//            //else if (!_DB_Manager.Appointments.Any(c => c.AppointmentDate == date))
//            //    throw new Exception("date detailes were worng");
//            List<Appointment> appointments = await _DB_Manager.Appointments.Where(c => c.AppointmentDate == date && c.TherapistId == therapistId).Include(a => a.Patient)
//                .ToListAsync();
//            return appointments;
//        }

//        public async Task<List<Appointment>> DeleteAppointmentsByTherapistIdAndDay(int therapistId, DateOnly date)
//        {
//            var therapists = _DB_Manager.Therapists.Where(c => c.TherapistId == therapistId);
//            if (therapists == null)
//                throw new Exception("therapist details were worng");

//            List<Appointment> deleteApointments = await _DB_Manager.Appointments.Where(c => c.AppointmentDate == date && c.TherapistId == therapistId).ToListAsync();

//            _DB_Manager.Appointments.RemoveRange(deleteApointments);
//            await _DB_Manager.SaveChangesAsync();

//            return deleteApointments;

//        }
//        public async Task<List<Appointment>> GetAllAppointments()
//        {
//            List<Appointment> appointments = await _DB_Manager.Appointments.ToListAsync();
//            return appointments;
//        }
//        public async Task<List<Appointment>> GetAllAppointmentsSet()
//        {
//            return await _DB_Manager.Appointments.Where(a => a.Status != "cancel").ToListAsync();
//        }
//        public async Task<List<Appointment>> GetAllAppointmentsCanceled()
//        {
//            return await _DB_Manager.Appointments.Where(a => a.Status == "cancel").ToListAsync();
//        }

//        public async Task<List<Appointment>> DeleteAppointmentsByTherapistIdAndDayGoingEarlier(int therapistId, DateOnly date, TimeOnly starthour, TimeOnly endhour)

//        {
//            var therapists = _DB_Manager.Therapists.Where(c => c.TherapistId == therapistId);
//            if (therapists == null)
//                throw new Exception("therapist details were worng");
//            var dt = _DB_Manager.Appointments.Where(c => c.AppointmentDate == date);
//            if (dt == null)
//                throw new Exception($"therapit doesn't work on this date:{date}\nor date details were worng\n try again!");
//            List<Appointment> deleteApointments = _DB_Manager.Appointments.Where(c => c.AppointmentDate == date && c.TherapistId == therapistId && c.AppointmentTime >= starthour || c.AppointmentTime <= endhour).ToList();

//            _DB_Manager.Appointments.RemoveRange(deleteApointments);
//            await _DB_Manager.SaveChangesAsync();
//            return deleteApointments;
//        }

//        public async Task<List<Appointment>> GetAppointmentsByDate(DateOnly? date)
//        {
//            if (date == null)
//            {
//                date = DateOnly.FromDateTime(DateTime.Now.AddDays(1));
//                // default to the next day instead the business day need to replace.
//            }
//            List<Appointment> appointments = await _DB_Manager.Appointments.Where(c => c.AppointmentDate == date).ToListAsync();
//            if (appointments == null)
//                throw new Exception("date detailes were worng");

//            return appointments;

//        }

//        public async Task<List<Appointment>> DeleteAppointmentsByDate(DateOnly date)
//        {
//            var dt = _DB_Manager.Appointments.Where(c => c.AppointmentDate == date);
//            if (dt == null)
//                throw new Exception($"therapit doesn't work on this date:{date}\nor date details were worng\n try again!");
//            List<Appointment> deleteApointments = _DB_Manager.Appointments.Where(c => c.AppointmentDate == date).ToList();
//            _DB_Manager.Appointments.RemoveRange(deleteApointments);
//            await _DB_Manager.SaveChangesAsync();
//            return deleteApointments;
//        }

//        public async Task<List<Appointment>> GetAllAppointmentsByPatientIdAndTherapistId(int patientId, int therapistId)
//        {
//            var patients = _DB_Manager.Patients.Where(c => c.PatientId == patientId);
//            if (patients == null)
//                throw new Exception("Patient details were worng");
//            var therapists = _DB_Manager.Therapists.Where(c => c.TherapistId == therapistId);
//            if (therapists == null)
//                throw new Exception("Therapist details were worng");
//            var appointments = await _DB_Manager.Appointments
//                .Where(c => c.PatientId == patientId && c.TherapistId == therapistId).ToListAsync();
//            if (appointments == null)
//                throw new Exception("Appointments not found");
//            return appointments;
//        }
//        public async Task<List<Appointment>> GetAppointmentsTherapistAndDate(int thrapistId, DateOnly? date)
//        {
//            int diff;
//            if (date == null)
//            {
//                date = new DateOnly();
//            }
//            diff = date.Value.ToDateTime(TimeOnly.MinValue).DayOfWeek - DayOfWeek.Sunday;
//            if (diff < 0) diff += 7;
//            var startOfWeek = date.Value.AddDays(-diff);

//            // סוף שבוע (שבת)
//            var endOfWeek = startOfWeek.AddDays(6);

//            return await _DB_Manager.Appointments
//                .Where(a => a.AppointmentDate >= startOfWeek
//                 && a.AppointmentDate <= endOfWeek && a.TherapistId == thrapistId)
//                .ToListAsync();
//        }

//        /// <summary>
//        /// Rebecca add this function if you have any questions about the implementation or the function, contact me by phone:0548535515
//        /// </summary>
//        /// <returns></returns>
//        public async Task<Appointment> SetAppointmentStatus(int appointmentId, bool isConfirm)
//        {
//            string status = isConfirm ? "ConfirmedByPatient" : "Pending";
//            var appointment = await _DB_Manager.Appointments
//                .FirstOrDefaultAsync(a => a.AppointmentId == appointmentId);
//            if (appointment == null)
//                return null;
//            appointment.Status = status;
//            await _DB_Manager.SaveChangesAsync();
//            return appointment;
//        }

//        public async Task<Appointment> GetAppointmentById(int appointmentId)
//        {
//            return await _DB_Manager.Appointments.FindAsync(appointmentId);
//        }

//        //----------------------------------------------------------------
//    }
//}
//﻿using DAL.Api;
//using DAL.Models;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace DAL.Services
//{
//    public class AppointmentsDal : IAppointmentsDal
//    {

//        private readonly DB_Manager _DB_Manager;
//        // Constructor that initializes the DB_Manager instance
//        public AppointmentsDal(DB_Manager db_Manager)
//        {
//            _DB_Manager = db_Manager;
//        }

//        public async Task AddAppointment(Appointment appointment)
//        {
//            if (appointment == null)
//                throw new ArgumentNullException(nameof(appointment), "Appointment cannot be null.");

//            _DB_Manager.Appointments.Add(appointment);
//            await _DB_Manager.SaveChangesAsync();
//        }

//        public async Task<Appointment> DeleteAppointment(int id)
//        {
//            var appointment = await _DB_Manager.Appointments.FindAsync(id);
//            if (appointment == null)
//                throw new KeyNotFoundException($"Appointment with ID {id} not found.");

//            _DB_Manager.Appointments.Remove(appointment);
//            await _DB_Manager.SaveChangesAsync();
//            return appointment;
//        }
//        public async Task DeleteRangeAppointments(List<Appointment> appointments)
//        {
//            _DB_Manager.Appointments.RemoveRange(appointments); 
//            await _DB_Manager.SaveChangesAsync();
//        }

//        public async Task<List<Appointment>> GetAppointmentsByPatientId(int patientId)
//        {
//            return await _DB_Manager.Appointments
//                .Where(a => a.PatientId == patientId)
//                .ToListAsync();
//        }

//        public async Task<List<Appointment>> GetAppointmentsByPatientIdAndDate(int patientId, DateOnly date)
//        {
//            return await _DB_Manager.Appointments
//                .Where(a => a.PatientId == patientId && a.AppointmentDate == date)
//                .ToListAsync();
//        }

//        public async Task<Appointment> GetAppointmentsByPatientIdAndThetherapistIdAndDate(int patientId, DateOnly date, int therapistId)
//        {
//            var patients = _DB_Manager.Patients.Where(c => c.PatientId == patientId);
//            if (patients == null)
//                throw new Exception("Patient details were worng");
//            var therapists = _DB_Manager.Therapists.Where(c => c.TherapistId == therapistId);
//            if (therapists == null)
//                throw new Exception("Therapist details were worng");
//            Appointment appointment = await _DB_Manager.Appointments
//                .Where(c => c.PatientId == patientId && c.TherapistId == therapistId && c.AppointmentDate == date)
//                .FirstOrDefaultAsync();
//            if (appointment == null)
//                throw new Exception("Appointment not found");
//            return appointment;
//        }

//        public async Task<List<Appointment>> GetAppointmentsByTherapistIdAndDate(int therapistId, DateOnly? date)
//        {

//            var therapists = _DB_Manager.Therapists.Where(c => c.TherapistId == therapistId);
//            if (therapists == null)
//                throw new Exception("therapist details were worng");
//            if (date == null)
//                date = DateOnly.FromDateTime(DateTime.Now);
//            //else if (!_DB_Manager.Appointments.Any(c => c.AppointmentDate == date))
//            //    throw new Exception("date detailes were worng");
//            List<Appointment> appointments = await _DB_Manager.Appointments.Where(c =>c.AppointmentDate == date && c.TherapistId == therapistId).Include(a => a.Patient)
//                .ToListAsync();
//            return appointments;
//        }

//        public async Task<List<Appointment>> DeleteAppointmentsByTherapistIdAndDay(int therapistId, DateOnly date)
//        {
//            var therapists = _DB_Manager.Therapists.Where(c => c.TherapistId == therapistId);
//            if (therapists == null)
//                throw new Exception("therapist details were worng");

//            List<Appointment> deleteApointments = await _DB_Manager.Appointments.Where(c => c.AppointmentDate == date && c.TherapistId == therapistId).ToListAsync();

//            _DB_Manager.Appointments.RemoveRange(deleteApointments);
//            await _DB_Manager.SaveChangesAsync();

//            return deleteApointments;

//        }
//        public async Task<List<Appointment>> GetAllAppointments()
//        {
//            List < Appointment > appointments= await _DB_Manager.Appointments.ToListAsync();
//            return appointments;
//        }
//        public async Task<List<Appointment>> GetAllAppointmentsSet()
//        {
//            return await _DB_Manager.Appointments.Where(a => a.Status != "cancel").ToListAsync();
//        }
//        public async Task<List<Appointment>> GetAllAppointmentsCanceled()
//        {
//            return await _DB_Manager.Appointments.Where(a => a.Status == "cancel").ToListAsync();
//        }

//        public async Task<List<Appointment>> DeleteAppointmentsByTherapistIdAndDayGoingEarlier(int therapistId, DateOnly date, TimeOnly starthour, TimeOnly endhour)

//        {
//            var therapists = _DB_Manager.Therapists.Where(c => c.TherapistId == therapistId);
//            if (therapists == null)
//                throw new Exception("therapist details were worng");
//            var dt = _DB_Manager.Appointments.Where(c => c.AppointmentDate == date);
//            if (dt == null)
//                throw new Exception($"therapit doesn't work on this date:{date}\nor date details were worng\n try again!");
//            List<Appointment> deleteApointments = _DB_Manager.Appointments.Where(c => c.AppointmentDate == date && c.TherapistId == therapistId && c.AppointmentTime >= starthour || c.AppointmentTime <= endhour).ToList();

//            _DB_Manager.Appointments.RemoveRange(deleteApointments);
//            await _DB_Manager.SaveChangesAsync();
//            return deleteApointments;
//        }

//        public async Task<List<Appointment>> GetAppointmentsByDate(DateOnly? date)
//        {
//            if (date == null)
//            {
//                date = DateOnly.FromDateTime(DateTime.Now.AddDays(1));
//                // default to the next day instead the business day need to replace.
//            }

//            else if (!_DB_Manager.Appointments.Any(c => c.AppointmentDate == date))
//                throw new Exception("date detailes were worng");
//            List<Appointment> appointments = await _DB_Manager.Appointments.Where(c => c.AppointmentDate == date).ToListAsync();

//            return appointments;

//        }

//        public async Task<List<Appointment>> DeleteAppointmentsByDate(DateOnly date)
//        {
//            var dt = _DB_Manager.Appointments.Where(c => c.AppointmentDate == date);
//            if (dt == null)
//                throw new Exception($"therapit doesn't work on this date:{date}\nor date details were worng\n try again!");
//            List<Appointment> deleteApointments = _DB_Manager.Appointments.Where(c => c.AppointmentDate == date).ToList();
//            _DB_Manager.Appointments.RemoveRange(deleteApointments);
//            await _DB_Manager.SaveChangesAsync();
//            return deleteApointments;

//        }
//    }
//}