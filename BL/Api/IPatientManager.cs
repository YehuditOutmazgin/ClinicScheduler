using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Models;
using DAL.Models;

namespace BL.Api
{
    internal interface IPatientManager
    {
        Task<List<Patient>> GetAllPatients();
        Task<Patient> GetPatientById(int id);
        Task AddPatient(Patient patient);
        Task UpdatePatient(Patient patient);
        Task DeletePatient(int id);
        Task<List<Appointment>> GetPatientAppointments(int patientId);
        Task<List<Appointment>> GetPatientAppointmentsByDate(int patientId, DateOnly date);
    }
}
