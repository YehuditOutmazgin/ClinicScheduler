using BL;
using BL.Api;
using BL.Models;
using BL.Services;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TherapistController : ControllerBase
    {
        // 5 functions to implement


        private readonly BLManager _blManager;
        //ctor
        public TherapistController(BLManager therapistManager, IAppointmentsManager appointmentsManager)
        {
            _blManager = therapistManager;
        }
        // Get a list of all therapists
        [HttpGet]
        public async Task<IActionResult> GetAllTherapists()
        {
            var list = await _blManager._therapistManager.GetAllTherapists();
            if (list == null || list.Count == 0)
                return NotFound("No patients found.");
            list.ForEach(t => t.Specialization.ToString());
            return Ok(list);
        }
        // Get therapist details by ID
        [HttpGet("{therapistId}")]
        public async Task<IActionResult> GetTherapistById([FromRoute] int therapistId)
        {
            var therapist = await _blManager._therapistManager.GetTherapistById(therapistId);
            if (therapist == null)
                return NotFound($"No therapist found with ID {therapistId}");
            return Ok(therapist);
        }
        // Register a new therapist
        [HttpPost]
        public async Task<IActionResult> RegisterNewTherapist([FromBody] BLTherapist therapist)
        {
            if (therapist == null)
                return BadRequest("Patient data is required.");

            await _blManager._therapistManager.AddTherapist(therapist);
            return Ok(new { id = therapist.TherapistId, first_name = therapist.FirstName, last_name = therapist.LastName });
        }
        // Update therapist details by ID
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTherapist([FromBody] BLTherapist therapist)
        {
            if (therapist == null)
                return BadRequest("detailes were null");
            var th = await _blManager._therapistManager.UpdateTherapist(therapist);
            return Ok(new { therapist_id = th.TherapistId, first_name = th.FirstName, last_name = th.LastName, Specializion = th.Specialization.ToString(), message = "Therapist  updeted" });

        }
        // Cancel a specific work day
        [HttpDelete("{id}/cancel-day")]
        public async Task<IActionResult> CancelWorkDay(int id, [FromQuery] DateTime date)
        {
            if (id <= 0)
                return BadRequest("Invalid therapist ID.");

            var dateOnly = DateOnly.FromDateTime(date);

            var result = await _blManager._appointmentsManager.DeleteAppointmentForTherapistAndDate(id, dateOnly);

            if (!result)
                return NotFound($"No appointments found for therapist {id} on {dateOnly}.");

            return Ok(new { therapist_id = id, date = dateOnly, message = "All appointments for the day have been canceled." });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BLPatient>> DeleteTherapist([FromRoute] int therapistId)
        {
            if (therapistId <= 0)
                return BadRequest("Invalid ID");

            var delTherapist = await _blManager._therapistManager.DeleteTherapist(therapistId);
            if (delTherapist == null)
                return NotFound($"No patient found with ID {therapistId}");

            return Ok(new { therapist_id = therapistId, first_name = delTherapist.FirstName, last_name = delTherapist.LastName, message = "Therapist  deleted" });
        }
        // Update the regular schedule of a therapist
        
        [HttpPut("{id}/schedule")]
        public async Task<IActionResult> UpdateRegularSchedule(int id, [FromBody] List<BLWorkHour> schedule)
        {
            if (id <= 0)
                return BadRequest("Invalid therapist ID.");

            if (schedule == null || schedule.Count == 0)
                return BadRequest("Schedule data is required.");

            List<BLWorkHour> updatedSchedule = new();

            foreach (var workHour in schedule)
            {
                // Ensure the work hour is for the correct therapist
                workHour.TherapistId = id;
                var result = await _blManager._therapistManager.UpdateWorkHours(workHour);
                if (result != null)
                    updatedSchedule.AddRange(result);
            }

            if (updatedSchedule.Count == 0)
                return NotFound("No work hours were updated.");

            return Ok(new { therapist_id = id, updated_schedule = updatedSchedule });
        }
        //// Add work hours for a specific day
        [HttpPost("{id}/add-work-hours")]
        public async Task<IActionResult> AddWorkHours(int id, [FromBody] BLWorkHour hours)
        {
            if (id <= 0)
                return BadRequest("Invalid therapist ID.");

            if (hours == null)
                return BadRequest("Work hour data is required.");

            hours.TherapistId = id;

            var addedWorkHour = await _blManager._therapistManager.AddWorkDay(hours);
            if (addedWorkHour == null)
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to add work hours.");

            return Ok(new
            {
                therapist_id = id,
                work_hour = addedWorkHour,
                message = "Work hour added successfully."
            });
        }

        [HttpDelete("{id}/remove-work-hours")]
        public async Task<IActionResult> RemoveWorkHours(int id, [FromBody] BLWorkHour hours)
        {
            if (id <= 0)
                return BadRequest("Invalid therapist ID.");

            if (hours == null || string.IsNullOrWhiteSpace(hours.DayOfWeek))
                return BadRequest("Day of week is required to remove work hours.");

            // Remove all work hours for the therapist on the specified day
            var removedWorkHours = await _blManager._therapistManager.DeleteWorkDay(id, hours.DayOfWeek);

            if (removedWorkHours == null || removedWorkHours.Count == 0)
                return NotFound($"No work hours found for therapist {id} on {hours.DayOfWeek}.");

            return Ok(new
            {
                therapist_id = id,
                removed_work_hours = removedWorkHours,
                message = $"Work hours for {hours.DayOfWeek} removed successfully."
            });
        }

    }
}

