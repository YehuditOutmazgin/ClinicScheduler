using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;

namespace DAL.Api
{
    public  interface IWorkHoursDal
    {
        Task AddWorkDay(WorkHour workHour);
        Task DeleteWorkDay(int therapistId, string DayOfWeek);
        Task UpdateWorkHours(WorkHour workHour);
        Task<List<WorkHour>> GetTherapistSchedule(int therapistId);

    }
}
