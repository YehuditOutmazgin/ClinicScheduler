using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;
namespace DAL.Api
{
    public interface IAvailableAppointmentDal
    {
        // add available appointment 
        Task AddAppointment(AvailableAppointment appointment);
        // get all available appointments for a specific therapist and date its return a list of available appointments for this week.
        Task<List<AvailableAppointment>> GetAppointmentsByTherapistAndDate(DateOnly date, int therapistId);
        // get get an available appointment for a specific therapist and datetime ;
        public Task<List<AvailableAppointment>> GetAppointmentsByTherapistAndWeek(DateOnly date, int therapistId);
        Task<List<AvailableAppointment>> GetAppointmentByTherapistAndFullDate(DateOnly date, int therapistId);
        // get all available appointments for a specific date and specialization its return a list of available appointments for this week.
        Task<List<AvailableAppointment>> GetAppointmentsBySpecializationAndDate(DateOnly date, int specialization);
        Task<AvailableAppointment> RemoveAppointment(int appointmentId);
        Task<List<AvailableAppointment>> RemoveAllAppointmentsByDate(DateOnly date);
        Task<List<AvailableAppointment>> RemoveAllAppointmentsByDateAndTherapist(int therapistId, DateOnly date);
    }
}
