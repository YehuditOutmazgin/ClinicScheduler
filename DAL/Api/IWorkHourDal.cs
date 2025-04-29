using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;
<<<<<<< HEAD
=======

>>>>>>> 52dcaef1b7259ae0e0e0fe130ff342bb5f106f5b
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
