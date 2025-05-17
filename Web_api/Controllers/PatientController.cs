using BL;
using BL.Api;
using BL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web_api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {

        private readonly BLManager _patientsManager;
        private readonly IAppointmentsManager _appointmentsManager;

        public PatientsController(BLManager patientsManager,IAppointmentsManager appointmentsManager)
        {
            _patientsManager = patientsManager;
            _appointmentsManager = appointmentsManager;
        }

        // GET: api/Patient
        [HttpGet]
        public async Task<ActionResult<List<BLPatient>>> GetAllPatients()
        {
            var patients = await _patientsManager.GetAllPatients();
            if (patients == null || patients.Count == 0)
                return NotFound("No patients found.");

            return Ok(patients);
        }

        //[HttpGet("appointment")]
        //public async Task<ActionResult<List<BLAppointment>>> GetAllAppointment()
        //{
        //    var appointment = await _appointmentsManager.GetAllAppointments();
        //    if (appointment == null || appointment.Count == 0)
        //        return NotFound("No patients found.");

        //    return Ok(appointment);
        //}
        // GET: api/Patient/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BLPatient>> GetPatientById(int id)
        {
            if (id <= 0)
                return BadRequest("Invalid patient ID.");

            var patient = await _patientsManager.GetPatientById(id);
            if (patient == null)
                return NotFound($"Patient with ID {id} not found.");

            return Ok(patient);
        }

        // POST: api/Patient
        [HttpPost]
        public async Task<ActionResult> AddPatient([FromBody] BLPatient patient)
        {
            if (patient == null)
                return BadRequest("Patient data is required.");

            await _patientsManager.AddPatient(patient);
            return CreatedAtAction(nameof(GetPatientById), new { id = patient.PatientId }, patient); // Assuming `BLPatient` has an `Id` property
        }

        // DELETE: api/Patient/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePatient(int id)
        {
            if (id <= 0)
                return BadRequest("Invalid patient ID.");

            await _patientsManager.DeletePatient(id);
            return NoContent();
        }

        // PUT: api/Patient/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePatient(int id, [FromBody] BLPatient patient)
        {
            if (id <= 0 || patient == null)
                return BadRequest("Invalid patient data.");

            if (id != patient.PatientId) // Assuming `BLPatient` has an `Id` property
                return BadRequest("Patient ID mismatch.");

            await _patientsManager.UpdatePatient(patient);
            return NoContent();
        }
    }
}

