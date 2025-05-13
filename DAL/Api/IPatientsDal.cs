using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Api
{
    public interface IPatientsDal
    {

        Task<List<Patient>> GetAllPatients();
        Task<Patient> GetPatientById(int id);
        Task AddPatient(Patient patient);
        Task UpdatePatient(Patient patient);
        Task DeletePatient(int id);
        Task<List<Appointment>> GetPatientAppointments(int patientId);


    }
}
