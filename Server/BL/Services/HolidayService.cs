using Azure;
using BL.Api;
using Newtonsoft.Json.Linq;
using System;
using System.ComponentModel;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Globalization;


namespace BL.service
{
    //    public class HolidayService : IAvailableQueueManager
    //    {
    //        private readonly HttpClient _httpClient;
    //        public HttpResponseMessage _response { get; set; }
    //        public HolidayService(HttpClient httpClient)
    //        {
    //            _httpClient = httpClient;
    //        }
    //        public async Task<bool> IsHolidayAsync(DateTime date)
    //        {
    //            string year = date.Year.ToString();
    //            string month = date.Month.ToString("D2");

    //            // אין צורך ביום – ה־API מחזיר את כל החודש
    //            var url = $"?v=1&cfg=json&year={year}&month={month}&maj=on&min=on";
    //            if (_response == null || !_response.IsSuccessStatusCode)
    //            {
    //                _response = await _httpClient.GetAsync(url);
    //            }
    //            // else, _response is already successful, do nothing

    //            if (!_response.IsSuccessStatusCode)
    //                throw new Exception($"API Error: {_response.StatusCode}");

    //            var jsonString = await _response.Content.ReadAsStringAsync();
    //            var json = JObject.Parse(jsonString);
    //            var items = json["items"];

    //            if (items != null)
    //            {
    //                foreach (var item in items)
    //                {
    //                    DateTime holidayDate = DateTime.ParseExact(item["date"]!.ToString(), "yyyy-MM-dd", null);

    //                    if (holidayDate.Date == date.Date)
    //                    {
    //                        var title = item["title"]?.ToString();
    //                        var subcat = item["subcat"]?.ToString();

    //                        if (title?.Equals("Yom HaAtzma'ut", StringComparison.OrdinalIgnoreCase) == true)
    //                            return true;

    //                        if (subcat?.Equals("modern", StringComparison.OrdinalIgnoreCase) == true)
    //                            return false;
    //                        return true;
    //                    }
    //                }
    //            }

    //            return false;
    //        }
    //    }
    //}


    // מחלקה המייצגת יום ללא עבודה


    public class HolidayService : IHolidayService
    {
        HttpClient _httpClient;
        public HolidayService(HttpClient httpClient)
        {
            _httpClient = httpClient;

        }
        // שמות חגים שבהם אין עבודה (כולל בערב חג)
        static readonly string[] FullHolidayNames = new[]
        {

        "ערב פורים",
        "פורים",
        "שושן פורים",
        "פורים משולש",
        "ערב פסח",
        "פסח א׳",
        "פסח ב׳",
        "פסח ג׳ (חוה״מ)",
        "פסח ד׳ (חוה״מ)",
         "פסח ה׳ (חוה״מ)",
         "פסח ו׳ (חוה״מ)",
         "פסח ז׳",
          "יום העצמאות",
          "ל״ג בעומר",
        "ערב שבועות",
        "שבועות א׳",
         "ערב תשעה באב",
         "תשעה באב",
         "ערב ראש השנה",
         "ראש השנה 5786",
         "ראש השנה ב׳",
         "ערב יום כפור",
         "יום כפור",
         "ערב סוכות",
         "סוכות א׳",
         "סוכות ב׳",
         "סוכות ג׳ (חוה״מ)",
         "סוכות ד׳ (חוה״מ)",
         "סוכות ה׳ (חוה״מ)",
         "סוכות ו׳ (חוה״מ)",
         "סוכות ז׳ (הושענא רבה)",
         "שמיני עצרת",
         "שמחת תורה",

    };

        public async Task<bool> IsHolidayAsync(DateTime date)
        {
            var noWorkDays = await GetNoWorkDaysAsync(date.Date, date.Date);

            return noWorkDays.Contains(date.Date);
        }
        public async Task<List<DateTime>> GetNoWorkDaysAsync(DateTime firstDay, DateTime lastDay)
        {
            var noWorkDays = new List<DateTime>();
            // 1. שבתות
            for (var day = firstDay; day <= lastDay; day = day.AddDays(1))
            {
                if (day.DayOfWeek == DayOfWeek.Saturday)
                    noWorkDays.Add(day);
            }
            string start = $"{firstDay.Year}-{firstDay.Month:00}-01";
            string end = $"{lastDay.Year}-{lastDay.Month:00}-{lastDay.AddMonths(1).AddDays(-1):00}";
            // 2. חגים וערבי חג, חול המועד, פורים ותשעה באב
            string url = $"?v=1&cfg=json&start={start}&end={end}&maj=on&min=on&mod=on&mf=on&i=on&lg=he";
            string json = await DownloadStringAsync(url);
            Console.WriteLine(json);
            using var doc = JsonDocument.Parse(json);
            var items = doc.RootElement.GetProperty("items");

            // שמירת תאריכים של כל סוגי החגים
            var holidayDates = new HashSet<DateTime>();

            foreach (var item in items.EnumerateArray())
            {
                string title = item.GetProperty("title").GetString() ?? "";
                string hebrew = item.TryGetProperty("hebrew", out var hebElem) ? hebElem.GetString() ?? "" : "";
                string dateStr = item.GetProperty("date").GetString() ?? "";
                DateTime date = DateTime.ParseExact(dateStr, "yyyy-MM-dd", CultureInfo.InvariantCulture);



                if (FullHolidayNames.Any(h => title.Contains(h) || hebrew.Contains(h)))
                    holidayDates.Add(date);
            }
            // הוספה לרשימה
            noWorkDays.AddRange(holidayDates);

            // סידור וסינון כפילויות
            return noWorkDays.Distinct().OrderBy(d => d).ToList();
        }

        async Task<string> DownloadStringAsync(string url)
        {
            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
                throw new Exception($"API Error: {response.StatusCode}");

            var jsonString = await response.Content.ReadAsStringAsync();
            //var json = JObject.Parse(jsonString);
            return jsonString;
        }
    }   
}