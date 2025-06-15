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
    public class PatientsManager : IPatientsManager
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

            if (p == null)
                throw new NullReferenceException(nameof(p));
            else p.PatientId = 0;
             await   _patientsDal.AddPatient(p);

        }

        public async Task<BLPatient> DeletePatient(int id)
        {
            if (id<0)
                throw new NullReferenceException(nameof(id));
     
            var delpatient =   await _patientsDal.DeletePatient(id);

            if (delpatient != null)
               
                return await Task.FromResult(_mapper.Map<BLPatient>(delpatient));
            else
                 return null;
        }

        public async Task<List<BLPatient>> GetAllPatients()
        {
            var list =await _patientsDal.GetAllPatients();
          if(list == null )
                throw new NullReferenceException(nameof(list));

            return  _mapper.Map<List<BLPatient>>(list);

        }

        public async Task<BLPatient> GetPatientById(int id)
        {
            if (id < 0)
                throw new NullReferenceException(nameof(id));


           var p= await _patientsDal.GetPatientById(id);
            if(p == null)
                throw new NullReferenceException($"{nameof(p)} does not exist");
            var mp = _mapper.Map<BLPatient>(p);

            if (mp == null)
                throw new NullReferenceException(nameof(mp));
            return mp;
        }

        public  async Task UpdatePatient(BLPatient patient)
        {
            if (patient == null)
                throw new NullReferenceException(nameof(patient));
            var _patient = _mapper.Map<Patient>(patient);

            if (_patient == null)
                throw new NullReferenceException(nameof(_patient));
           await _patientsDal.UpdatePatient(_patient);

        }

        public async Task<List<BLAppointment>> GetPatientAppointments(int patientId)
        {
            if (patientId < 0)
                throw new NullReferenceException(nameof(patientId));

           var apps = await _patientsDal.GetPatientAppointments(patientId);
            if (apps == null)
                throw new NullReferenceException(nameof(apps));
          var mapapp=_mapper.Map<List<BLAppointment>>(apps);
            if(mapapp == null)
                throw new NullReferenceException(nameof(mapapp));
            return mapapp;
        }

        public Task<List<BLAppointment>> GetPatientAppointmentsByDate(int patientId, DateOnly date)
        {
            throw new NotImplementedException();
        }
    }
}
