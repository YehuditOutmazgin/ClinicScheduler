using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Models;
using DAL.Models;
namespace BL.Api
{
    public interface IAppointmentsManager
    {

        Task<BLAppointment> ScheduleAppointment(int patientId, int appointmentId);
        #region get appointments
        #region appointments

        Task<BLAppointment> GetAppointmentById(int appointmentId);
        Task<List<BLAppointment>> GetAllAppointmentsByDateAndTherapistId(int therapistId, DateOnly? date);
        Task<List<BLAppointment>> GetAllAppointmentsByPatientId(int patientId);
        Task<List<BLAppointment>> GetAppointmentsByPatientIdAndThetherapistIdAndDate(int therapistId, DateOnly date, int patientId);
        Task<List<BLAppointment>> GetAllAppointmentsByDate(DateOnly? date);
        Task<List<BLAppointment>> GetAllAppointments();
        Task<List<BLAppointment>> GetAllAppointmentsByPatientIdAndTherapistId(int patientId, int therapistId);
        Task<List<BLAppointment>> GetAppointmentsByTherapistIdAndWeek(int thrapistId, DateOnly? date);
        Task<BLAppointment> SetAppointmentStatus(int appointmentId,bool isConfirm);

        #endregion
        #region available appointments
        Task<List<BLAvailableAppointment>> GetAvailableAppointmentsForSpecificSpecializationForWeek(string specialization, DateOnly date);
        Task<List<BLAvailableAppointment>> GetAvailableAppointmentsForSpecificTherapistForWeek(int therapistId, DateOnly date);
        #endregion
        #region passed appointments
        Task<List<BLPastAppointment>> GetPastAppointmentsByPatientId(int patientId);
        Task<List<BLAppointment>> GetPastAppointmentsByPatientIdAndTherapistId(int patientId, int therapistId);
        Task<List<BLPastAppointment>> GetPastAppointmentsByTherapistIdAndDate(int therapistId, DateOnly date);
        Task<List<BLPastAppointment>> GetPastAppointmentsByTherapistInDateRange(int therapistId, DateOnly start, DateOnly end);
        #endregion
        #region cancel appointments

        Task<List<BLCanceledAppointment>> GetAllCanceleAppointments();
        Task<List<BLCanceledAppointment>> GetCanceleAppointmentsByPatientId(int patientId);
        Task<List<BLAppointment>> GetCanceleAppointmentsByTherapistIdAndDate(int therapistId, DateOnly date);
        Task<List<BLAppointment>> GetCanceleAppointmentsByDate(int therapistId, DateOnly date);
        #endregion
        #endregion

        #region set appointments
        #region appointment
        Task<BLAppointment> SetAppointment(int availAppointmentId);
        #endregion
        #region available appointment
        Task<BLAvailableAppointment> SetAvailableAppointment(BLAvailableAppointment availableAppointment);
        Task<List<BLAvailableAppointment>> SetAvailableAppointmentForPeriod();// monthly or yearly
        #endregion
        #region canceled appointment
        //nothing for now
        #endregion
        #region passed appointment
        Task<List<BLPastAppointment>> SetPastAppointments();//Daily
        #endregion
        #endregion

        #region update appointments
        #region appointment

        #endregion
        #region available appointment

        #endregion
        #region canceled appointment

        #endregion
        #region passed appointment

        #endregion
        #endregion

        #region delete appointments
        #region appointment
        Task<BLAppointment> DeleteAppointmentByPatient(int patientId, int appointmentId);
        #endregion
        #region available appointment
        Task<BLAvailableAppointment> DeleteAvailableAppointment(int appointmentId);
        #endregion
        #region cancele appointment
        Task<BLCanceledAppointment> DeleteCanceleAppointment(int appointmentId);
        #endregion
        #region passed appointment
        /// <summary>
        /// ////////////////////////////////////////////////////////////////////////////////////////////
        /// </summary>
        /// <returns></returns>
        Task<bool> DeleteOldPassedAppointment(DateOnly? endDate = null);
        #endregion
        Task<bool> DeleteAppointmentForTherapistAndDate(int therapistId, DateOnly date);
        Task<bool> DeleteAppointmentForTherapistAndAppointmentId(int therapistId, DateOnly date); // move after to canceled
        Task<bool> DeleteAppointmentsForDate(DateOnly date, string? reason = null);
        //delete appointmet range
        // Task DeleteRangeAppointments(List<Appointment> appointments);

        #endregion

        #region general
        Task<DateTime> NextBusinessDay();

        #endregion

        // if you think that you need to add something, please discuss it with me
        //good luck!!
    }
}