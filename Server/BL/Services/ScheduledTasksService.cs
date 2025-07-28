using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using System.Threading.Tasks;
using BL.Api;

namespace DAL.Services
{
    public class ScheduledTasksService : IHostedService, IDisposable
    {
        private Timer _monthlyTimer;
        private Timer _dailyTimer;
        private readonly IAppointmentsManager _appointmentsManager;

        public ScheduledTasksService(IAppointmentsManager appointmentsManager)
        {
            _appointmentsManager = appointmentsManager;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            ScheduleMonthlyTask();
            ScheduleDailyTask();

            return Task.CompletedTask;
        }

        private void ScheduleMonthlyTask()
        {
            var now = DateTime.Now;
            var nextMonth = new DateTime(now.Year, now.Month, 1).AddMonths(1);
            var delay = nextMonth - now;

            _monthlyTimer = new Timer(ExecuteMonthlyTask, null, delay, TimeSpan.FromDays(30));
        }

        private void ScheduleDailyTask()
        {
            var now = DateTime.Now;
            var midnightTonight = DateTime.Today.AddDays(1);
            var delay = midnightTonight - now;

            _dailyTimer = new Timer(ExecuteDailyTask, null, delay, TimeSpan.FromDays(1));
        }

        private void ExecuteMonthlyTask(object state)
        {
            try
            {
                Console.WriteLine("Executing monthly task: " + DateTime.Now);
                _appointmentsManager.SetAvailableAppointmentForPeriod();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error in monthly task: " + ex.Message);
            }
        }

        private void ExecuteDailyTask(object state)
        {
            try
            {
                Console.WriteLine("Executing daily task: " + DateTime.Now);
                _appointmentsManager.MovePastAppointmentsToHistory(); // לדוגמה – פונקציה שאת תכתבי
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error in daily task: " + ex.Message);
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _monthlyTimer?.Change(Timeout.Infinite, 0);
            _dailyTimer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _monthlyTimer?.Dispose();
            _dailyTimer?.Dispose();
        }
    }
}
