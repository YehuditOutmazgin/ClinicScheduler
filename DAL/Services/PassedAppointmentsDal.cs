using DAL.Api;
using DAL.Common;
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
    public class PassedAppointmentsDal : IPassedAppointmentsDal

    {
        private readonly DB_Manager _dB_Manager;

        public PassedAppointmentsDal(DB_Manager dbContext)
        {
            _dB_Manager = dbContext;
        }
        // ======= ADMIN ACTIONS =======

        public async void AddAllPassedAppointments(List<PassedAppointment> appointments)
        {
            //    //Be Attantion!!! to get a list that was checked that there isn't a null appointment    
            await _dB_Manager.PassedAppointments.AddRangeAsync(appointments);
            await _dB_Manager.SaveChangesAsync();

        }

        public async void DeleteAllPassedAppointments(List<PassedAppointment> appointments)
        {
            _dB_Manager.PassedAppointments.RemoveRange(appointments);
            await _dB_Manager.SaveChangesAsync();

        }

        public async void DeleteAllPassedAppointmentsOlderThan(DateOnly date)
        {
            _dB_Manager.PassedAppointments.RemoveRange(
                await _dB_Manager.PassedAppointments.Where(c => c.AppointmentDate <= date
                ).ToListAsync()
            );
            await _dB_Manager.SaveChangesAsync();
        }



  
        // ======= PATIENT =======


        public async Task<List<PassedAppointment>> GetAllPassedAppointmentsByPatientId(int patientId)
        {
            return await _dB_Manager.PassedAppointments.Where(c => c.PatientId == patientId).ToListAsync();
        }

        public async Task<List<PassedAppointment>> GetAllPassedAppointmentsByPatientIdAndSpecialization(int patientId, Specialization specialization)
        {
            return await _dB_Manager.PassedAppointments.Where(c => c.PatientId == patientId&&c.Therapist.Specialization==specialization).ToListAsync();

        }

        public async Task<List<PassedAppointment>> GetAllPassedAppointmentsByPatientIdAndTherapistId(int patientId, int therapistId)
        {
            return await _dB_Manager.PassedAppointments.Where(c => c.PatientId == patientId && c.TherapistId == therapistId).ToListAsync();
        }


        // ======= THERAPIST =======

        public async Task<List<PassedAppointment>> GetAllPassedAppointmentsByTherapistIdAndDate(int therapistId, DateOnly date)
        {
            return await _dB_Manager.PassedAppointments.Where(c => c.TherapistId == therapistId && c.AppointmentDate==date).ToListAsync();
        }

        public async Task<List<PassedAppointment>> GetAllPassedAppointmentsByTherapistIdAndMonthDate(int therapistId, DateOnly month)
        {
            return await _dB_Manager.PassedAppointments.Where(c => c.TherapistId == therapistId && c.AppointmentDate.Year == month.Year && c.AppointmentDate.Month==month.Month).ToListAsync();

        }

       public async Task<List<PassedAppointment>> GetAllPassedAppointmentsByTherapistIdAndRangeDate(int therapistId, DateOnly startDate, DateOnly endDate)
        {
            return await _dB_Manager.PassedAppointments.Where(c => c.TherapistId == therapistId && c.AppointmentDate >= startDate && c.AppointmentDate <= endDate).ToListAsync();

        }

        public async Task<List<PassedAppointment>> GetAllPassedAppointmentsBySpecialization(Specialization specialization)
        {
            return await _dB_Manager.PassedAppointments.Where(c => c.Therapist.Specialization == specialization).ToListAsync();

        }
        // ======= GENERAL FILTERS =======

        public async Task<List<PassedAppointment>> GetAllPassedAppointmentsByMonthDate(DateOnly month)
        {
            return await _dB_Manager.PassedAppointments.Where(c=>c.AppointmentDate.Year==month.Year&&c.AppointmentDate.Month==c.AppointmentDate.Month).ToListAsync();

        }





        //<summery>
        //function that we made before 

        //public async void DeleteAllPassedAppointmentsOnceAYear(List<PassedAppointment> apointmentpassed)
        //{

        //           _dB_Manager.PassedAppointments.RemoveRange(apointmentpassed);
        //           await _dB_Manager.SaveChangesAsync();
        //}

        //public async Task<List<PassedAppointment>> GetAllPassedApointmentsByMonthDate(int month = 0)
        //{


        //    int year = month <= DateTime.Now.Month
        //        ? DateTime.Now.Year
        //        : DateTime.Now.Year - 1;

        //    return await _dB_Manager.PassedAppointments
        //        .Where(c => c.AppointmentDate.Year == year && c.AppointmentDate.Month ==month)
        //        .ToListAsync();
        //}

        //public async Task<List<PassedAppointment>> GetAllPassedAppointmentsByDate(DateOnly date)
        //{
        //    return await _dB_Manager.PassedAppointments
        //        .Where(pa => pa.AppointmentDate.Year == date.Year && pa.AppointmentDate.Month == date.Month && pa.AppointmentDate.Day == date.Day)
        //        .ToListAsync();
        //}

        //public async Task<List<PassedAppointment>> GetAllPassedAppointmentsByDateAndSpecialization(DateOnly date, int specialization)
        //{
        //    return await _dB_Manager.PassedAppointments
        //        .Where(pa => pa.AppointmentDate.Year == date.Year && pa.AppointmentDate.Month == date.Month && pa.AppointmentDate.Day == date.Day && pa.Therapist.Specialization  == specialization)
        //        .ToListAsync();
        //}

        //public async Task<List<PassedAppointment>> GetAllPassedAppointmentsByDateAndTherapistId(DateOnly date, int therapistid)
        //{
        //    return await _dB_Manager.PassedAppointments
        //       .Where(pa => pa.AppointmentDate.Year == date.Year && pa.AppointmentDate.Month == date.Month && pa.AppointmentDate.Day == date.Day && pa.Therapist.TherapistId == therapistid)
        //       .ToListAsync();
        //}

        //public Task<List<PassedAppointment>> GetAllPassedAppointmentsByPatientIdByMonthDate(int patientid, DateOnly? date)
        //{
        //    throw new NotImplementedException();
        //}

        //public Task<List<PassedAppointment>> GetAllPassedAppointmentsBySpecializationAndPatientid(int patientid, string specialization)
        //{
        //    throw new NotImplementedException();
        //}

        //public async Task<List<PassedAppointment>> GetAllPassedAppointmentsByTherapistIdByMonthDate(int therapistid, DateOnly? month=null)
        //{
        //    if (month == null)
        //        DateOnly actualMonth = month ?? DateOnly.FromDateTime(DateTime.Now);

        //    return await _dB_Manager.PassedAppointments
        //    .Where(c => c.AppointmentDate.Year == month.Year && c.AppointmentDate.Month == month.Month  && c.Therapist.TherapistId == therapistid)
        //    .ToListAsync();
        //}
        //</summery>

    }
}


