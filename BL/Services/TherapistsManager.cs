using BL.Api;
using BL.Models;
using DAL.Api;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{


    internal class TherapistManager : ITherapistManager
    {
        //public ITherapistsDal  _therapists;
        //public TherapistManajer(ITherapistsDal therapists)
        //{
        //    _therapists = therapists;
        //}
        public Task AddTherapist(BLTherapist therapist)
        {
            throw new NotImplementedException();
        }

        public Task AddWorkDay(BLWorkHour workHour)
        {
            throw new NotImplementedException();
        }

        public Task DeleteTherapist(int id)
        {
            throw new NotImplementedException();
        }

        public Task DeleteWorkDay(int therapistId, string DayOfWeek)
        {
            throw new NotImplementedException();
        }

        public Task<List<BLTherapist>> GetAllTherapists()
        {
            throw new NotImplementedException();

        }

        public Task<BLTherapist> GetTherapistById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<BLTherapist> GetTherapistByName(string firstName, string lastName)
        {
            throw new NotImplementedException();
        }

        public Task<List<BLWorkHour>> GetTherapistSchedule(string firstName, string lastName)
        {
            throw new NotImplementedException();
        }

        public Task UpdateTherapist(BLTherapist therapist)
        {
            throw new NotImplementedException();
        }

        public Task UpdateWorkHours(BLWorkHour workHour)
        {
            throw new NotImplementedException();
        }

      
    }
}
