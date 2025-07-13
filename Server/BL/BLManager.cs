using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Api;
using BL.Models;
using BL.Services;
namespace BL
{
    public class BLManager
    {
        public readonly IAppointmentsManager _appointmentsManager;
        public readonly IPatientsManager _patientsManager;
        public readonly ITherapistManager _therapistManager;

        public BLManager(IAppointmentsManager appointmentsManager, IPatientsManager patientsManager, ITherapistManager therapistManager)
        {
            _appointmentsManager = appointmentsManager;
            _therapistManager = therapistManager;
            _patientsManager = patientsManager;
        }

        ///// <summary>
        ///// Rebecca add this function if you have any questions about the implementation or the function, contact me by phone:0548535515
        ///// </summary>
        ///// <returns></returns>

        //public async Task<DateTime> NextBusinessDay()
        //{
        //    int adding = 1;
        //    while (await _availableQueueManager.IsHolidayAsync(DateTime.Now.AddDays(adding)))
        //    {
        //        adding++;
        //    }
        //    return DateTime.Now.AddDays(adding);
        //}

        ////-------------------------------------------------------------------------

        ////patient


        //// Patient-related methods
        //public async Task<List<BLPatient>> GetAllPatients()
        //{
        //    return await _patientsManager.GetAllPatients();
        //}

        //public async Task<BLPatient> GetPatientById(int patientId)
        //{
        //    return await _patientsManager.GetPatientById(patientId);
        //}

        //public async Task AddPatient(BLPatient patient)
        //{
        //    await _patientsManager.AddPatient(patient);
        //}

        //public async Task<BLPatient> DeletePatient(int patientId)
        //{
        //    return await _patientsManager.DeletePatient(patientId);
        //}

        //public async Task UpdatePatient(BLPatient patient)
        //{
        //    await _patientsManager.UpdatePatient(patient);
        //}

        //public async Task<List<BLAppointment>> GatPatientAppointments(int patientId)
        //{
        //    return await _patientsManager.GetPatientAppointments(patientId);
        //}


        //// Appointment-related methods
        ///// <summary>
        /////  public async Task<List<BLAppointment>> GetAllAppointmentsAsync()
        /////    {
        /////        return await _appointmentsManager.GetAllAppointments();
        /////}

        /////public async Task<BLAppointment> GetAppointmentByIdAsync(int appointmentId)
        /////{
        /////    return await _appointmentsManager.GetAppointmentById(appointmentId);
        /////}

        /////public async Task AddAppointmentAsync(BLAppointment appointment)
        /////{
        /////   await _appointmentsManager.AddAppointment(appointment);
        /////}

        /////public async Task CancelAppointmentAsync(int appointmentId)
        /////{
        /////    await _appointmentsManager.CancelAppointment(appointmentId);
        /////}
        /////</summary>
        ///// <returns></returns>

        ////#region Therapist
        ////// Therapist-related methods
        ////public async Task<List<BLTherapist>> GetAllTherapists()
        ////{
        ////    return await _therapistManager.GetAllTherapists();
        ////}

        ////public async Task<BLTherapist> GetTherapistById(int therapistId)
        ////{
        ////    return await _therapistManager.GetTherapistById(therapistId);
        ////}

        ////public async Task AddTherapist(BLTherapist therapist)
        ////{
        ////    await _therapistManager.AddTherapist(therapist);
        ////}

        ////public async Task<BLTherapist> UpdateTherapist(BLTherapist therapist)
        ////{
        ////    return await _therapistManager.UpdateTherapist(therapist);
        ////}

        ////public async Task<BLTherapist> DeleteTherapist(int therapistId)
        ////{
        ////    return await _therapistManager.DeleteTherapist(therapistId);
        ////}
        ////public async Task<List<BLAppointment>> GetAllAppointmentsByDateAndTherapistId(int therapistId, DateOnly? date)
        ////{
        ////    return await _appointmentsManager.GetAllAppointmentsByDateAndTherapistId(therapistId, date);
        ////}

        ////public async Task<List<BLWorkHour>> UpdateWorkHours(BLWorkHour workHour)
        ////{
        ////    return await _therapistManager.UpdateWorkHours(workHour);
        ////}
        ////public async Task<List<BLWorkHour>> DeleteWorkDay(int therapistId, string dayOfWeek)
        ////{
        ////    return await _therapistManager.DeleteWorkDay(therapistId, dayOfWeek);
        ////}
        ////public async Task<BLWorkHour> AddWorkDay(BLWorkHour workHour)
        ////{
        ////    return await _therapistManager.AddWorkDay(workHour);
        ////}
        //////#endregion
        
    }
}


