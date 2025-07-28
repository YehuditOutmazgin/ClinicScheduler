using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Api;
using DAL.Models;
using Exeptions;
using Microsoft.EntityFrameworkCore;
namespace DAL.Services
{
    public class AvailableAppointmentsDal : IAvailableAppointmentsDal
    {
        private readonly DB_Manager _DB_Manager;

        public AvailableAppointmentsDal(DB_Manager dB_Manager)
        {
            _DB_Manager = dB_Manager;
        }
        
        public async Task<AvailableAppointment> AddAppointment(AvailableAppointment appointment)
        {
            await _DB_Manager.AvailableAppointments.AddAsync(appointment);
            await _DB_Manager.SaveChangesAsync();
            return appointment;
        }

        //--------------------------------------------------------------------------
        public async Task<bool> AddAppointments(List<AvailableAppointment> appointments)
        {
            foreach (var appointment in appointments)
            {
                await _DB_Manager.AvailableAppointments.AddAsync(appointment);
            }
           return (await _DB_Manager.SaveChangesAsync())>0;
        }
        //----------------------------------------------------------------------

        //public async Task<List<AvailableAppointment>> GetAppointmentByTherapistAndFullDate(DateOnly date, int therapistId)
        //{
        //    return await _DB_Manager.AvailableAppointments
        //        .Where(a => a.AppointmentDate.Date == date.ToDateTime(TimeOnly.MinValue).Date && a.TherapistId == therapistId)
        //        .ToListAsync();
        //}


        public async Task<List<AvailableAppointment>> GetAppointmentsBySpecializationAndDate(DateOnly date, Specialization specialization)
        {
            int diff = date.DayOfWeek - DayOfWeek.Sunday;
            if (diff < 0) diff += 7;
            var startOfWeek = date.AddDays(-diff);
            var endOfWeek = startOfWeek.AddDays(6);

            return await _DB_Manager.AvailableAppointments
                .Where(a => a.AppointmentDate.Date >= startOfWeek.ToDateTime(TimeOnly.MinValue).Date &&
                             a.AppointmentDate.Date <= endOfWeek.ToDateTime(TimeOnly.MinValue).Date &&
                             a.Specialization == specialization)
                .ToListAsync();
        }

        //public async Task<List<AvailableAppointment>> GetAppointmentsByTherapistAndDate(DateOnly date, int therapistId)
        //{
        //    return await _DB_Manager.AvailableAppointments
        //        .Where(a => a.AppointmentDate.Date == date.ToDateTime(TimeOnly.MinValue).Date &&
        //                     a.TherapistId == therapistId)
        //        .ToListAsync();
        //}

        public async Task<List<AvailableAppointment>> GetAppointmentsByTherapistAndWeek(DateOnly date, int therapistId)
        {
            var startOfWeek = date.AddDays(-(int)date.DayOfWeek); // Get the start of the week
            var endOfWeek = startOfWeek.AddDays(6); // Get the end of the week

            return await _DB_Manager.AvailableAppointments
                .Where(a => a.TherapistId == therapistId || a.Therapist.Id == therapistId &&
                             a.AppointmentDate.Date >= startOfWeek.ToDateTime(TimeOnly.MinValue).Date &&
                             a.AppointmentDate.Date <= endOfWeek.ToDateTime(TimeOnly.MinValue).Date)
                .ToListAsync();
        }

        //public async Task<List<AvailableAppointment>> RemoveAllAppointmentsByDate(DateOnly date)
        //{
        //    var appointments = await _DB_Manager.AvailableAppointments
        //        .Where(a => a.AppointmentDate.Date == date.ToDateTime(TimeOnly.MinValue).Date)
        //        .ToListAsync();

        //    _DB_Manager.AvailableAppointments.RemoveRange(appointments);
        //    await _DB_Manager.SaveChangesAsync();
        //    return appointments;
        //}


        public async Task<List<AvailableAppointment>> RemoveAllAppointmentsByDateAndTherapist(int therapistId, DateOnly date)
        {
            var therapistExists = await _DB_Manager.Therapists.FirstOrDefaultAsync(c => c.TherapistId == therapistId);
            if (therapistExists == null)
                throw new DALNotFoundException("Therapist details were wrong.");

            DateTime dateStart = date.ToDateTime(TimeOnly.MinValue); // 2025-07-29 00:00:00
            DateTime dateEnd = date.ToDateTime(TimeOnly.MaxValue);   // 2025-07-29 23:59:59.9999999

            var appointments = await _DB_Manager.AvailableAppointments
                .Where(c =>
                    c.AppointmentDate >= dateStart &&
                    c.AppointmentDate <= dateEnd &&
                        c.TherapistId == therapistExists.Id)
                .ToListAsync();


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
