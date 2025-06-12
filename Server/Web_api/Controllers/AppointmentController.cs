using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BL.Api;
using BL.Models;
namespace Web_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        IAppointmentsManager _appointmentsManager;

        public AppointmentController(IAppointmentsManager appointmentsManager)
        {
            _appointmentsManager = appointmentsManager;
        }
        #region Regular Appointments
        // Get all future appointments for a patient by ID
        [HttpGet("future/{patientId}")]
        public async Task<IActionResult> GetFutureAppointmentsByPatientId(int patientId)
        {
            List<BLAppointment> appointments = await _appointmentsManager.GetAllAppointmentsByPatientId(patientId);
            return Ok(appointments);
        }

        // Get appointments for a therapist on a specific date by therapist ID
        [HttpGet("therapist/{therapistId}/date/{date}")]
        public async Task<IActionResult> GetAppointmentsByTherapistAndDate(int therapistId, string date)
        {
            DateOnly dateOnly = DateOnly.Parse(date ?? DateTime.Now.ToString("yyyy-MM-dd"));
            var appointments = await _appointmentsManager.GetAllAppointmentsByDateAndTherapistId(therapistId, dateOnly);
            return Ok(appointments);
        }

        // Get a list of appointments for the next business day
        [HttpGet("next-business-day")]
        public async Task<IActionResult> GetAppointmentsForNextBusinessDay()
        { /* Implementation */ return Ok(); }

        // Get appointments for a therapist for the week based on a given date
        [HttpGet("therapist/week/{therapistId}/date/{date}")]
        public async Task<IActionResult> GetAppointmentsForTherapistWeek(string therapistId, DateTime date)
        { /* Implementation */ return Ok(); }

        // Get all appointments for a specific date
        [HttpGet("date/{date}")]
        public async Task<IActionResult> GetAppointmentsByDate(DateTime date)
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

        // Delete a past appointment by appointment ID and patient ID
        [HttpDelete("past/delete/{appointmentId}/patient/{patientId}")]
        public async Task<IActionResult> DeletePastAppointment(string appointmentId, string patientId)
        { /* Implementation */ return Ok(); }
        #endregion








        //    [HttpGet("GetAllAppointmentsByDateAndTherapistId")]
        //    public async Task<List<BLAppointment>> GetAllAppointmentsByDateAndTherapistId(int therapistId, string? date)
        //    {
        //    }



        //    [HttpGet("GetSchedualeByTherapistForWeek")]

        //    public async Task<IActionResult> GetSchedualeByTherapistForWeek(int therapistId, string date)
        //    {
        //        BLAvailableAppointment appo =new();
        //        BLAppointment appo2 =new();
        //        return Ok( new { Available = appo, set = appo2 });
        //    }

        //    //[HttpGet]

        //    //public async Task<IActionResult> a()
        //    //{
        //    //    await _appointmentsManager.SetAvailableAppointmentForPeriod();
        //    //    return Ok();
        //    //}

        //    #region Get
        //    #region available appointments
        //    [HttpGet("GetAvailableAppointmentsForSpecificSpecializationForWeek")]
        //    public async Task<ActionResult<List<BLAvailableAppointment>>> GetAvailableAppointmentsForSpecificSpecializationForWeek(string specialization, string date)


        //#endregion
        //#endregion
        //// Add other endpoints as needed
    }

}