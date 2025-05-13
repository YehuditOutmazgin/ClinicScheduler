using BL.Api;
using BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Api;
using DAL.Models;
using AutoMapper;

namespace BL.Services
{
    internal class PatientsManager : IPatientsManager
    {
      private IPatientsDal _patientsDal;
        private readonly IMapper _mapper;

        public PatientsManager(IPatientsDal patientsDal, IMapper mapper)
        {
            _patientsDal = patientsDal;
            _mapper = mapper; 
        }

        public async Task AddPatient(BLPatient bLPatient)
        {
            if(bLPatient == null)
                throw new NullReferenceException(nameof(bLPatient));

            var p = _mapper.Map<Patient>(bLPatient);

            if(p == null)
                throw new NullReferenceException(nameof(p));
             await   _patientsDal.AddPatient(p);

        }

        public async Task DeletePatient(int id)
        {
            if (id<0)
                throw new NullReferenceException(nameof(id));

            await _patientsDal.DeletePatient(id);
        }

        public async Task<List<BLPatient>> GetAllPatients()
        {
            var deleteList =await _patientsDal.GetAllPatients();
          if(deleteList == null )
                throw new NullReferenceException(nameof(deleteList));

            return  _mapper.Map<List<BLPatient>>(deleteList);

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
