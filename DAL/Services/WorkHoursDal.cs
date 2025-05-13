using DAL.Models;
using DAL.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DAL.Services
{

    public class WorkHoursDal : IWorkHoursDal
    {
        private readonly DB_Manager _DB_Manager;

        public async Task AddWorkDay(WorkHour workHour)
        {

            await _DB_Manager.WorkHours.AddAsync(workHour);
            await _DB_Manager.SaveChangesAsync();
        }

        public async Task DeleteWorkDay(int therapistId, string dayOfWeek)
        {
            var therapistExists = await _DB_Manager.Therapists
                .AnyAsync(t => t.TherapistId == therapistId);

            if (!therapistExists)
            {
                throw new KeyNotFoundException($"Therapist with ID {therapistId} does not exist.");
            }

            List<WorkHour> workHour = await _DB_Manager.WorkHours
                .Where(wh => wh.TherapistId == therapistId && wh.DayOfWeek == dayOfWeek).ToListAsync();

            if (workHour == null && workHour.Count == 0)
            {
                throw new KeyNotFoundException($"No work hours found for TherapistId {therapistId} on {dayOfWeek}.");
            }

            _DB_Manager.WorkHours.RemoveRange(workHour);
            await _DB_Manager.SaveChangesAsync();

        }

        public async Task UpdateWorkHours(WorkHour workHour)
        {


            var therapistExists = await _DB_Manager.Therapists
                .AnyAsync(t => t.TherapistId == workHour.TherapistId);

            if (!therapistExists)
            {
                throw new KeyNotFoundException($"Therapist with ID {workHour.TherapistId} does not exist.");
            }

            var existingWorkHour = await _DB_Manager.WorkHours
                .FirstOrDefaultAsync(wh => wh.Id == workHour.Id);

            if (existingWorkHour == null)
            {
                throw new KeyNotFoundException($"WorkHour with ID {workHour.Id} was not found.");
            }
            _DB_Manager.Entry(existingWorkHour).CurrentValues.SetValues(workHour);
            await _DB_Manager.SaveChangesAsync();
        }


        public async Task<List<WorkHour>> GetTherapistSchedule(int therapistId)
        {
            var therapistExists = await _DB_Manager.Therapists
                .AnyAsync(t => t.TherapistId == therapistId);

            if (!therapistExists)
            {
                throw new KeyNotFoundException($"Therapist with ID {therapistId} does not exist.");
            }
            var workHours = await _DB_Manager.WorkHours
                .Where(wh => wh.TherapistId == therapistId)
                .ToListAsync();

            if (workHours == null || !workHours.Any())
            {
                throw new KeyNotFoundException($"No schedule found for TherapistId {therapistId}.");
            }

            return workHours;
        }
    }
}



