using DAL.Models;
using DAL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Api
{
    public interface IAppointmentsDal
    {

        Task AddAppointment(Appointment appointment);
        Task<List<Appointment>> GetAppointmentsByPatientId(int patientId);
        Task<Appointment> GetAppointmentById(int appointmentId);
        Task<List<Appointment>> GetAppointmentsByPatientIdAndDate(int patientId, DateOnly date);
        Task<List<Appointment>> GetAppointmentsByDate(DateOnly date=default);
        Task<List<Appointment>> GetAllAppointments();
        Task<List<Appointment>> GetAllAppointmentsCanceled();
        Task<List<Appointment>> GetAllAppointmentsSet();
        Task<List<Appointment>> GetAllAppointmentsByPatientIdAndTherapistId(int patientId,int therapistId);
        Task<List<Appointment>> GetAppointmentsByPatientIdAndTherapistIdAndDate(int patientId, DateOnly date, int therapistId);
        //on defalut return today  if there is a date return the apointments day of this date 
        Task<List<Appointment>> GetAppointmentsTherapistAndDate(int therapistId, DateOnly date);
        //delete appointmet range
        Task DeleteRangeAppointments(List<Appointment> appointments);
        //delete one
        Task<Appointment> DeleteAppointment(int id);
        //delete apointments of therapist that cant work on a specific day
        Task<List<Appointment>> DeleteAppointmentsByTherapistIdAndDay(int therapistId, DateOnly date);
        Task<List<Appointment>> DeleteAppointmentsByDate(DateOnly date);
        //delete apointments of therapist that have change working hours 
        Task<List<Appointment>> DeleteAppointmentsByTherapistIdAndDayGoingEarlier(int therapistId, DateOnly date, TimeOnly starthour, TimeOnly endhour);

        /// <summary>
        /// Rebecca add this function if you have any questions about the implementation or the function, contact me by phone:0548535515
        /// </summary>
        /// <returns></returns>
        Task<Appointment>  SetAppointmentStatus(int appointmentId, bool isConfirm);
        //get appointment by appointment id:
        //---------------------------------------------------------------------------




    }
}