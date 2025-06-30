using BL.Api;
using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace BL.service
{
    public class AvailableQueueManager : IAvailableQueueManager
    {
        private readonly HttpClient _httpClient;

        public AvailableQueueManager(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<bool> IsHolidayAsync(DateTime date)
        {
            string year = date.Year.ToString();
            string month = date.Month.ToString("D2");

            // אין צורך ביום – ה־API מחזיר את כל החודש
            var url = $"?v=1&cfg=json&year={year}&month={month}&maj=on&min=off&mod=on&nx=off";

            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
                throw new Exception($"API Error: {response.StatusCode}");

            var jsonString = await response.Content.ReadAsStringAsync();
            var json = JObject.Parse(jsonString);
            var items = json["items"];

            if (items != null)
            {
                foreach (var item in items)
                {
                    DateTime holidayDate = DateTime.ParseExact(item["date"]!.ToString(), "yyyy-MM-dd", null);

                    if (holidayDate.Date == date.Date)
                    {
                        var title = item["title"]?.ToString();
                        var subcat = item["subcat"]?.ToString();

                        if (title?.Equals("Yom HaAtzma'ut", StringComparison.OrdinalIgnoreCase) == true)
                            return true;

                        if (subcat?.Equals("modern", StringComparison.OrdinalIgnoreCase) == true)
                            return false;

                        return true;
                    }
                }
            }

            return false;
        }
    }
}
