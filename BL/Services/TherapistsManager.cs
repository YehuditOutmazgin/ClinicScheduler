using AutoMapper;
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


    public class TherapistsManager : ITherapistManager
    {
        private ITherapistsDal _therapistsDal;  
        private readonly IMapper _mapper;
        private readonly IWorkHoursDal _workHoursDal;
        /// <summary>
        /// Therapist
        /// </summary>

        public  TherapistsManager(ITherapistsDal therapists,IMapper mapper, IWorkHoursDal workHoursDal)
        {
            _therapistsDal = therapists;
            _mapper = mapper;
            _workHoursDal = workHoursDal;

        }
        public async Task<List<BLTherapist>> GetAllTherapists()
        {

            var therapists = await _therapistsDal.GetAllTherapists();

            if (therapists == null || !therapists.Any())
            {
                return new List<BLTherapist>();
            }


            return _mapper.Map<List<BLTherapist>>(therapists);
        }
        public async Task<BLTherapist> GetTherapistById(int id)
        {
            if (id < 0)
                throw new NullReferenceException(nameof(id));

            var therapist = await _therapistsDal.GetTherapistById(id);

            if (therapist == null)
                throw new NullReferenceException(nameof(therapist));

            return _mapper.Map<BLTherapist>(therapist);
        }
        public async Task<BLTherapist> GetTherapistByName(string firstName, string lastName)
        {

            if (string.IsNullOrWhiteSpace(firstName))
                throw new ArgumentException("First name cannot be null or empty.", nameof(firstName));

            if (string.IsNullOrWhiteSpace(lastName))
                throw new ArgumentException("Last name cannot be null or empty.", nameof(lastName));

            var therapist = await _therapistsDal.GetTherapistByName(firstName, lastName);

            if (therapist == null)
                throw new NullReferenceException(nameof(therapist));

            return _mapper.Map<BLTherapist>(therapist);

        }

        public async Task<BLTherapist> AddTherapist(BLTherapist therapist)
        {
            if (therapist == null)
                throw new NullReferenceException(nameof(therapist));

            var t = _mapper.Map<Therapist>(therapist);

            if (t == null)
                throw new NullReferenceException(nameof(t));

            var addedTherapist = await _therapistsDal.AddTherapist(t);

            if (addedTherapist == null)
                throw new InvalidOperationException("Failed to add the therapist to the database.");

            return _mapper.Map<BLTherapist>(addedTherapist);
        }
        public async Task<BLTherapist> DeleteTherapist(int id)
        {
            if (id < 0)
                throw new ArgumentException("ID cannot be negative.", nameof(id));


            var deletedTherapist = await _therapistsDal.DeleteTherapist(id);

            if (deletedTherapist == null)
                throw new InvalidOperationException("Failed to delete the therapist. Therapist not found.");


            return _mapper.Map<BLTherapist>(deletedTherapist);
        }
        public async Task<BLTherapist> UpdateTherapist(BLTherapist therapist)
        {
            if (therapist == null)
                throw new ArgumentNullException(nameof(therapist), "Therapist cannot be null.");


            var dalTherapist = _mapper.Map<Therapist>(therapist);

            if (dalTherapist == null)
                throw new InvalidOperationException("Mapping from BLTherapist to Therapist failed.");


            var updatedTherapist = await _therapistsDal.UpdateTherapist(dalTherapist);

            if (updatedTherapist == null)
                throw new InvalidOperationException("Failed to update the therapist in the database.");


            return _mapper.Map<BLTherapist>(updatedTherapist);
        }

        /// <summary>
        /// workHour -therapist
        /// </summary>
    

        public async Task<BLWorkHour> AddWorkDay(BLWorkHour workHour)
        {
            if (workHour == null)
                throw new ArgumentNullException(nameof(workHour), "WorkHour cannot be null.");

            var dalAddWorkDay = _mapper.Map<WorkHour>(workHour);
            if (dalAddWorkDay == null)
                throw new InvalidOperationException("Mapping from BLWorkHour to WorkHour failed.");
            var x = Enum.TryParse(dalAddWorkDay.DayOfWeek, true, out DayOfWeek dayOfWeek);
            if (!x)
            {
                throw new ArgumentException("Invalid DayOfWeek value.", nameof(dalAddWorkDay.DayOfWeek));
            }

            if (dayOfWeek == DayOfWeek.Friday || dayOfWeek == DayOfWeek.Saturday)
                throw new ArgumentException("DayOfWeek must be between 1 and 5.", nameof(dalAddWorkDay.DayOfWeek));


            await _workHoursDal.AddWorkDay(dalAddWorkDay);
           
            return _mapper.Map<BLWorkHour>(dalAddWorkDay);
        }

        public async Task<List<BLWorkHour>> DeleteWorkDay(int therapistId, string DayOfWeek)
        {
            if (therapistId < 0)
                throw new ArgumentException("Therapist ID cannot be negative.", nameof(therapistId));

            if (string.IsNullOrWhiteSpace(DayOfWeek))
                throw new ArgumentException("DayOfWeek cannot be null or empty.", nameof(DayOfWeek));

           
          await _workHoursDal.DeleteWorkDay(therapistId, DayOfWeek);

          List<  WorkHour> workHour = await _workHoursDal.GetTherapistSchedule(therapistId);
            if (workHour == null)
            {
               throw new NullReferenceException();
            }
            return _mapper.Map<List<BLWorkHour>>(workHour);
        }

        public async Task<List<BLWorkHour>> GetTherapistSchedule(string firstName, string lastName)
        {
            if (string.IsNullOrWhiteSpace(firstName))
                throw new ArgumentException("First name cannot be null or empty.", nameof(firstName));

            if (string.IsNullOrWhiteSpace(lastName))
                throw new ArgumentException("Last name cannot be null or empty.", nameof(lastName));
            var therapist = await _therapistsDal.GetTherapistByName(firstName, lastName);
            if(therapist == null)
                throw new NullReferenceException(nameof(therapist));

            var workHours = await _workHoursDal.GetTherapistSchedule(therapist.TherapistId);

            if (workHours == null )
            {
                throw new NullReferenceException(nameof(workHours));

            }
            return _mapper.Map<List<BLWorkHour>>(workHours);
    
        }

        public async Task<List<BLWorkHour>> UpdateWorkHours(BLWorkHour workHour)
        {
            
            if (workHour == null)
                throw new ArgumentNullException(nameof(workHour), "WorkHour cannot be null.");
           
            var dalWorkHour = _mapper.Map<WorkHour>(workHour);
            if (dalWorkHour == null)
                throw new InvalidOperationException("Mapping from BLWorkHour to WorkHour failed.");
            var x = Enum.TryParse(dalWorkHour.DayOfWeek, true, out DayOfWeek dayOfWeek);
            if (!x)
            {
                throw new ArgumentException("Invalid DayOfWeek value.", nameof(dalWorkHour.DayOfWeek));
            }

            if(dayOfWeek == DayOfWeek.Friday || dayOfWeek == DayOfWeek.Saturday)
                throw new ArgumentException("DayOfWeek must be between 1 and 5.", nameof(dalWorkHour.DayOfWeek));


            await _workHoursDal.UpdateWorkHours(dalWorkHour);
            var updatedWorkHours = await _workHoursDal.GetTherapistSchedule(workHour.TherapistId);
            if (updatedWorkHours == null)
            {
                throw new NullReferenceException(nameof(updatedWorkHours));
            }
            return _mapper.Map<List<BLWorkHour>>(updatedWorkHours);
        }


    }
}
