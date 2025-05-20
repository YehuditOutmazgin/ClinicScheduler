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
        Task<Appointment> DeleteAppointment(int id);
        Task<List<Appointment>> GetAppointmentsByPatientId(int patientId);
        Task<List<Appointment>> GetAppointmentsByPatientIdAndDate(int patientId, DateOnly date);
        Task<List<Appointment>> GetAppointmentsByDate(DateOnly? date);
        Task<List<Appointment>> GetAllAppointments();
        Task<List<Appointment>> GetAllAppointmentsCanceled();
        Task<List<Appointment>> GetAllAppointmentsSet();
        Task<Appointment> GetAppointmentsByPatientIdAndThetherapistIdAndDate(int patientId, DateOnly date, int therapistId);

        //on defalut return today  if there is a date return the apointments day of this date 
        Task<List<Appointment>> GetAppointmentsByTherapistIdAndDate(int therapistId, DateOnly? date);
        //delete apointments of therapist that cant work on a specific day
        Task<List<Appointment>> DeleteAppointmentsByTherapistIdAndDay(int therapistId, DateOnly date);
        Task<List<Appointment>> DeleteAppointmentsByDate(DateOnly date);
        //delete apointments of therapist that have change working hours 
        Task<List<Appointment>> DeleteAppointmentsByTherapistIdAndDayGoingEarlier(int therapistId, DateOnly date, TimeOnly starthour, TimeOnly endhour);







    }
}