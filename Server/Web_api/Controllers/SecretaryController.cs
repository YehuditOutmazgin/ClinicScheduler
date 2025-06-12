/////////////// NOT IN USE




//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using BL.Models;

//namespace Web_api.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class SecretaryController : ControllerBase
//    {
//        // interface property
//        public SecretaryController(/*Dependency injection*/)
//        {

//        }

//        // קבלת לוח כל התורים הפנויים והתפוסים לשבוע מסוים
//        [HttpGet("appointments/schedule")]
//        public IActionResult GetWeeklySchedule(DateTime weekStart)
//        {
//            // TODO: לממש את הלוגיקה
//            return Ok();
//        }

//        // קבלת תורים פנויים למטפל מסוים לשבוע מסוים
//        [HttpGet("appointments/available/by-therapist")]
//        public IActionResult GetAvailableAppointmentsByTherapist(int therapistId, DateTime weekStart)
//        {
//            // TODO: לממש את הלוגיקה
//            return Ok();
//        }

//        // קבלת תורים פנויים להתמחות מסוימת
//        [HttpGet("appointments/available/by-specialty")]
//        public IActionResult GetAvailableAppointmentsBySpecialty(Specialization specialty, DateTime weekStart)
//        {
//            // TODO: לממש את הלוגיקה
//            return Ok();
//        }

//        // קביעת תור למטופל
//        [HttpPost("appointments/book")]
//        public IActionResult BookAppointment(int appointmentId, int patientId)
//        {
//            // TODO: לממש את הלוגיקה
//            return Ok();
//        }

//        // ביטול תור למטופל
//        [HttpPost("appointments/cancel")]
//        public IActionResult CancelAppointment(int appointmentId, int patientId)
//        {
//            // TODO: לממש את הלוגיקה
//            return Ok();
//        }

//        // קבלת היסטוריית תורים של מטופל
//        [HttpGet("appointments/history/by-patient")]
//        public IActionResult GetPatientAppointmentHistory(int patientId)
//        {
//            // TODO: לממש את הלוגיקה
//            return Ok();
//        }

//        // קבלת רשימת כל המטפלים הפעילים
//        [HttpGet("therapists/active")]
//        public IActionResult GetActiveTherapists()
//        {
//            // TODO: לממש את הלוגיקה
//            return Ok();
//        }

//        // קבלת רשימת כל ההתמחויות
//        [HttpGet("specialties")]
//        public IActionResult GetSpecialties()
//        {
//            // TODO: לממש את הלוגיקה
//            return Ok();
//        }

//        // קבלת רשימת תורים שבוטלו עבור מטופל מסוים
//        [HttpGet("appointments/canceled/by-patient")]
//        public IActionResult GetCanceledAppointmentsByPatient(int patientId)
//        {
//            // TODO: לממש את הלוגיקה
//            return Ok();
//        }

//        // קבלת רשימת תורים שבוטלו עבור כל המטופלים (לדיווח/הודעה)
//        [HttpGet("appointments/canceled/all")]
//        public IActionResult GetAllCanceledAppointments()
//        {
//            // TODO: לממש את הלוגיקה
//            return Ok();
//        }

//        // קבלת תורים ליום העסקים הבא (לצורך שליחת תזכורת)
//        [HttpGet("appointments/next-business-day")]
//        public IActionResult GetAppointmentsForNextBusinessDay()
//        {
//            // TODO: לממש את הלוגיקה
//            return Ok();
//        }

//        #region פונקציות נוספות מומלצות

//        // חיפוש תורים לפי טווח תאריכים (לסינון מתקדם)
//        [HttpGet("appointments/search/by-date-range")]
//        public IActionResult SearchAppointmentsByDateRange(DateTime startDate, DateTime endDate)
//        {
//            // TODO: לממש את הלוגיקה
//            return Ok();
//        }

//        // שליחת תזכורת למטופל על תור קרוב
//        [HttpPost("appointments/reminder")]
//        public IActionResult SendAppointmentReminder(int appointmentId, int patientId)
//        {
//            // TODO: לממש את הלוגיקה
//            return Ok();
//        }

//        // קבלת סטטיסטיקות על תורים (כמות פנויים/תפוסים/בוטלו)
//        [HttpGet("appointments/statistics")]
//        public IActionResult GetAppointmentsStatistics()
//        {
//            // TODO: לממש את הלוגיקה
//            return Ok();
//        }

//        // קבלת תורים עתידיים למטפל מסוים
//        [HttpGet("appointments/future/by-therapist")]
//        public IActionResult GetFutureAppointmentsByTherapist(int therapistId)
//        {
//            // TODO: לממש את הלוגיקה
//            return Ok();
//        }

//        // קבלת תורים שממתינים לאישור (למשל אם יש תורים שממתינים לאישור של מטפל/מנהל)
//        [HttpGet("appointments/pending")]
//        public IActionResult GetPendingAppointments()
//        {
//            // TODO: לממש את הלוגיקה
//            return Ok();
//        }

//        #endregion
//    }
//}
////---------------------------------!אין עדכון תור לבינתיים---------------------------
////// עדכון תור (למשל שינוי שעה/מטפל)
////[HttpPut("appointments/update")]
////public IActionResult UpdateAppointment(int appointmentId, [FromBody] AppointmentUpdateDto updateData)
////{
////    // TODO: לממש את הלוגיקה
////    return Ok();
////}}