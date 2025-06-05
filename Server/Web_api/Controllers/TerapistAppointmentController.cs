using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BL.Models;
using System;

namespace Web_api.Controllers
    {
        [ApiController]
        [Route("api/[controller]")]
        public class TerapistAppointmentController : ControllerBase
        {
        // interface properties for dependency injection can be added here
            public TerapistAppointmentController(/*Dependency injection*/)
            {

            }

            // קבלת תורים ליום מסוים (לו"ז יומי)
            [HttpGet("appointments/by-day")]
            public IActionResult GetAppointmentsByDay(int therapistId, DateTime date)
            {
                // TODO: לממש את הלוגיקה
                return Ok();
            }

            // קבלת תורים לשבוע מסוים (לו"ז שבועי)
            [HttpGet("appointments/by-week")]
            public IActionResult GetAppointmentsByWeek(int therapistId, DateTime weekStart)
            {
                // TODO: לממש את הלוגיקה
                return Ok();
            }

            // קבלת תורים לטווח תאריכים
            [HttpGet("appointments/by-range")]
            public IActionResult GetAppointmentsByRange(int therapistId, DateTime from, DateTime to)
            {
                // TODO: לממש את הלוגיקה
                return Ok();
            }

            // חיפוש תורים לפי סטטוס
            [HttpGet("appointments/by-status")]
            public IActionResult GetAppointmentsByStatus(int therapistId, /*AppointmentStatus status,*/ DateTime? from = null, DateTime? to = null)
            {
                // TODO: לממש את הלוגיקה
                return Ok();
            }

            // הוספת סיכום טיפול/הערות
            [HttpPost("appointments/summary")]
            public IActionResult AddAppointmentSummary(int therapistId, int appointmentId/*, [FromBody] AppointmentSummaryDto summary*/)
            {
                // TODO: לממש את הלוגיקה
                return Ok();
            }

            // צפייה בפרטי מטופל (לפי הרשאות)
            [HttpGet("patients/details")]
            public IActionResult GetPatientDetails(int therapistId, int patientId)
            {
                // TODO: לממש את הלוגיקה
                return Ok();
            }

            // קבלת רשימת מטופלים של המטפל
            [HttpGet("patients/by-therapist")]
            public IActionResult GetTherapistPatients(int therapistId)
            {
                // TODO: לממש את הלוגיקה
                return Ok();
            }

            // קבלת סטטיסטיקות על התורים (לדוג' אחוזי הגעה, ביטולים)
            [HttpGet("appointments/statistics")]
            public IActionResult GetAppointmentsStatistics(int therapistId, DateTime? from = null, DateTime? to = null)
            {
                // TODO: לממש את הלוגיקה
                return Ok();
            }

            // עדכון שעות עבודה קבועות (לו"ז שבועי)
            [HttpPut("availability/update-weekly")]
            public IActionResult UpdateWeeklyAvailability(int therapistId/*, [FromBody] WeeklyAvailabilityDto weeklyAvailability*/ )
            {
                // TODO: לממש את הלוגיקה
                return Ok();
            }

            // עדכון זמינות ליום מסוים (שעות עבודה מותאמות או ביטול יום)
            [HttpPut("availability/update-specific-day")]
            public IActionResult UpdateAvailabilityForSpecificDay(int therapistId, DateTime date/*, [FromBody] DayAvailabilityDto dayAvailability*/)
            {
                // TODO: לממש את הלוגיקה
                return Ok();
            }

            // ביטול כל הזמינות ליום מסוים (שבתון, מחלה, חופשה)
            [HttpPost("availability/cancel-day")]
            public IActionResult CancelAvailabilityForDay(int therapistId, DateTime date, string reason)
            {
                // TODO: לממש את הלוגיקה
                return Ok();
            }

            // קבלת דוח חודשי מרוכז על פעילות המטפל
            [HttpGet("appointments/monthly-report")]
            public IActionResult GetMonthlyReport(int therapistId, int month, int year)
            {
                // TODO: לממש את הלוגיקה
                return Ok();
            }
        }
    }
