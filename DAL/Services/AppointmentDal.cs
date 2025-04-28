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
    internal class AppointmentDal:IAppointmentDal
    {

        private readonly DB_Manager _context;
        public AppointmentDal(DB_Manager context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task AddAppointment(Appointment appointment)
        {
            if (appointment == null)
                throw new ArgumentNullException(nameof(appointment), "Appointment cannot be null.");

            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAppointment(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null)
                throw new KeyNotFoundException($"Appointment with ID {id} not found.");

            _context.Appointments.Remove(appointment);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Appointment>> GetAppointmentsByPatientId(int patientId)
        {

            return await _context.Appointments
                .Where(a => a.PatientId == patientId)
                .ToListAsync();
        }

        public async Task<List<Appointment>> GetAppointmentsByPatientIdAndDate(int patientId, DateOnly date)
        {
            return await _context.Appointments
                .Where(a => a.PatientId == patientId && a.AppointmentDate == date)
                .ToListAsync();
        }

        public async Task<Appointment> GetAppointmentsByPatientAndThetapistIdIdAndDate(int patientId, DateOnly date, int therapistId)
        {
            return await _context.Appointments
                .Where(a => a.PatientId == patientId && a.AppointmentDate == date)
                .FirstOrDefaultAsync();
        }


        public async Task<List<Appointment>> GetAppointmentsByTherapistIdAndDate(int therapistId, DateOnly date)
        {
            return await _context.Appointments
                .Where(a => a.TherapistId == therapistId && a.AppointmentDate == date)
                .ToListAsync();
        }

        public async Task<List<Appointment>> GetAppointmentsByTherapistId(int therapistId)
        {
            return await _context.Appointments
                .Where(a => a.TherapistId == therapistId)
                .ToListAsync();
        }

        public async Task<bool> IsTimeSlotAvailable(DateOnly date, TimeOnly time, int therapistId)
        {
            return !await _context.Appointments
                .AnyAsync(a => a.TherapistId == therapistId && a.AppointmentDate == date && a.AppointmentTime == time);
        }

        public async Task UpdateAppointment(Appointment appointment)
        {
            if (appointment == null)
                throw new ArgumentNullException(nameof(appointment), "Appointment cannot be null.");

            var existingAppointment = await _context.Appointments.FindAsync(appointment.AppointmentId);
            if (existingAppointment == null)
                throw new KeyNotFoundException($"Appointment with ID {appointment.AppointmentId} not found.");

            _context.Entry(existingAppointment).CurrentValues.SetValues(appointment);
            await _context.SaveChangesAsync();
        }
    }
}
