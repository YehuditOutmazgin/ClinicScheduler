using Microsoft.AspNetCore.Mvc;
using BL.Models;

namespace Web_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        public PatientController(/*Dependency injection*/)
        {

        }

        // צפייה בתורים העתידיים של המטופל
        [HttpGet("appointments/upcoming")]
        public IActionResult GetUpcomingAppointments(int patientId)
        {

            // TODO: לממש את הלוגיקה
            return Ok();
        }

        // צפייה בהיסטוריית תורים של המטופל
        [HttpGet("appointments/history")]
        public IActionResult GetAppointmentHistory(int patientId)
        {
            // TODO: לממש את הלוגיקה
            return Ok();
        }

        // קביעת תור פנוי (ניתן לספק מזהה תור פנוי)
        [HttpPost("appointments/book")]
        public IActionResult BookAppointment(int patientId, int appointmentId)
        {
            // TODO: לממש את הלוגיקה
            return Ok();
        }

        // ביטול תור עתידי
        [HttpPost("appointments/cancel")]
        public IActionResult CancelAppointment(int patientId, int appointmentId)
        {
            // TODO: לממש את הלוגיקה
            return Ok();
        }

        // צפייה בפרטי תור מסוים
        [HttpGet("appointments/details")]
        public IActionResult GetAppointmentDetails(int patientId, int appointmentId)
        {
            // TODO: לממש את הלוגיקה
            return Ok();
        }

        // קבלת רשימת תורים פנויים להתמחות מסוימת
        [HttpGet("appointments/available/by-specialty")]
        public IActionResult GetAvailableAppointmentsBySpecialty(Specialization specialty)
        {
            // TODO: לממש את הלוגיקה
            return Ok();
        }

        // קבלת רשימת תורים פנויים למטפל מסוים
        [HttpGet("appointments/available/by-therapist")]
        public IActionResult GetAvailableAppointmentsByTherapist(int therapistId)
        {
            // TODO: לממש את הלוגיקה
            return Ok();
        }

        // קבלת תזכורות לתורים עתידיים של המטופל
        [HttpGet("appointments/reminders")]
        public IActionResult GetAppointmentReminders(int patientId)
        {
            // TODO: לממש את הלוגיקה
            return Ok();
        }

        // עדכון פרטים אישיים של המטופל
        [HttpPut("profile/update")]
        public IActionResult UpdatePatientProfile(int patientId, [FromBody] object/*PatientUpdateDto*/ updateDto)
        {
            // TODO: לממש את הלוגיקה
            return Ok();
        }
    }
}