using BL.Models;
using DAL.Models;


namespace BL.Api
{
    public  interface ITherapistManager
    {
        Task<BLTherapist> AddTherapist(BLTherapist therapist);
        Task<BLWorkHour> AddWorkDay(BLWorkHour workHour);
        Task<BLTherapist> DeleteTherapist(int id);
        Task <List<BLWorkHour>> DeleteWorkDay(int therapistId, string DayOfWeek);
        Task<List<BLTherapist>> GetAllTherapists();
        Task<BLTherapist> GetTherapistById(int id);
        Task<BLTherapist> GetTherapistByName(string firstName, string lastName);
        Task<List<BLWorkHour>> GetTherapistSchedule(string firstName, string lastName);
        Task <BLTherapist> UpdateTherapist(BLTherapist therapist);
        Task<List<BLWorkHour>> UpdateWorkHours(BLWorkHour workHour);
    }
}

