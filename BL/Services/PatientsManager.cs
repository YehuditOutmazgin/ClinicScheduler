using BL.Api;
using BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Api;

namespace BL.Services
{
    internal class PatientsManager : IPatientsManager
    {
      private IPatientsDal _patientsDal;
        public PatientsManager(IPatientsDal patientsDal) { 
        _patientsDal = patientsDal;
        }
        public async Task AddPatient(BLPatient bLPatient)
        {
            
          _patientsDal.AddPatient(  Mapper.MapToPatient(bLPatient));

        }

        public Task DeletePatient(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<BLPatient>> GetAllPatients()
        {
            throw new NotImplementedException();
        }

        public Task<BLPatient> GetPatientById(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdatePatient(BLTherapist therapist)
        {
            throw new NotImplementedException();
        }
    }
}
