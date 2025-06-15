using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Api
{
    public interface ICanceledAppointmentsDal
    {
        /// <summary>
        /// Adds a new canceled appointment to the system.
        /// </summary>
        Task AddCanceledAppointment(CanceledAppointment appointment);
        /// <summary>
        /// Adds a new canceled appointments to the system.
        /// </summary>
        Task AddCanceledAppointments(List<CanceledAppointment> appointments);

        /// <summary>
        /// Retrieves all canceled appointments.
        /// </summary>
        Task<List<CanceledAppointment>> GetAllCanceledAppointments();

        /// <summary>
        /// Retrieves canceled appointments by patient ID.
        /// </summary>
        Task<List<CanceledAppointment>> GetCanceledAppointmentsByPatientId(int patientId);

        /// <summary>
        /// Retrieves canceled appointments by date.
        /// </summary>
        Task<List<CanceledAppointment>> GetCanceledAppointmentsByDate(DateOnly date);

        /// <summary>
        /// Removes a canceled appointment by its ID.
        /// </summary>
        Task<CanceledAppointment> RemoveCanceledAppointment(int appointmentId);

        /// <summary>
        /// Removes all canceled appointments older than a specific date.
        /// </summary>
        Task<List<CanceledAppointment>> RemoveCanceledAppointmentsOlderThan(DateOnly date);
    }
}
