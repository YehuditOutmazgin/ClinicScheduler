using System;
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
        #region get appointments
        #region appointments
        Task<List<BLAppointment>> GetAllAppointmentsByDateAndTherapistId(int therapistId, DateOnly? date);
        Task<List<BLAppointment>> GetAllAppointmentsByPatientId(int therapistId, DateOnly date, int patientId);
        Task<List<BLAppointment>> GetAllAppointmentsByDate(DateOnly? date);
        Task<List<BLAppointment>> GetAllAppointments();
        Task<List<BLAppointment>> GetAllAppointmentsByPatientIdAndTherapistId(int patientId, int therapistId);
        #endregion
        #region available appointments
        Task<List<BLAvailableAppointment>> GetAvailableAppointmentsForSpecificSpecializationForWeek(string specialization, DateOnly date);
        Task<List<BLAvailableAppointment>> GetAvailableAppointmentsForSpecificTherapistForWeek(int therapistId, DateOnly date);
        #endregion
        #region passed appointments
        Task<List<BLAppointment>> GetPassedAppointmentsByPatientId(int patientId);
        Task<List<BLAppointment>> GetPassedAppointmentsByPatientIdAndTherapistId(int patientId, int therapistId);
        Task<List<BLAppointment>> GetPassedAppointmentsByTherapistAndDate(int therapistId, DateOnly date);
        #endregion
        #region cancel appointments
        Task<List<BLAppointment>> GetCanceleAppointmentsByPatientId(int patientId);
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
        Task<BLAvailableAppointment> SetAvailableAppointmentForPeriod(BLAvailableAppointment availableAppointment);// monthly or yearly
        #endregion
        #region canceled appointment
        //nothing for now
        #endregion
        #region passed appointment
        Task<List<BLPassedAppointment>> SetPassedAppointments();//Daily
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
        Task<BLAppointment> DeleteAppointmentByPatientId(int patientId, int appointmentId);
        #endregion
        #region available appointment
        Task<BLAvailableAppointment> DeleteAvailableAppointment(int appointmentId);
        #endregion
        #region cancele appointment
        Task<BLCanceledAppointment> DeleteCanceleAppointment(int appointmentId);
        #endregion
        #region passed appointment
        bool DeleteOldPassedAppointment();
        #endregion
        Task<bool> DeleteAppointmentForTherapistAndDate(int therapistId, DateOnly date);
        Task<bool> DeleteAppointmentForTherapistAndAppointmentId(int therapistId, DateOnly date); // move after to canceled
        Task<bool> DeleteAppointmentForDate(DateOnly date, string? reason = null);
        //delete appointmet range
       // Task DeleteRangeAppointments(List<Appointment> appointments);

        #endregion

        // if you think that you need to add something, please discuss it with me
        //good luck!!
    }
}