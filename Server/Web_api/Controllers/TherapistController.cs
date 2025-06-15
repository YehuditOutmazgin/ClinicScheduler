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
        private readonly BLManager _therapistManager;
        private readonly IAppointmentsManager _appointmentsManager;
        //ctor
        public TherapistController(BLManager therapistManager, IAppointmentsManager appointmentsManager)
        {
            _therapistManager = therapistManager;
            _appointmentsManager = appointmentsManager;
        }
        // Get a list of all therapists
        [HttpGet]
        public async Task<IActionResult> GetAllTherapists()
        {
            var list = await _therapistManager.GetAllTherapists();
            if (list == null || list.Count == 0)
                return NotFound("No patients found.");
            list.ForEach(t => t.Specialization.ToString());
            return Ok(list);
        }
        // Get therapist details by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTherapistById([FromRoute] int therapistId)
        {
            return Ok(await _therapistManager.GetTherapistById(therapistId));
        }
        // Register a new therapist
        [HttpPost]
        public async Task<IActionResult> RegisterNewTherapist([FromBody] BLTherapist therapist)
        {
            if (therapist == null)
                return BadRequest("Patient data is required.");

            await _therapistManager.AddTherapist(therapist);
            return Ok(new { id = therapist.TherapistId, first_name = therapist.FirstName, last_name = therapist.LastName });
        }
        // Update therapist details by ID
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTherapist([FromBody] BLTherapist therapist)
        {
            if (therapist == null)
                return BadRequest("detailes were null");
            var th = await _therapistManager.UpdateTherapist(therapist);
            return Ok(new { therapist_id = th.TherapistId, first_name = th.FirstName, last_name = th.LastName, Specializion = th.Specialization.ToString(), message = "Therapist  updeted" });

        }
        // Cancel a specific work day
        [HttpDelete("{id}/cancel-day")]
        public async Task<IActionResult> CancelWorkDay(int id, DateTime date)
        { /* Implementation */ return Ok(); }
        ///////////why this functions not woek????????//////////////----
        [HttpDelete("{id}")]
        public async Task<ActionResult<BLPatient>> DeleteTherapist([FromRoute] int therapistId)
        {
            if (therapistId <= 0)
                return BadRequest("Invalid ID");

            var delTherapist = await _therapistManager.DeleteTherapist(therapistId);
            if (delTherapist == null)
                return NotFound($"No patient found with ID {therapistId}");

            return Ok(new { therapist_id = therapistId, first_name = delTherapist.FirstName, last_name = delTherapist.LastName, message = "Therapist  deleted" });
        }
        // Update the regular schedule of a therapist
        [HttpPut("{id}/schedule")]
        public async Task<IActionResult> UpdateRegularSchedule(int id, [FromBody] List<BLWorkHour> schedule)
        { /* Implementation */ return Ok(); }

        //// Add work hours for a specific day
        [HttpPost("{id}/add-work-hours")]
        public async Task<IActionResult> AddWorkHours(int id, [FromBody] BLWorkHour hours) 
        { /* Implementation */ return Ok(); }

        //// Remove work hours for a specific day
        [HttpDelete("{id}/remove-work-hours")]
        public async Task<IActionResult> RemoveWorkHours(int id, [FromBody] BLWorkHour hours)
        { /* Implementation */ return Ok(); }
        //////////////////////////////////////////////////----



    }
    //// GET: api/Therapists
    //[HttpGet]
    //public async Task<ActionResult<List<BLTherapist>>> GetAllTherapists()


    //// GET: api/Therapists/{id}
    //[HttpGet("{therapistId}")]
    //public async Task<BLTherapist> GetTherapistById([FromRoute]int therapistId)


    //// POST: api/Therapists
    //[HttpPost]
    //public async Task<ActionResult<BLPatient>> AddTherapist


    //// PUT: api/Therapists/{id}
    //[HttpPut("{id}")]
    //public async Task<ActionResult<BLTherapist>> UpdateTherapist(BLTherapist therapist)

    //// DELETE: api/Therapists/{id}
    //[HttpDelete("{therapistId}")]

}

