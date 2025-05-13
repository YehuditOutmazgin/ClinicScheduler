using DAL.Api;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Services
{
    internal class AppointmentsDal : IAppointmentsDal
    {

        private readonly DB_Manager _DB_Manager;
        // Constructor that initializes the DB_Manager instance
        public AppointmentsDal(DB_Manager db_Manager)
        {
            _DB_Manager = db_Manager;
        }

        public async Task AddAppointment(Appointment appointment)
        {
            if (appointment == null)
                throw new ArgumentNullException(nameof(appointment), "Appointment cannot be null.");

            _DB_Manager.Appointments.Add(appointment);
            await _DB_Manager.SaveChangesAsync();
        }

        public async Task DeleteAppointment(int id)
        {
            var appointment = await _DB_Manager.Appointments.FindAsync(id);
            if (appointment == null)
                throw new KeyNotFoundException($"Appointment with ID {id} not found.");

            _DB_Manager.Appointments.Remove(appointment);
            await _DB_Manager.SaveChangesAsync();
        }

        public async Task<List<Appointment>> GetAppointmentsByPatientId(int patientId)
        {
            return await _DB_Manager.Appointments
                .Where(a => a.PatientId == patientId)
                .ToListAsync();
        }

        public async Task<List<Appointment>> GetAppointmentsByPatientIdAndDate(int patientId, DateOnly date)
        {
            return await _DB_Manager.Appointments
                .Where(a => a.PatientId == patientId && a.AppointmentDate == date)
                .ToListAsync();
        }

        public async Task<Appointment> GetAppointmentsByPatientIdAndThetherapistIdAndDate(int patientId, DateOnly date, int therapistId)
        {
            var patients = _DB_Manager.Patients.Where(c => c.PatientId == patientId);
            if (patients==null)
                throw new Exception("Patient details were worng");
            var therapists = _DB_Manager.Therapists.Where(c => c.TherapistId == therapistId);
            if (therapists == null)
                throw new Exception("Therapist details were worng");
            Appointment appointment = await _DB_Manager.Appointments
                .Where(c => c.PatientId == patientId && c.TherapistId == therapistId && c.AppointmentDate == date)
                .FirstOrDefaultAsync();
            if (appointment == null)
                throw new Exception("Appointment not found");
            return  appointment;
        }

        public async Task<List<Appointment>> GetAppointmentsByTherapistIdAndDate(int therapistId, DateOnly? date)
        {

            var therapists = _DB_Manager.Therapists.Where(c => c.TherapistId == therapistId);
            if (therapists == null)
                throw new Exception("therapist details were worng");
            if (date == null)
                date = DateOnly.FromDateTime(DateTime.Now);
            else if(!_DB_Manager.Appointments.Any(c => c.AppointmentDate == date))
                throw new Exception("date detailes were worng");
            List<Appointment> appointments = await _DB_Manager.Appointments.Where(c => c.AppointmentDate == date && c.TherapistId == therapistId)
                .ToListAsync();
            return appointments ;
        }

        public async Task<List<Appointment>> DeleteAppointmentsByTherapistIdAndDay(int therapistId, DateOnly date)
        {
            var therapists = _DB_Manager.Therapists.Where(c => c.TherapistId == therapistId);
            if (therapists == null)
                throw new Exception("therapist details were worng");

            List < Appointment > deleteApointments= await _DB_Manager.Appointments.Where(c => c.AppointmentDate == date&&c.TherapistId==therapistId).ToListAsync();
            
            _DB_Manager.Appointments.RemoveRange(deleteApointments);
            await _DB_Manager.SaveChangesAsync();

            return deleteApointments;

        }

        public async Task<List<Appointment>> DeleteAppointmentsByTherapistIdAndDayGoingEarlier(int therapistId, DateOnly date, TimeOnly starthour, TimeOnly endhour)

        {
            var therapists = _DB_Manager.Therapists.Where(c => c.TherapistId == therapistId);
            if (therapists == null)
                throw new Exception("therapist details were worng");
            var dt = _DB_Manager.Appointments.Where(c => c.AppointmentDate == date);
            if (dt == null)
                throw new Exception($"therapit doesn't work on this date:{date}\nor date details were worng\n try again!");
            List<Appointment> deleteApointments = _DB_Manager.Appointments.Where(c => c.AppointmentDate == date && c.TherapistId == therapistId && c.AppointmentTime >= starthour || c.AppointmentTime <= endhour).ToList();
            
                _DB_Manager.Appointments.RemoveRange(deleteApointments);
           await _DB_Manager.SaveChangesAsync();
            return deleteApointments;
        }
       
        public async Task<List<Appointment>> GetAppointmentsByDate(DateOnly? date) {
            if (date == null)
            {
                date = DateOnly.FromDateTime(DateTime.Now.AddDays(1));
                // default to the next day instead the business day need to replace.
            }

            else if (!_DB_Manager.Appointments.Any(c => c.AppointmentDate == date))
                throw new Exception("date detailes were worng");
            List<Appointment> appointments =await _DB_Manager.Appointments.Where(c => c.AppointmentDate == date).ToListAsync();
            
            return appointments;

        }


    }
}
