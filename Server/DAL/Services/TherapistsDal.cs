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
    public class TherapistsDal : ITherapistsDal
    {

        private readonly DB_Manager _DB_Manager;
        public TherapistsDal(DB_Manager dB_Manager)
        {
            _DB_Manager = dB_Manager;
        }
        public async Task<Therapist> AddTherapist(Therapist therapist)
        {
            if (therapist == null)
            {
                throw new ArgumentNullException(nameof(therapist), "Therapist cannot be null.");
            }
            _DB_Manager.Therapists.Add(therapist);
            await _DB_Manager.SaveChangesAsync();
            return therapist;
        }
        #region delete_func
        //public async Task<Therapist> DeleteTherapist(int id)
        //{

        //    var therapist=await _DB_Manager.Therapists.FindAsync(id);
        //    if (therapist == null)
        //        throw new NullReferenceException(nameof(therapist));
        //        var appointments = await _DB_Manager.Appointments
        //            .Where(th => th.TherapistId == id)
        //            .ToListAsync();

        //        if (appointments.Any())
        //        {
        //            var availableAppointments = appointments.Select(a => new AvailableAppointment
        //            {
        //                AppointmentId = 0,
        //                AppointmentDate = a.AppointmentDate,
        //                TherapistId = a.TherapistId,
        //                Specialization = a.Therapist.Specialization,
        //                AppointmentTime = a.AppointmentTime,

        //            });
        //            var appointmentIds = appointments.Select(a => a.AppointmentId).ToList();

        //            var canceledAppointments = _DB_Manager.CanceledAppointments
        //                .Where(c => appointmentIds.Contains(c.AppointmentId))
        //                .ToList();
        //            var passedAppointments = _DB_Manager.PassedAppointments
        //            .Where(p => p.PatientId == id)
        //            .ToList();

        //        _DB_Manager.PassedAppointments.RemoveRange(passedAppointments);

        //        _DB_Manager.CanceledAppointments.RemoveRange(canceledAppointments);

        //        // שלב 2: מחיקת הפגישות עצמן
        //        _DB_Manager.Appointments.RemoveRange(appointments);

        //        _DB_Manager.AvailableAppointments.AddRange(availableAppointments);
        //        }
        //        var workHour=_DB_Manager.WorkHours.Where(c=>c.TherapistId == id).ToList();
        //             _DB_Manager.WorkHours.RemoveRange(workHour);

        //             _DB_Manager.Therapists.Remove(therapist);

        //              await _DB_Manager.SaveChangesAsync();
        //    return therapist;
        //}
        #endregion
        public async Task<Therapist> DeleteTherapist(int id)
        {
            var therapist = await _DB_Manager.Therapists.FirstAsync(th=>th.TherapistId==id);
            if (therapist == null)
                throw new NullReferenceException(nameof(therapist));

            // Remove all available appointments for this therapist
            var availableAppointments = _DB_Manager.AvailableAppointments
                .Where(a => a.TherapistId == id)
                .ToList();
            _DB_Manager.AvailableAppointments.RemoveRange(availableAppointments);

            // Find all appointments for this therapist
            var appointments = await _DB_Manager.Appointments
                .Where(th => th.TherapistId == id)
                .ToListAsync();

            if (appointments.Any())
            {
                var appointmentIds = appointments.Select(a => a.AppointmentId).ToList();

                var canceledAppointments = _DB_Manager.CanceledAppointments
                    .Where(c => appointmentIds.Contains(c.AppointmentId))
                    .ToList();

                var passedAppointments = _DB_Manager.PassedAppointments
                    .Where(p => appointmentIds.Contains(p.AppointmentId))
                    .ToList(); // Use AppointmentId, not PatientId

                _DB_Manager.PassedAppointments.RemoveRange(passedAppointments);
                _DB_Manager.CanceledAppointments.RemoveRange(canceledAppointments);

                _DB_Manager.Appointments.RemoveRange(appointments);

                // Do NOT add available appointments for this therapist here!
            }

            var workHour = _DB_Manager.WorkHours.Where(c => c.TherapistId == id).ToList();
            _DB_Manager.WorkHours.RemoveRange(workHour);

            _DB_Manager.Therapists.Remove(therapist);

            await _DB_Manager.SaveChangesAsync();
            return therapist;
        }
        public async Task<List<Therapist>> GetAllTherapists()
        {
            return await _DB_Manager.Therapists.ToListAsync();
        }

        public async Task<Therapist> GetTherapistById(int id)
        {
            var therapist = await _DB_Manager.Therapists.FindAsync(id);

            if (therapist == null)
            {
                throw new KeyNotFoundException($"Therapist with ID {id} was not found.");
            }

            return therapist;
        }

        public async Task<Therapist> GetTherapistByName(string firstName, string lastName)
        {
            if (string.IsNullOrWhiteSpace(firstName) || string.IsNullOrWhiteSpace(lastName))
            {
                throw new ArgumentException("First name and last name cannot be null or empty.");
            }

            var therapist = await _DB_Manager.Therapists
                .FirstOrDefaultAsync(t => t.FirstName == firstName && t.LastName == lastName);

            if (therapist == null)
            {
                throw new KeyNotFoundException($"Therapist with name {firstName} {lastName} was not found.");
            }

            return therapist;
        }

        public async Task<Therapist> UpdateTherapist(Therapist therapist)
        {
            if (therapist == null)
            {
                throw new ArgumentNullException(nameof(therapist), "Therapist cannot be null.");
            }

            var existingTherapist = await _DB_Manager.Therapists.FindAsync(therapist.TherapistId);
            if (existingTherapist == null)
            {
                throw new KeyNotFoundException($"Therapist with ID {therapist.TherapistId} was not found.");
            }

            _DB_Manager.Entry(existingTherapist).CurrentValues.SetValues(therapist);

            await _DB_Manager.SaveChangesAsync();
            return existingTherapist;
        }


    }
}


