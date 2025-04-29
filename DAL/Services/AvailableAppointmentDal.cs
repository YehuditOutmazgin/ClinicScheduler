using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Api;
using DAL.Models;
namespace DAL.Services
{
    internal class AvailableAppointmentDal : IAvailableAppointmentDal
    {
        private readonly DB_Manager _DB_Manager;

        public AvailableAppointmentDal(DB_Manager dB_Manager)
        {
            _DB_Manager = dB_Manager;
        }

        public async Task AddAppointment(AvailableAppointment appointment)
        {
            if(appointment == null)
                throw new ArgumentNullException(nameof(appointment), "Appointment cannot be null.");
             _DB_Manager.AvailableAppointments.Add(appointment);
            await _DB_Manager.SaveChangesAsync();
        }

        public Task<List<AvailableAppointment>> GetAppointmentByTherapistAndFullDate(DateOnly date, int therapistId)
        {
            throw new NotImplementedException();
        }

        public Task<List<AvailableAppointment>> GetAppointmentsBySpecializationAndDate(DateOnly date, int specialization)
        {
            throw new NotImplementedException();
        }

        public Task<List<AvailableAppointment>> GetAppointmentsByTherapistAndDate(DateOnly date, int therapistId)
        {
            throw new NotImplementedException();
        }

        public async Task RemoveAllAppointmentsByDate(DateOnly date)
        {
            var appointments = _DB_Manager.AvailableAppointments
                .Where(a => a.AppointmentDate == date)
                .ToList();
            _DB_Manager.AvailableAppointments.RemoveRange(appointments);
            await _DB_Manager.SaveChangesAsync();
        }

        public async Task RemoveAllAppointmentsByDateAndTherapist(int therapistId, DateOnly date)
        {
            var appointments = _DB_Manager.AvailableAppointments
                .Where(a => a.TherapistId == therapistId && a.AppointmentDate == date)
                .ToList();
            _DB_Manager.AvailableAppointments.RemoveRange(appointments);
            await _DB_Manager.SaveChangesAsync();
        }

        public async Task RemoveAppointment(int appointmentId)
        {
            var appointment = await _DB_Manager.AvailableAppointments.FindAsync(appointmentId);
            if (appointment == null)
                throw new KeyNotFoundException($"Appointment with ID {appointmentId} not found.");

            _DB_Manager.AvailableAppointments.Remove(appointment);
            await _DB_Manager.SaveChangesAsync();
        }
    }
}
