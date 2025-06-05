namespace BL.Api
{
    public interface IAvailableQueueManager
    {
        Task<bool> IsHolidayAsync(DateTime date);
    }
}