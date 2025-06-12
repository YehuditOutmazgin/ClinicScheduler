using Microsoft.AspNetCore.Mvc;
using BL.Models;
using DAL.Models;
using DAL.Api;
using BL.Api;

namespace Web_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        IPatientsManager _patientsManager;
        public PatientController(IPatientsManager patientsManager)
        {
            _patientsManager = patientsManager;
        }
        // Get a list of all patients
        [HttpGet]
        public async Task<IActionResult> GetAllPatients()
        {
            var patients = await _patientsManager.GetAllPatients();
            if (patients == null || patients.Count == 0)
                return NotFound("No patients found.");

            return Ok(patients);
        }
        // Get patient details by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPatientById(int id)
        {
            if (id <= 0)
                return BadRequest("Invalid patient ID.");

            var patient = await _patientsManager.GetPatientById(id);
            if (patient == null)
                return NotFound($"Patient with ID {id} not found.");

            return Ok(patient);
        }
        // Register a new patient
        [HttpPost]
        public async Task<IActionResult> RegisterNewPatient([FromBody] BLPatient patient)
        {
            if (patient == null)
                return BadRequest("Patient data is required.");

            await _patientsManager.AddPatient(patient);
            return CreatedAtAction(nameof(GetPatientById), new { id = patient.PatientId }, patient); // Assuming `BLPatient` has an `Id` property
        }
        // Update patient details by ID
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePatient(int id, [FromBody] BLPatient patient)
        {
            if (id <= 0 || patient == null)
                return BadRequest("Invalid patient data.");

            if (id != patient.PatientId) // Assuming `BLPatient` has an `Id` property
                return BadRequest("Patient ID mismatch.");

            await _patientsManager.UpdatePatient(patient);
            return Ok(new { patientId = id, first_name = patient.FirstName, last_name = patient.LastName });
        }
        // Delete a patient by ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient([FromRoute] int id)
        {
            if (id <= 0)
                return BadRequest("Invalid ID");

            var delPatient = await _patientsManager.DeletePatient(id);
            if (delPatient == null)
                return NotFound($"No patient found with ID {id}");

            return Ok(new { patientId = id, first_name = delPatient.FirstName, last_name = delPatient.LastName, message = "Patient deleted" });
        }













        //// צפייה בתורים העתידיים של המטופל
        //[HttpGet("appointments/upcoming")]
        //public IActionResult GetUpcomingAppointments(int patientId)
        //{

        //    // TODO: לממש את הלוגיקה
        //    return Ok();
        //}

        //// צפייה בהיסטוריית תורים של המטופל
        //[HttpGet("appointments/history")]
        //public IActionResult GetAppointmentHistory(int patientId)
        //{
        //    // TODO: לממש את הלוגיקה
        //    return Ok();
        //}

        //// קביעת תור פנוי (ניתן לספק מזהה תור פנוי)
        //[HttpPost("appointments/book")]
        //public IActionResult BookAppointment(int patientId, int appointmentId)
        //{
        //    // TODO: לממש את הלוגיקה
        //    return Ok();
        //}

        //// ביטול תור עתידי
        //[HttpPost("appointments/cancel")]
        //public IActionResult CancelAppointment(int patientId, int appointmentId)
        //{
        //    // TODO: לממש את הלוגיקה
        //    return Ok();
        //}

        //// צפייה בפרטי תור מסוים
        //[HttpGet("appointments/details")]
        //public IActionResult GetAppointmentDetails(int patientId, int appointmentId)
        //{
        //    // TODO: לממש את הלוגיקה
        //    return Ok();
        //}

        //// קבלת רשימת תורים פנויים להתמחות מסוימת
        //[HttpGet("appointments/available/by-specialty")]
        //public IActionResult GetAvailableAppointmentsBySpecialty(Specialization specialty)
        //{
        //    // TODO: לממש את הלוגיקה
        //    return Ok();
        //}

        //// קבלת רשימת תורים פנויים למטפל מסוים
        //[HttpGet("appointments/available/by-therapist")]
        //public IActionResult GetAvailableAppointmentsByTherapist(int therapistId)
        //{
        //    // TODO: לממש את הלוגיקה
        //    return Ok();
        //}

        //// קבלת תזכורות לתורים עתידיים של המטופל
        //[HttpGet("appointments/reminders")]
        //public IActionResult GetAppointmentReminders(int patientId)
        //{
        //    // TODO: לממש את הלוגיקה
        //    return Ok();
        //}

        //// עדכון פרטים אישיים של המטופל
        //[HttpPut("profile/update")]
        //public IActionResult UpdatePatientProfile(int patientId, [FromBody] object/*PatientUpdateDto*/ updateDto)
        //{
        //    // TODO: לממש את הלוגיקה
        //    return Ok();
        //}
    }
}