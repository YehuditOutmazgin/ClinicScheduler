using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Models;
namespace BL.Api
{
    public interface IAppointmentsManagerBL
    {
        /// <summary>
        /// all appointments
        /// </summary>

        Task<List<BLAppointment>> GetAllAppointmentsByDate();
        Task<List<BLAppointment>> GetAllAppointmentsByDateAndTherapist();
        Task<BLAppointment> GetAllAppointmentsByPatientId(int id);
        Task<BLAppointment> GetAllAppointmentsByPatientIdAndTherapistId(int patientId, int therapistId);

        /// <summary>
        /// available appointments
        /// </summary>

        Task<BLAppointment> GetAvailableAppointmentForSpecificSpecializationForWeek(string specialization, DateOnly date);
        Task<BLAppointment> GetAvailableAppointmentForSpecificTherapistForWeek(int therapistId, DateOnly date);

        /// <summary>
        /// passed appointments
        /// </summary>
        
        Task<BLAppointment> GetPassedAppointmentsForSpecificTherapistForWeek(int therapistId, DateOnly date);
        Task<BLAppointment> GetPassedAppointmentsForSpecificSpecializationForWeek(string specialization, DateOnly date);
        Task<BLAppointment> GetAllPassedAppointments();


        /// <summary>
        /// cancle appointments
        /// </summary>
        
























        // get appointments its set

        //        Task<BLAppointment> GetAppointmentById(int id);
        //קביעת תורים
        // קבלת תורים

        //קביעה לפי ה IDשל הפגישה
        Task<BLAppointment> SetAppointment(int appointmentId,int parientId);
        // cancle appointments
        //Task<BLAppointment> CancleAppointment(int appointmentId,int patientId);//not need to inform the patient
        //Task<BLAppointment> CancleAppointment(int appointmentId);// need to inform the patient
        Task<BLAppointment> CancleAppointment(int patientId,int therapistId,DateOnly date);
        Task<BLAppointment> CancleAppointmentsFotTherapistAndDate(DateOnly date,int TherapistId);// need to inform the patients

        Task<BLAppointment> CreateAppointment(BLAppointment appointment);
        Task<BLAppointment> UpdateAppointment(BLAppointment appointment);
        //Task<BLAppointment> CancleAppointmentForDate(BLAppointment appointment);
        //Task<BLAppointment> CancleAppointmentForDateAndTherapist(BLAppointment appointment);
        //Task DeleteAppointment(int id);
    }
}
