using BL.service;

namespace BL.Api
{
    public interface IHolidayService
    {
        Task<List<DateTime>> GetNoWorkDaysAsync(DateTime firstDay, DateTime lastDay);
        Task<bool> IsHolidayAsync(DateTime date);
    }
}