using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Api
{
    internal interface IAvailableAppointmentDal
    {
        // add available appointment 
        Task AddAppointment(AvailableAppointment appointment);
        // get all available appointments for a specific therapist and date its return a list of available appointments for this week.
        Task<List<AvailableAppointment>> GetAppointmentsByTherapistAndDate(DateOnly date, int therapistId);
        // get all available appointments for a specific date and specialization its return a list of available appointments for this week.
        Task<List<AvailableAppointment>> GetAppointmentsBySpecializationAndDate(DateOnly date, int specialization);
        Task RemoveAppointment(int appointmentId);
        Task RemoveAllAppointmentsByDate(DateOnly date);
        Task RemoveAllAppointmentsByDateAndTherapist(int therapistId, DateOnly date);
        Task<AvailableAppointment> GetAppointmentByTherapistAndDate(int therapistId, DateTime date);
    }
}
