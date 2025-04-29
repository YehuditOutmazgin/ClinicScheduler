using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Api
{
    public interface IPassedAppointmentsDal
    {
        // ======= THERAPIST =======

        /// <summary>
        /// Returns all passed appointments for a specific therapist on a given date.
        /// </summary>
        Task<List<PassedAppointment>> GetAllPassedAppointmentsByTherapistIdAndDate(int therapistId, DateOnly date);

        /// <summary>
        /// Returns all passed appointments for a specific therapist in a given month.
        /// </summary>
        Task<List<PassedAppointment>> GetAllPassedAppointmentsByTherapistIdAndMonthDate(int therapistId, DateOnly month);

        /// <summary>
        /// Returns all passed appointments for a specific therapist within a date range.
        /// </summary>
        Task<List<PassedAppointment>> GetAllPassedAppointmentsByTherapistIdAndRangeDate(int therapistId, DateOnly startDate, DateOnly endDate);

        // ======= PATIENT =======

        /// <summary>
        /// Returns all passed appointments for a specific patient.
        /// </summary>
        Task<List<PassedAppointment>> GetAllPassedAppointmentsByPatientId(int patientId);

        /// <summary>
        /// Returns all passed appointments for a specific patient in a specific specialization.
        /// </summary>
        Task<List<PassedAppointment>> GetAllPassedAppointmentsByPatientIdAndSpecialization(int patientId, int specialization);

        /// <summary>
        /// Returns all passed appointments between a specific patient and therapist.
        /// </summary>
        Task<List<PassedAppointment>> GetAllPassedAppointmentsByPatientIdAndTherapistId(int patientId, int therapistId);

        // ======= GENERAL FILTERS =======

        /// <summary>
        /// Returns all passed appointments for a specific month.
        /// </summary>
        Task<List<PassedAppointment>> GetAllPassedAppointmentsByMonthDate(DateOnly month);

        /// <summary>
        /// Returns all passed appointments for a given specialization.
        /// </summary>
        Task<List<PassedAppointment>> GetAllPassedAppointmentsBySpecialization(int specialization);

        // ======= ADMIN ACTIONS =======

        /// <summary>
        /// Adds a list of passed appointments to the database.
        /// </summary>
        void AddAllPassedAppointments(List<PassedAppointment> appointments);

        /// <summary>
        /// Deletes all passed appointments that occurred before a given date .
        /// </summary>
        void DeleteAllPassedAppointmentsOlderThan(DateOnly date);

        /// <summary>
        /// Deletes all passed appointments that were send.
        /// </summary>
        void DeleteAllPassedAppointments(List<PassedAppointment> appointments);

    }
}
