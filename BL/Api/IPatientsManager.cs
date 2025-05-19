using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Models;
using DAL.Models;

namespace BL.Api
{
    public interface IPatientsManager
    {
        Task<List<BLPatient>> GetAllPatients();
        Task<BLPatient> GetPatientById(int id);
        Task AddPatient(BLPatient patient);
        Task UpdatePatient(BLPatient patient);
        Task<BLPatient> DeletePatient(int id);
        Task<List<Appointment>> GetPatientAppointments(int patientId);
        Task<List<Appointment>> GetPatientAppointmentsByDate(int patientId, DateOnly date);
    }
}
