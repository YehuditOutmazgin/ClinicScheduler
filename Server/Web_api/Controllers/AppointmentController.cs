using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BL.Api;
using BL.Models;
using BL;
using DAL.Models;
namespace Web_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {   IAppointmentsManager _appointmentsManager;
        BLManager _bLManager;
        public AppointmentController(IAppointmentsManager appointmentsManager,BLManager bLManager)
        {
            _bLManager = bLManager;
            _appointmentsManager = appointmentsManager;
        }

        [HttpGet("GetAllAppointmentsByDateAndTherapistId")]
        public async Task<List<BLAppointment>> GetAllAppointmentsByDateAndTherapistId(int therapistId, string? date)
        {DateOnly dateOnly = DateOnly.Parse(date ?? DateTime.Now.ToString("yyyy-MM-dd"));
            var appointments = await _bLManager.GetAllAppointmentsByDateAndTherapistId(therapistId, dateOnly);
            return appointments;
        }
        [HttpGet("GetSchedualeByTherapistForWeek")]

        public async Task<IActionResult> GetSchedualeByTherapistForWeek(int therapistId, string date)
        {
            BLAvailableAppointment appo =new();
            BLAppointment appo2 =new();
            return Ok( new { Available = appo, set = appo2 });
        }

        //[HttpGet]

        //public async Task<IActionResult> a()
        //{
        //    await _appointmentsManager.SetAvailableAppointmentForPeriod();
        //    return Ok();
        //}

        #region Get
        #region available appointments
        [HttpGet("GetAvailableAppointmentsForSpecificSpecializationForWeek")]
        public async Task<ActionResult<List<BLAvailableAppointment>>> GetAvailableAppointmentsForSpecificSpecializationForWeek(string specialization, string date)
        {
            if (!DateOnly.TryParse(date, out DateOnly dateOnly))
            {
                dateOnly = DateOnly.FromDateTime(DateTime.Now);
            }

            var availapp = await _appointmentsManager.GetAvailableAppointmentsForSpecificSpecializationForWeek(specialization, dateOnly);
            if (availapp == null)
            {
                return NotFound("No available appointments found for the specified specialization and week.");
            }
            return Ok(availapp);
        }
    
    #endregion
    #endregion
    // Add other endpoints as needed
}
}
