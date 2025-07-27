using DAL.Api;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DAL.Services
{
    public class PastAppointmentsDal : IPastAppointmentsDal

    {
        private readonly DB_Manager _DB_Manager;

        public PastAppointmentsDal(DB_Manager dbContext)
        {
            _DB_Manager = dbContext;
        }
        // ======= ADMIN ACTIONS =======

        public async void AddAllPastAppointments(List<PastAppointment> appointments)
        {
            //    //Be Attantion!!! to get a list that was checked that there isn't a null appointment    
            await _DB_Manager.PastAppointments.AddRangeAsync(appointments);
            await _DB_Manager.SaveChangesAsync();

        }

        //public async void DeleteAllPastAppointments(List<PastAppointment> appointments)
        //{
        //    _DB_Manager.PastAppointments.RemoveRange(appointments);
        //    await _DB_Manager.SaveChangesAsync();

        //}

        public async Task<bool> DeleteAllPastAppointmentsOlderThan(DateOnly date)
        {
            DateTime dateTime = date.ToDateTime(TimeOnly.MinValue);
            var appointmentsToDelete = await _DB_Manager.PastAppointments
                .Where(c => c.AppointmentDate < dateTime)
                .ToListAsync();

            _DB_Manager.PastAppointments.RemoveRange(appointmentsToDelete);
            return (await _DB_Manager.SaveChangesAsync()) > 0;
        }




        // ======= PATIENT =======


        public async Task<List<PastAppointment>> GetAllPastAppointmentsByPatientId(int patientId)
        {
            return await _DB_Manager.PastAppointments.Where(c => c.PatientId == patientId).ToListAsync();
        }

        //public async Task<List<PastAppointment>> GetAllPastAppointmentsByPatientIdAndSpecialization(int patientId, Specialization specialization)
        //{
        //    return await _DB_Manager.PastAppointments.Where(c => c.PatientId == patientId && c.Therapist.Specialization == specialization).ToListAsync();

        //}

        //public async Task<List<PastAppointment>> GetAllPastAppointmentsByPatientIdAndTherapistId(int patientId, int therapistId)
        //{
        //    return await _DB_Manager.PastAppointments.Where(c => c.PatientId == patientId && c.TherapistId == therapistId).ToListAsync();
        //}


        // ======= THERAPIST =======

        public async Task<List<PastAppointment>> GetAllPastAppointmentsByTherapistIdAndDate(int therapistId, DateOnly date)
        {
            return await _DB_Manager.PastAppointments.Where(c => c.TherapistId == therapistId && c.AppointmentDate.Date == date.ToDateTime(TimeOnly.MinValue).Date).ToListAsync();
        }


        //public async Task<List<PastAppointment>> GetAllPastAppointmentsByTherapistIdAndMonthDate(int therapistId, DateOnly month)
        //{
        //    return await _DB_Manager.PastAppointments.Where(c => c.TherapistId == therapistId && c.AppointmentDate.Year == month.Year && c.AppointmentDate.Month == month.Month).ToListAsync();

        //}

        public async Task<List<PastAppointment>> GetAllPastAppointmentsByTherapistIdAndRangeDate(int therapistId, DateOnly startDate, DateOnly endDate)
        {
            return await _DB_Manager.PastAppointments.Where(c => c.TherapistId == therapistId &&
                  c.AppointmentDate.CompareTo(startDate.ToDateTime(TimeOnly.MinValue)) >= 0 &&
                  c.AppointmentDate.CompareTo(endDate.ToDateTime(TimeOnly.MaxValue)) < 0)
                  .ToListAsync();

        }


        //public async Task<List<PastAppointment>> GetAllPastAppointmentsBySpecialization(Specialization specialization)
        //{
        //    return await _DB_Manager.PastAppointments.Where(c => c.Specialization == specialization).ToListAsync();

        //}
        // ======= GENERAL FILTERS =======

        //public async Task<List<PastAppointment>> GetAllPastAppointmentsByMonthDate(DateOnly month)
        //{
        //    return await _DB_Manager.PastAppointments.Where(c => c.AppointmentDate.Year == month.Year && c.AppointmentDate.Month == c.AppointmentDate.Month).ToListAsync();

        //}





        //<summery>
        //function that we made before 

        //public async void DeleteAllPastAppointmentsOnceAYear(List<PastAppointment> apointmentpassed)
        //{

        //           _dB_Manager.PastAppointments.RemoveRange(apointmentpassed);
        //           await _dB_Manager.SaveChangesAsync();
        //}

        //public async Task<List<PastAppointment>> GetAllPassedApointmentsByMonthDate(int month = 0)
        //{


        //    int year = month <= DateTime.Now.Month
        //        ? DateTime.Now.Year
        //        : DateTime.Now.Year - 1;

        //    return await _dB_Manager.PastAppointments
        //        .Where(c => c.AppointmentDate.Year == year && c.AppointmentDate.Month ==month)
        //        .ToListAsync();
        //}

        //public async Task<List<PastAppointment>> GetAllPastAppointmentsByDate(DateOnly date)
        //{
        //    return await _dB_Manager.PastAppointments
        //        .Where(pa => pa.AppointmentDate.Year == date.Year && pa.AppointmentDate.Month == date.Month && pa.AppointmentDate.Day == date.Day)
        //        .ToListAsync();
        //}

        //public async Task<List<PastAppointment>> GetAllPastAppointmentsByDateAndSpecialization(DateOnly date, int specialization)
        //{
        //    return await _dB_Manager.PastAppointments
        //        .Where(pa => pa.AppointmentDate.Year == date.Year && pa.AppointmentDate.Month == date.Month && pa.AppointmentDate.Day == date.Day && pa.Therapist.Specialization  == specialization)
        //        .ToListAsync();
        //}

        //public async Task<List<PastAppointment>> GetAllPastAppointmentsByDateAndTherapistId(DateOnly date, int therapistid)
        //{
        //    return await _dB_Manager.PastAppointments
        //       .Where(pa => pa.AppointmentDate.Year == date.Year && pa.AppointmentDate.Month == date.Month && pa.AppointmentDate.Day == date.Day && pa.Therapist.TherapistId == therapistid)
        //       .ToListAsync();
        //}

        //public Task<List<PastAppointment>> GetAllPastAppointmentsByPatientIdByMonthDate(int patientid, DateOnly? date)
        //{
        //    throw new NotImplementedException();
        //}

        //public Task<List<PastAppointment>> GetAllPastAppointmentsBySpecializationAndPatientid(int patientid, string specialization)
        //{
        //    throw new NotImplementedException();
        //}

        //public async Task<List<PastAppointment>> GetAllPastAppointmentsByTherapistIdByMonthDate(int therapistid, DateOnly? month=null)
        //{
        //    if (month == null)
        //        DateOnly actualMonth = month ?? DateOnly.FromDateTime(DateTime.Now);

        //    return await _dB_Manager.PastAppointments
        //    .Where(c => c.AppointmentDate.Year == month.Year && c.AppointmentDate.Month == month.Month  && c.Therapist.TherapistId == therapistid)
        //    .ToListAsync();
        //}
        //</summery>

    }
}


