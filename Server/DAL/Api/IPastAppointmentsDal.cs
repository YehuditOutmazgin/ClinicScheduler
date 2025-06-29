using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Api
{
    public interface IPastAppointmentsDal
    {
        // ======= THERAPIST =======

        /// <summary>
        /// Returns all passed appointments for a specific therapist on a given date.
        /// </summary>
        Task<List<PastAppointment>> GetAllPastAppointmentsByTherapistIdAndDate(int therapistId, DateOnly date);

        /// <summary>
        /// Returns all passed appointments for a specific therapist in a given month.
        /// </summary>
        Task<List<PastAppointment>> GetAllPastAppointmentsByTherapistIdAndMonthDate(int therapistId, DateOnly month);

        /// <summary>
        /// Returns all passed appointments for a specific therapist within a date range.
        /// </summary>
        Task<List<PastAppointment>> GetAllPastAppointmentsByTherapistIdAndRangeDate(int therapistId, DateOnly startDate, DateOnly endDate);

        // ======= PATIENT =======

        /// <summary>
        /// Returns all passed appointments for a specific patient.
        /// </summary>
        Task<List<PastAppointment>> GetAllPastAppointmentsByPatientId(int patientId);

        /// <summary>
        /// Returns all passed appointments for a specific patient in a specific specialization.
        /// </summary>
        Task<List<PastAppointment>> GetAllPastAppointmentsByPatientIdAndSpecialization(int patientId, Specialization specialization);

        /// <summary>
        /// Returns all passed appointments between a specific patient and therapist.
        /// </summary>
        Task<List<PastAppointment>> GetAllPastAppointmentsByPatientIdAndTherapistId(int patientId, int therapistId);

        // ======= GENERAL FILTERS =======

        /// <summary>
        /// Returns all passed appointments for a specific month.
        /// </summary>
        Task<List<PastAppointment>> GetAllPastAppointmentsByMonthDate(DateOnly month);

        /// <summary>
        /// Returns all passed appointments for a given specialization.
        /// </summary>
        Task<List<PastAppointment>> GetAllPastAppointmentsBySpecialization(Specialization specialization);

        // ======= ADMIN ACTIONS =======

        /// <summary>
        /// Adds a list of passed appointments to the database.
        /// </summary>
        void AddAllPastAppointments(List<PastAppointment> appointments);

        /// <summary>
        /// Deletes all passed appointments that occurred before a given date .
        /// </summary>
        Task<bool> DeleteAllPastAppointmentsOlderThan(DateOnly date);

        /// <summary>
        /// Deletes all passed appointments that were send.
        /// </summary>
        void DeleteAllPastAppointments(List<PastAppointment> appointments);

    }
}
