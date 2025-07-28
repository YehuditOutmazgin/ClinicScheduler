using DAL.Api;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DAL.Services
{
    public class CanceledAppointmentsDal : ICanceledAppointmentsDal
    {

        private readonly DB_Manager _DB_Manager;

        public CanceledAppointmentsDal(DB_Manager dB_Manager)
        {
            _DB_Manager = dB_Manager;
        }

        public async Task AddCanceledAppointment(CanceledAppointment appointment)
        {
            await _DB_Manager.CanceledAppointments.AddAsync(appointment);
            await _DB_Manager.SaveChangesAsync();
        }

        //public async Task AddCanceledAppointments(List<CanceledAppointment> appointments)
        //{
        //    await _DB_Manager.CanceledAppointments.AddRangeAsync(appointments);
        //    await _DB_Manager.SaveChangesAsync();
        //}

        public async Task<List<CanceledAppointment>> GetAllCanceledAppointments()
        {
            return await _DB_Manager.CanceledAppointments.ToListAsync();
        }

        //public async Task<List<CanceledAppointment>> GetCanceledAppointmentsByDate(DateOnly date)
        //{
        //    return await _DB_Manager.CanceledAppointments
        //        .Where(a => a.AppointmentDate.Date == date.ToDateTime(TimeOnly.MinValue).Date)
        //        .ToListAsync();
        //}

        public async Task<List<CanceledAppointment>> GetCanceledAppointmentsByPatientId(int patientId)
        {
            return await _DB_Manager.CanceledAppointments.Where(a => a.PatientId == patientId).ToListAsync();
        }

        public async Task<CanceledAppointment> RemoveCanceledAppointment(int appointmentId)
        {
            var appointment = await _DB_Manager.CanceledAppointments.FindAsync(appointmentId);
            if (appointment == null)
                throw new KeyNotFoundException($"Appointment with ID {appointmentId} not found.");
            _DB_Manager.CanceledAppointments.Remove(appointment);
            await _DB_Manager.SaveChangesAsync();
            return appointment;
        }

        //public async Task<List<CanceledAppointment>> RemoveCanceledAppointmentsOlderThan(DateOnly date)
        //{
        //    List<CanceledAppointment> appointments = await _DB_Manager.CanceledAppointments
        //        .Where(a => a.AppointmentDate.Date <= date.ToDateTime(TimeOnly.MinValue).Date)
        //        .ToListAsync();

        //    if (appointments.Count == 0)
        //    {
        //        throw new KeyNotFoundException("There are no appointments to remove");
        //    }

        //    _DB_Manager.CanceledAppointments.RemoveRange(appointments);
        //    await _DB_Manager.SaveChangesAsync();
        //    return appointments;
        //}

    }
}
