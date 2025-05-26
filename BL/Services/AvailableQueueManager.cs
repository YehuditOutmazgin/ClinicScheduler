using BL.Api;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace BL.service
{
    public class AvailableQueueManager : IAvailableQueueManager
    {

        private static AvailableQueueManager _instance;
        public static AvailableQueueManager Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new AvailableQueueManager();
                return _instance;
            }
        }



        private static readonly string _baseUrl = "https://www.hebcal.com/hebcal";




        public async Task<bool> IsHolidayAsync(DateTime date)
        {
            string year = date.Year.ToString();
            string month = date.Month.ToString("D2");
            string day = date.Day.ToString("D2");

            var url = $"{_baseUrl}?v=1&cfg=json&year={year}&month={month}&maj=on&min=off&mod=on&nx=off";

            using (HttpClient client = new HttpClient())
            {
                var response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var jsonString = await response.Content.ReadAsStringAsync();
                    var json = JObject.Parse(jsonString);

                    // מחפשים את התאריך בתוך רשימת החגים
                    var items = json["items"];
                    Console.WriteLine(items);
                    if (items != null)
                    {
                        foreach (var item in items)
                        {
                            var holidayDate = DateTime.Parse(item["date"].ToString());
                            if (holidayDate.Date == date.Date)
                            {
                                if (item["title"].ToString().Equals("Yom HaAtzma'ut", StringComparison.OrdinalIgnoreCase))
                                {
                                    return true;
                                }
                                else if (item["subcat"].ToString().Equals("modern"))
                                {

                                    Console.WriteLine(item["title"]);
                                    Console.WriteLine(item["subcat"]);

                                    return false;
                                }


                                return true;
                            }
                        }
                    }

                    return false; // לא נמצא חג
                }
                else
                {
                    throw new Exception($"API Error: {response.StatusCode}");
                }
            }
        }
    }
}

