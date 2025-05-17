using BL;
using BL.Api;
using BL.Models;
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
            return await _therapistManager.GetAllTherapists();
        }

        // GET: api/Therapists/{id}
        [HttpGet("{therapistId}")]
        public async Task<BLTherapist> GetTherapistById([FromRoute]int therapistId)
        {
            return await _therapistManager.GetTherapistById(therapistId);
        }

        // POST: api/Therapists
        [HttpPost]
        public async Task AddTherapist(BLTherapist therapist)
        {
            await _therapistManager.AddTherapist(therapist);
        }

        // PUT: api/Therapists/{id}
        [HttpPut("{id}")]
        public async Task UpdateTherapist(BLTherapist therapist)
        {
            await _therapistManager.UpdateTherapist(therapist);
        }

        // DELETE: api/Therapists/{id}
        [HttpDelete("{therapistId}")]
        public async Task DeleteTherapist([FromRoute] int therapistId)
        {
            await _therapistManager.DeleteTherapist(therapistId);
        }
    }
}
