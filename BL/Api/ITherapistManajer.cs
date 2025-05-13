using BL.Models;
using DAL.Models;

namespace BL.Api
{
    public  interface ITherapistManajer
    {
        Task AddTherapist(BLTherapist therapist);
        Task AddWorkDay(BLWorkHour workHour);
        Task DeleteTherapist(int id);
        Task DeleteWorkDay(int therapistId, string DayOfWeek);
        Task<List<BLTherapist>> GetAllTherapists();
        Task<Therapist> GetTherapistById(int id);
        Task<BLTherapist> GetTherapistByName(string firstName, string lastName);
        Task<List<BLWorkHour>> GetTherapistSchedule(string firstName, string lastName);
        Task UpdateTherapist(BLTherapist therapist);
        Task UpdateWorkHours(BLWorkHour workHour);
    }
}