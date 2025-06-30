using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BL.Api;
using BL.Models;
using BL;

using System;
namespace Web_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        BLManager _BLManager;
        IAvailableQueueManager _availableQueueManager;
        public AppointmentController( BLManager BLManager,IAvailableQueueManager availableQueueManager)
        {
            _BLManager = BLManager;
            _availableQueueManager = availableQueueManager;
        }
        #region Regular Appointments (3 functions) to implement
        // Get all future appointments for a patient by ID
        [HttpGet("future/{patientId}")]
        public async Task<IActionResult> GetFutureAppointmentsByPatientId(int patientId)
        {
            List<BLAppointment> appointments = await _BLManager._appointmentsManager.GetAllAppointmentsByPatientId(patientId);
            return Ok(appointments);
        }

        // Get appointments for a therapist on a specific date by therapist ID( sets and available for more details ask Yehudit or Rivka)
        [HttpGet("therapist/{therapistId}/date/{date}")]
        public async Task<IActionResult> GetAppointmentsByTherapistAndDate(int therapistId, string? date)
        {
            DateOnly dateOnly = DateOnly.Parse(date ?? DateTime.Now.ToString("yyyy-MM-dd"));
            var appointments = await _BLManager._appointmentsManager.GetAllAppointmentsByDateAndTherapistId(therapistId, dateOnly);
            return Ok(appointments);
        }

        /// <summary>
        /// Rebecca implement this functions if you have any questions about the implementation or the function, contact me by phone:0548535515
        /// </summary>
        /// <returns></returns>

        //// Get appointments for a therapist for the week based on a given date
        [HttpGet("therapist/week/{therapistId}/date/{date}")]
        public async Task<IActionResult> GetAppointmentsForTherapistWeek(int therapistId, string? date)
        {
            DateOnly dateOnly = DateOnly.Parse(date ?? DateTime.Now.ToString("yyyy-MM-dd"));
            var appointments = await _BLManager._appointmentsManager.GetAppointmentsByTherapistIdAndWeek(therapistId, dateOnly);
            return Ok(appointments);
        }

        // Get all appointments for a specific date
        [HttpGet("date/{date}")]
        public async Task<IActionResult> GetAppointmentsByDate(string? date)
        {
            DateOnly dateOnly = DateOnly.Parse(date ?? DateTime.Now.ToString("yyyy-MM-dd"));
            var appointments = await _BLManager._appointmentsManager.GetAllAppointmentsByDate(dateOnly);
            return Ok(appointments);
        }

        // update not sure we give this functional
        [HttpPut("update{appointmentId}")]
        public async Task<IActionResult> UpdateAppointment(int appointmentId, [FromBody] BLAppointment appointment)
        { /* Implementation */ return Ok(); }
        #endregion

        #region Appointment Confirmation (6 functions) to implement
        // Get a list of appointments for the next business day
        [HttpGet("next-business-day")]
        public async Task<IActionResult> GetAppointmentsForNextBusinessDay()
        {
            DateTime date = await _BLManager._appointmentsManager.NextBusinessDay();
            DateOnly dateOnly = DateOnly.FromDateTime(date);
            var appointments = await _BLManager._appointmentsManager.GetAllAppointmentsByDate(dateOnly);
            return Ok(appointments);
        }

        // Confirm arrival for a specific appointment
        [HttpPost("confirm/{appointmentId}")]
        public async Task<IActionResult> ConfirmAppointment(int appointmentId)
        {
            var appointment = await _BLManager._appointmentsManager.SetAppointmentStatus(appointmentId, true);
            return Ok(appointment);
        }

        // Get the status of a specific appointment
        [HttpGet("status/{appointmentId}")]
        public async Task<IActionResult> GetAppointmentStatus(int appointmentId)
        {
            var appointment = await _BLManager._appointmentsManager.GetAppointmentById(appointmentId);
            return Ok(new { appointmentId = appointment.AppointmentId, isConfirmed = appointment.Status });
        }

        // Update the confirmation status of a specific appointment
        [HttpPut("update-confirmation/{appointmentId}")]
        public async Task<IActionResult> CancelAppointmentConfirmation(int appointmentId)
        {
            var appointment = await _BLManager._appointmentsManager.SetAppointmentStatus(appointmentId, false);
            return Ok(appointment);
        }

        // Get all canceled appointments for a specific patient
        [HttpGet("patient/{patientId}/canceled")]
        public async Task<IActionResult> GetCanceledAppointmentsForPatient(string patientId)
        {
            var appointments = await _BLManager._appointmentsManager.GetCanceleAppointmentsByPatientId(int.Parse(patientId));
            return Ok(appointments);
        }

        // Get all canceled appointments
        [HttpGet("canceled")]
        public async Task<IActionResult> GetAllCanceledAppointments()
        {
            var appointments = await _BLManager._appointmentsManager.GetAllCanceleAppointments();
            return Ok(appointments);
        }


        #endregion


        #region Available Appointments (4 functions) to implement
        // Get available appointments for a specific therapist for a given week
        [HttpGet("available/therapist/{therapistId}/week/{weekDate}")]
        public async Task<IActionResult> GetAvailableAppointmentsForTherapistWeek(int therapistId, string weekDate)
        {
            if (!DateOnly.TryParse(weekDate, out DateOnly dateOnly))
            {
                dateOnly = DateOnly.FromDateTime(DateTime.Now);
            }
            var availapp = await _BLManager._appointmentsManager.GetAvailableAppointmentsForSpecificTherapistForWeek(therapistId, dateOnly);
            if (availapp == null)
            {
                return NotFound("No available appointments found for the specified therapist and week.");
            }
            return Ok(availapp);
        }

        // Get available appointments for a specific specialty for a given week
        [HttpGet("available/specialty/{specialty}/week/{weekDate}")]
        public async Task<IActionResult> GetAvailableAppointmentsForSpecialtyWeek(string specialty, string weekDate)
        {
            if (!DateOnly.TryParse(weekDate, out DateOnly dateOnly))
            {
                dateOnly = DateOnly.FromDateTime(DateTime.Now);
            }
            var availapp = await _BLManager._appointmentsManager.GetAvailableAppointmentsForSpecificSpecializationForWeek(specialty, dateOnly);
            if (availapp == null)
            {
                return NotFound("No available appointments found for the specified specialization and week.");
            }
            return Ok(availapp);
        }

        // Fix for CS0019: Operator '==' cannot be applied to operands of type 'method group' and 'int'
        [HttpGet("past/therapist/{therapistId}/date/{date}")]
        public async Task<IActionResult> GetPastAppointmentsByTherapistAndDate(int therapistId, string date)
        {
            if (!DateOnly.TryParse(date, out DateOnly dateOnly))
            {
                dateOnly = DateOnly.FromDateTime(DateTime.Now);
            }
            var appointments = await _BLManager._appointmentsManager.GetPastAppointmentsByTherapistIdAndDate(therapistId, dateOnly);
            if (appointments == null || appointments.Count == 0) // Ensure appointments.Count is properly accessed
            {
                return NotFound("No past appointments found for the specified therapist and date.");
            }
            return Ok(appointments);
        }

        // Get past appointments for a therapist within a date range (default to six months ago to now)
        [HttpGet("past/therapist/{therapistId}/range")]
        public async Task<IActionResult> GetPastAppointmentsByTherapistInDateRange(int therapistId, string startDate, string endDate)
        {
            DateOnly start = DateOnly.TryParse(startDate, out DateOnly parsedStart) ? parsedStart : DateOnly.FromDateTime(DateTime.Now.AddMonths(-6));
            DateOnly end = DateOnly.TryParse(endDate, out DateOnly parsedEnd) ? parsedEnd : DateOnly.FromDateTime(DateTime.Now);
            var appointments = await _BLManager._appointmentsManager.GetPastAppointmentsByTherapistInDateRange(therapistId, start, end);
            if (appointments == null || appointments.Count == 0)
            {
                return NotFound("No past appointments found for the specified therapist in the date range.");
            }
            return Ok(appointments);
        }

        //Get history appointment for patient.
        [HttpGet("history/{patientId}")]
        public async Task<IActionResult> GetPatientAppointmentHistory(int patientId)
        {
            var appointments = await _BLManager._appointmentsManager.GetPastAppointmentsByPatientId(patientId);
            if (appointments == null || appointments.Count == 0)
            {
                return NotFound("No appointment history found for the specified patient.");
            }
            return Ok(appointments);
        }
        #endregion

        #region Schedule Appointment (1 function) to implement
        // Schedule an appointment based on patient ID and appointment ID
        [HttpPost("schedule")]
        public async Task<IActionResult> ScheduleAppointment(int patientId, int appointmentId)
        {
            return Ok(await _BLManager._appointmentsManager.ScheduleAppointment(patientId, appointmentId));
        }
        #endregion

        #region Deletion (4 functions) to implement
        // Delete a future appointment by appointment ID and patient ID
        [HttpDelete("delete/{appointmentId}/patient/{patientId}")]
        public async Task<IActionResult> DeleteAppointment(int appointmentId, int patientId)
        {
            int x=1234567891;
            long y = 1234567790123456565;
            return Ok(await _BLManager._appointmentsManager.DeleteAppointmentByPatient(patientId, appointmentId));
        }
        // Delete a future appointment by appointment ID and patient ID therapist made need to add it to cancle appointment for confimation.
        [HttpDelete("delete/byTherapist/{appointmentId}/patient/{patientId}/")]
        public async Task<IActionResult> DeleteAppointmentByTherapist(int therapistId, string date)
        {
            DateOnly dateOnly = DateOnly.Parse(date ?? DateTime.Now.ToString("yyyy-MM-dd"));

            return Ok(await _BLManager._appointmentsManager.DeleteAppointmentForTherapistAndDate(therapistId, dateOnly));
        }
        // Delete a past appointment by appointment ID and patient ID
        [HttpDelete("past/delete/{appointmentId}/patient/{patientId}")]
        public async Task<IActionResult> DeletePastAppointment(string appointmentId, string patientId)
        { /*I think that this function is not needed*/ return Ok(); }

        // Delete a canceled appointment
        //[HttpDelete("cancel/{appointmentId}")]
        //------------------------------------------------------------------------------------------------------------------
        //public async Task<IActionResult> DeleteCanceledAppointment(int appointmentId)
        //{

        //}
        [HttpPost("setAppForPeriod")]

        public async Task<bool> setAppForPeriod()
        {
            await _BLManager._appointmentsManager.SetAvailableAppointmentForPeriod();
            return true;
        }

        /*[HttpGet("isHoliday")]
        public async Task<bool> isHoliday(DateTime date)
        {
            return await _availableQueueManager.IsHolidayAsync(date);
        }*/
        #endregion
    }
}