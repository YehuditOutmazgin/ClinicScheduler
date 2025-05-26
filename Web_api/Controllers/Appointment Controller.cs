using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BL.Api;
using BL.Models;
namespace Web_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Appointment_Controller : ControllerBase
    {   IAppointmentsManager _appointmentsManager;

        public Appointment_Controller(IAppointmentsManager appointmentsManager)
        {
            _appointmentsManager = appointmentsManager;
        }

        [HttpGet("GetAllAppointmentsByDateAndTherapistId")]
        public async Task<List<BLAppointment>> GetAllAppointmentsByDateAndTherapistId(int therapistId, string? date)
        {DateOnly dateOnly = DateOnly.Parse(date ?? DateTime.Now.ToString("yyyy-MM-dd"));
            var appointments = await _appointmentsManager.GetAllAppointmentsByDateAndTherapistId(therapistId, dateOnly);
            return appointments;
        }
        [HttpGet("GetSchedualeByTherapistForWeek")]

        public async Task<IActionResult> GetSchedualeByTherapistForWeek(int therapistId, string date)
        {
            BLAvailableAppointment appo =new();
            BLAppointment appo2 =new();
            return Ok( new { Available = appo, set = appo2 });
        }
        // Add other endpoints as needed
    }
}
