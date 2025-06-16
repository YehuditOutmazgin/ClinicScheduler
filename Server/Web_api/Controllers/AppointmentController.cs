using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BL.Api;
using BL.Models;
using BL;
namespace Web_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        IAppointmentsManager _appointmentsManager;
        BLManager _BLManager;

        public AppointmentController(IAppointmentsManager appointmentsManager, BLManager BLManager)
        {
            _appointmentsManager = appointmentsManager;
            _BLManager = BLManager;
        }
        #region Regular Appointments
        // Get all future appointments for a patient by ID
        [HttpGet("future/{patientId}")]
        public async Task<IActionResult> GetFutureAppointmentsByPatientId(int patientId)
        {
            List<BLAppointment> appointments = await _BLManager.GatPatientAppointments(patientId);
            return Ok(appointments);
        }

        // Get appointments for a therapist on a specific date by therapist ID( sets and available for more details ask Yehudit or Rivka)
        [HttpGet("therapist/{therapistId}/date/{date}")]
        public async Task<IActionResult> GetAppointmentsByTherapistAndDate(int therapistId, string? date)
        {
            DateOnly dateOnly = DateOnly.Parse(date ?? DateTime.Now.ToString("yyyy-MM-dd"));
            var appointments = await _appointmentsManager.GetAllAppointmentsByDateAndTherapistId(therapistId, dateOnly);
            return Ok(appointments);
        }

        // Get appointments for a therapist for the week based on a given date
        [HttpGet("therapist/week/{therapistId}/date/{date}")]
        public async Task<IActionResult> GetAppointmentsForTherapistWeek(string therapistId, DateTime date)
        { /* Implementation */ return Ok(); }

        // Get all appointments for a specific date
        [HttpGet("date/{date}")]
        public async Task<IActionResult> GetAppointmentsByDate(DateTime date)
        { /* Implementation */ return Ok(); }

        // update not sure we give this functional
        [HttpPut("update{appointmentId}")]
        public async Task<IActionResult> UpdateAppointment(int appointmentId, [FromBody] BLAppointment appointment)
        { /* Implementation */ return Ok(); }
        #endregion

        #region Appointment Confirmation
        // Get a list of appointments for the next business day
        [HttpGet("next-business-day")]
        public async Task<IActionResult> GetAppointmentsForNextBusinessDay()
        { /* Implementation */ return Ok(); }


        // Confirm arrival for a specific appointment
        [HttpPost("confirm/{appointmentId}")]
        public async Task<IActionResult> ConfirmAppointment(int appointmentId)
        { /* Implementation */ return Ok(); }

        // Get the status of a specific appointment
        [HttpGet("status/{appointmentId}")]
        public async Task<IActionResult> GetAppointmentStatus(int appointmentId)
        { /* Implementation */ return Ok(); }

        // Update the confirmation status of a specific appointment
        [HttpPut("update-confirmation/{appointmentId}")]
        public async Task<IActionResult> UpdateAppointmentConfirmation(int appointmentId, bool isConfirmed)
        { /* Implementation */ return Ok(); }

        // Get all canceled appointments for a specific patient
        [HttpGet("patient/{patientId}/canceled")]
        public async Task<IActionResult> GetCanceledAppointmentsForPatient(string patientId)
        { /* Implementation */ return Ok(); }

        // Get all canceled appointments
        [HttpGet("canceled")]
        public async Task<IActionResult> GetAllCanceledAppointments()
        { /* Implementation */ return Ok(); }


        #endregion

        #region Available Appointments
        // Get available appointments for a specific therapist for a given week
        [HttpGet("available/therapist/{therapistId}/week/{weekDate}")]
        public async Task<IActionResult> GetAvailableAppointmentsForTherapistWeek(string therapistId, DateTime weekDate)
        { /* Implementation */ return Ok(); }

        // Get available appointments for a specific therapist for a specific date
        [HttpGet("available/therapist/{therapistId}/date/{date}")]
        public async Task<IActionResult> GetAvailableAppointmentsForTherapistByDate(string therapistId, DateTime date)
        { /* Implementation */ return Ok(); }

        // Get available appointments for a specific specialty for a given week
        [HttpGet("available/specialty/{specialty}/week/{weekDate}")]
        public async Task<IActionResult> GetAvailableAppointmentsForSpecialtyWeek(string specialty, string weekDate)
        {
            if (!DateOnly.TryParse(weekDate, out DateOnly dateOnly))
            {
                dateOnly = DateOnly.FromDateTime(DateTime.Now);
            }
            var availapp = await _appointmentsManager.GetAvailableAppointmentsForSpecificSpecializationForWeek(specialty, dateOnly);
            if (availapp == null)
            {
                return NotFound("No available appointments found for the specified specialization and week.");
            }
            return Ok(availapp);
        }

        // Get available appointments for a specific specialty and therapist for a specific date
        [HttpGet("available/specialty/{specialty}/therapist/{therapistId}/date/{date}")]
        public async Task<IActionResult> GetAvailableAppointmentsForSpecialtyByTherapist(string specialty, string therapistId, DateTime date)
        { /* Implementation */
            return Ok();
        }
        #endregion

        #region Past Appointments
        // Get past appointments for a therapist by date and therapist ID
        [HttpGet("past/therapist/{therapistId}/date/{date}")]
        public async Task<IActionResult> GetPastAppointmentsByTherapistAndDate(string therapistId, DateTime date)
        { /* Implementation */ return Ok(); }

        // Get past appointments for a therapist within a date range (default to six months ago to now)
        [HttpGet("past/therapist/{therapistId}/range")]
        public async Task<IActionResult> GetPastAppointmentsByTherapistInDateRange(string therapistId, DateTime startDate, DateTime endDate = default)
        { /* Implementation */ return Ok(); }

        //Get history appointment for patient.
        [HttpGet("history/{patientId}")]
        public IActionResult GetPatientAppointmentHistory(int patientId)
        { /* Implementation */ return Ok(); }
        #endregion

        #region Schedule Appointment
        // Schedule an appointment based on patient ID and appointment ID
        [HttpPost("schedule")]
        public async Task<IActionResult> ScheduleAppointment(string patientId, string appointmentId)
        { /* Implementation */ return Ok(); }
        #endregion

        #region Deletion
        // Delete a future appointment by appointment ID and patient ID
        [HttpDelete("delete/{appointmentId}/patient/{patientId}")]
        public async Task<IActionResult> DeleteAppointment(string appointmentId, string patientId)
        { /* Implementation */ return Ok(); }

        // Delete a future appointment by appointment ID and patient ID therapist made need to add it to cancle appointment for confimation.
        [HttpDelete("delete/byTherapist/{appointmentId}/patient/{patientId}/")]
        public async Task<IActionResult> DeleteAppointmentByTherapist(string appointmentId, string patientId)
        { /* Implementation */ return Ok(); }
        // Delete a past appointment by appointment ID and patient ID
        [HttpDelete("past/delete/{appointmentId}/patient/{patientId}")]
        public async Task<IActionResult> DeletePastAppointment(string appointmentId, string patientId)
        { /* Implementation */ return Ok(); }

        // Delete a canceled appointment
        [HttpDelete("cancel/{appointmentId}")]
        public async Task<IActionResult> DeleteCanceledAppointment(int appointmentId)
        { /* Implementation */ return Ok(); }
        #endregion
    }
}