using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Api
{
    internal interface IAppointmentDal
    {

        Task AddAppointment(Appointment appointment);
        Task DeleteAppointment(int id);
        Task<List<Appointment>> GetAppointmentsByPatientId(int patientId);

        //Task<Appointment> GetAppointmentById(int id);

        Task UpdateAppointment(Appointment appointment);

        Task<List<Appointment>> GetAppointmentsByPatientIdAndDate(int patientId, DateOnly date);
        Task<Appointment> GetAppointmentsByPatientAndThetapistIdIdAndDate(int patientId, DateOnly date, int therapistId);
        Task<List<Appointment>> GetAppointmentsByTherapistIdAndDate(int therapistId, DateOnly date);
        Task<List<Appointment>> GetAppointmentsByTherapistId(int therapistId);
        Task<bool> IsTimeSlotAvailable(DateOnly date, TimeOnly time, int therapistId);


    }
}
