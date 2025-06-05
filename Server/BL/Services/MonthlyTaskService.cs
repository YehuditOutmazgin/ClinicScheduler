using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DAL.Services
{
    public class MonthlyTaskService: IHostedService, IDisposable
    {
        private Timer _timer;

        public Task StartAsync(CancellationToken cancellationToken)
        {
            // חישוב הזמן עד ל-1 לחודש הבא
            var now = DateTime.Now;
            var nextRunTime = new DateTime(now.Year, now.Month, 1).AddMonths(1);
            var timeToGo = nextRunTime - now;

            // הפעל את ה-Timer
            _timer = new Timer(DoWork, null, timeToGo, TimeSpan.FromDays(30)); // כל 30 יום

            return Task.CompletedTask;
        }

        private void DoWork(object state)
        {
            // כאן תשים את הקוד שתרצה להריץ
            Console.WriteLine("Monthly task executed: " + DateTime.Now);
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
