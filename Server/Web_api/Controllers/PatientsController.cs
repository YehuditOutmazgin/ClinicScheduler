/////////////// NOT IN USE





//using BL;
//using BL.Api;
//using BL.Models;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace Web_api.Controllers
//{

//    [Route("api/[controller]")]
//    [ApiController]
//    public class PatientsController : ControllerBase
//    {

//        private readonly BLManager _patientsManager;
//        private readonly IAppointmentsManager _appointmentsManager;

//        public PatientsController(BLManager patientsManager,IAppointmentsManager appointmentsManager)
//        {
//            _patientsManager = patientsManager;
//            _appointmentsManager = appointmentsManager;
//        }

//        // GET: api/Patient
//        [HttpGet]
//        public async Task<ActionResult<List<BLPatient>>> GetAllPatients()


//        //[HttpGet("appointment")]
//        //public async Task<ActionResult<List<BLAppointment>>> GetAllAppointment()
//        //{
//        //    var appointment = await _appointmentsManager.GetAllAppointments();
//        //    if (appointment == null || appointment.Count == 0)
//        //        return NotFound("No patients found.");

//        //    return Ok(appointment);
//        //}
//        // GET: api/Patient/{id}
//        // [HttpGet("{id}")]
//        // public async Task<ActionResult<BLPatient>> GetPatientById(int id)


//        // // POST: api/Patient
//        // [HttpPost("Add patient")]
//        // public async Task<ActionResult> AddPatient([FromBody] BLPatient patient)


//        // // DELETE: api/Patient/{id}
//        // [HttpDelete("{id}")]
//        // public async Task<ActionResult<BLPatient>> DeletePatient([FromRoute] int id)

//        // // PUT: api/Patient/{id}
//        // [HttpPut("{id}")]
//        // public async Task<ActionResult> UpdatePatient(int id, [FromBody] BLPatient patient)

//    }
//}

