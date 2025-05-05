using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Api;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
namespace DAL.Services
{
    internal class AvailableAppointmentsDal : IAvailableAppointmentsDal
    {
        private readonly DB_Manager _DB_Manager;

        public AvailableAppointmentsDal(DB_Manager dB_Manager)
        {
            _DB_Manager = dB_Manager;
        }
        
        public async Task AddAppointment(AvailableAppointment appointment)
        {
            await _DB_Manager.AvailableAppointments.AddAsync(appointment);
            await _DB_Manager.SaveChangesAsync();
        }

        public async Task<List<AvailableAppointment>> GetAppointmentByTherapistAndFullDate(DateOnly date, int therapistId)
        {
            return await _DB_Manager.AvailableAppointments
                .Where(a => a.AppointmentDate == date && a.TherapistId == therapistId).ToListAsync();
        }

        public async Task<List<AvailableAppointment>> GetAppointmentsBySpecializationAndDate(DateOnly date, int specialization)
        {
               return await _DB_Manager.AvailableAppointments
                .Where(a => a.AppointmentDate == date && a.Specialization == specialization)
                .ToListAsync();
        }

        public async Task<List<AvailableAppointment>> GetAppointmentsByTherapistAndDate(DateOnly date, int therapistId)
        {
            return await _DB_Manager.AvailableAppointments
                .Where(a => a.AppointmentDate == date && a.TherapistId == therapistId)
                .ToListAsync();
        }

        public async Task<List<AvailableAppointment>> GetAppointmentsByTherapistAndWeek(DateOnly date, int therapistId)
        {
            var startOfWeek = date.AddDays(-(int)date.DayOfWeek);// Assuming a method to get the start of the week
            var endOfWeek = startOfWeek.AddDays(6); // Get the end of the week
            return await _DB_Manager.AvailableAppointments
                .Where(a => a.TherapistId == therapistId && a.AppointmentDate >= startOfWeek && a.AppointmentDate <= endOfWeek && a.TherapistId == therapistId)
                .ToListAsync();
        }

        public async Task<List<AvailableAppointment>> RemoveAllAppointmentsByDate(DateOnly date)
        {
            var appointments = _DB_Manager.AvailableAppointments
                .Where(a => a.AppointmentDate == date)
                .ToList();
            _DB_Manager.AvailableAppointments.RemoveRange(appointments);
            await _DB_Manager.SaveChangesAsync();
            return appointments;
        }

        public async Task<List<AvailableAppointment>> RemoveAllAppointmentsByDateAndTherapist(int therapistId, DateOnly date)
        {
            var appointments = _DB_Manager.AvailableAppointments
                .Where(a => a.TherapistId == therapistId && a.AppointmentDate == date)
                .ToList();
            _DB_Manager.AvailableAppointments.RemoveRange(appointments);
            await _DB_Manager.SaveChangesAsync();
            return appointments;
        }

        public async Task<AvailableAppointment> RemoveAppointment(int appointmentId)
        {
            var appointment = await _DB_Manager.AvailableAppointments.FindAsync(appointmentId);
            if (appointment == null)
                throw new KeyNotFoundException($"Appointment with ID {appointmentId} not found.");

            _DB_Manager.AvailableAppointments.Remove(appointment);
            await _DB_Manager.SaveChangesAsync();
            return appointment;
        }
    }
}
