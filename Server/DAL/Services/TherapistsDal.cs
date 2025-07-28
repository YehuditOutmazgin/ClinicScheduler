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
            var t=await _DB_Manager.Therapists.FindAsync(therapist.TherapistId);
            if (t!=null)
            {
                throw new Exception("You cant add therapist that with id that already exist.");
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
        //            var PastAppointments = _DB_Manager.PastAppointments
        //            .Where(p => p.PatientId == id)
        //            .ToList();

        //        _DB_Manager.PastAppointments.RemoveRange(PastAppointments);

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
            var therapist = await _DB_Manager.Therapists.FirstOrDefaultAsync(t=>t.Id==id || t.TherapistId==id);
            if (therapist == null)
                throw new NullReferenceException(nameof(therapist));
            

            // Remove all available appointments for this therapist
            var availableAppointments = await _DB_Manager.AvailableAppointments
                .Where(a => a.TherapistId == id)
                .ToListAsync();
             _DB_Manager.AvailableAppointments.RemoveRange(availableAppointments);
            await _DB_Manager.SaveChangesAsync();

            // Find all appointments for this therapist
            var appointments = await _DB_Manager.Appointments
                .Where(th => th.TherapistId == therapist.Id)
                .ToListAsync();

            if (appointments.Any())
            {
               List< CanceledAppointment> canceledAppointments = appointments.Select(a => new CanceledAppointment()
                {
                    AppointmentDate = a.AppointmentDate,
                    TherapistId = a.TherapistId,
                    AppointmentId = a.AppointmentId,
                    DurationMinutes=a.DurationMinutes,
                    PatientId=a.PatientId,
                    TherapistName=a.TherapistName,
                    Specialization=a.Specialization,
                    Note = "Therapist deleted, appointment canceled.",
                }).ToList();

                await _DB_Manager.CanceledAppointments.AddRangeAsync(canceledAppointments);
                if (canceledAppointments.Any())
                {

                    _DB_Manager.Appointments.RemoveRange(appointments);
                    await _DB_Manager.SaveChangesAsync();
                }
                // Do NOT add available appointments for this therapist here!
            }

            var workHour = await _DB_Manager.WorkHours.Where(c => c.TherapistId == id).ToListAsync();
            if(workHour.Any()){
                _DB_Manager.WorkHours.RemoveRange(workHour);
            }
            await _DB_Manager.SaveChangesAsync();



            var past = await _DB_Manager.PastAppointments.Where(c => c.TherapistId == id).ToListAsync();
            if (past != null && past.Any())
                _DB_Manager.PastAppointments.RemoveRange(past);
            await _DB_Manager.SaveChangesAsync();


            //var can = await _DB_Manager.CanceledAppointments.Where(c => c.TherapistId == id).ToListAsync();
            //if (can != null && can.Any())
            //    _DB_Manager.CanceledAppointments.RemoveRange(can);
            //await _DB_Manager.SaveChangesAsync();

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
            var therapist = await _DB_Manager.Therapists.FirstOrDefaultAsync(t=>t.Id==id || t.TherapistId==id);
            var therapists = await _DB_Manager.Therapists.ToListAsync();
            if (therapist == null)
            {
                //throw new KeyNotFoundException($"Therapist with ID {id} was not found.");
                return null;
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

            var existingTherapist = await _DB_Manager.Therapists.FindAsync(therapist.Id);
            if (existingTherapist == null)
            {
                throw new KeyNotFoundException($"Therapist with ID {therapist.TherapistId} was not found.");
            }

            existingTherapist.FirstName = therapist.FirstName;
            existingTherapist.LastName = therapist.LastName;
            existingTherapist.Specialization = therapist.Specialization;
            existingTherapist.PhoneNumber= therapist.PhoneNumber;
            await _DB_Manager.SaveChangesAsync();
            return existingTherapist;
        }


    }
}


