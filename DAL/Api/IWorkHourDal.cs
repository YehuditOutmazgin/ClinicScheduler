using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;

namespace DAL.Api
{
    internal interface IWorkHourDal
    {
        Task AddWorkDay(WorkHour workHour);
        Task DeleteWorkDay(int therapistId, string DayOfWeek);
        Task UpdateWorkHours(WorkHour workHour);
        Task<WorkHour> GetTherapistSchedule(int therapistId);

    }
}
