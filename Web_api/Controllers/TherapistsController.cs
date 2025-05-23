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
    public class TherapistsController : ControllerBase
    {
        private readonly BLManager _therapistManager;
        private readonly IAppointmentsManager _appointmentsManager;
        //ctor
        public TherapistsController(BLManager therapistManager, IAppointmentsManager appointmentsManager)
        {
            _therapistManager = therapistManager;
            _appointmentsManager = appointmentsManager;
        }
        // GET: api/Therapists
        [HttpGet]
        public async Task<ActionResult<List<BLTherapist>>> GetAllTherapists()
        {
            var list =await _therapistManager.GetAllTherapists();
            if (list == null || list.Count == 0)
                return NotFound("No patients found.");
            list.ForEach(t => t.Specialization.ToString());
            return Ok(list);
        }

        // GET: api/Therapists/{id}
        [HttpGet("{therapistId}")]
        public async Task<BLTherapist> GetTherapistById([FromRoute]int therapistId)
        {
            return await _therapistManager.GetTherapistById(therapistId);
        }

        // POST: api/Therapists
        [HttpPost]
        public async Task<ActionResult<BLPatient>> AddTherapist([FromBody] BLTherapist therapist)
        {
            if (therapist == null)
                return BadRequest("Patient data is required.");

            await _therapistManager.AddTherapist(therapist);
            return Ok( new { id = therapist.TherapistId, first_name = therapist.FirstName, last_name = therapist.LastName });  
        }
        

        // PUT: api/Therapists/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<BLTherapist>> UpdateTherapist(BLTherapist therapist)
        {
            if (therapist == null)
                return BadRequest("detailes were null");
            var th = await _therapistManager.UpdateTherapist(therapist);
            return Ok(new { therapist_id = th.TherapistId, first_name = th.FirstName, last_name = th.LastName,Specializion=th.Specialization.ToString(), message = "Therapist  updeted" });

        }

        // DELETE: api/Therapists/{id}
        [HttpDelete("{therapistId}")]
        public async Task<ActionResult<BLPatient>> DeleteTherapist([FromRoute] int therapistId)
        {
            if (therapistId <= 0)
                return BadRequest("Invalid ID");

            var delTherapist = await _therapistManager.DeleteTherapist(therapistId);
            if (delTherapist == null)
                return NotFound($"No patient found with ID {therapistId}");

            return Ok(new { therapist_id = therapistId, first_name = delTherapist.FirstName, last_name = delTherapist.LastName, message = "Therapist  deleted" });
        }
    }
}
