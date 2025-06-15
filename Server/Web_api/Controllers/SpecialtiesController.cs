using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BL.Models;
namespace Web_api.Controllers
// not implement it!! may be we not need it!!
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecialtiesController : ControllerBase
    {
        // Get a list of all specialties
        [HttpGet]
        public IActionResult GetAllSpecialties() { /* Implementation */ return Ok(); }

        // Add a new specialty
        [HttpPost]
        public IActionResult AddSpecialty([FromBody] Specialization specialty) { /* Implementation */ return Ok(); }

        // Update an existing specialty
        [HttpPut("{id}")]
        public IActionResult UpdateSpecialty(int id, [FromBody] Specialization specialty) { /* Implementation */ return Ok(); }

        // Get all therapists that specialize in a specific specialty
        [HttpGet("therapists/{specialty}")]
        public IActionResult GetTherapistsBySpecialty(string specialty) { /* Implementation */ return Ok(); }

        // Delete a specific specialty
        [HttpDelete("{id}")]
        public IActionResult DeleteSpecialty(int id) { /* Implementation */ return Ok(); }

        // Get appointments that need reminders
        [HttpGet("reminder-appointments")]
        public IActionResult GetReminderAppointments() { /* Implementation */ return Ok(); }

        // Get appointments that are cancelled due to therapist cancellation
        [HttpGet("cancelled-appointments")]
        public IActionResult GetCancelledAppointments() { /* Implementation */ return Ok(); }
    }
}
