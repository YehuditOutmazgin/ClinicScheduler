using BL.Models;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IPatientsManager
    {



        public Task AddPatient(BLPatient bLPatient);
        public Task DeletePatient(int id);
        public Task<List<BLPatient>> GetAllPatients();

        public Task<BLPatient> GetPatientById(int id);

        public Task<BLPatient> GetPatientByName(string firstName, string lastName);

        public Task UpdatePatient(BLTherapist therapist);

    }
}

