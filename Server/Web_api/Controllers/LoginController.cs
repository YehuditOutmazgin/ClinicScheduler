using BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        private readonly BLManager _blManager;

        public LoginController(BLManager blManager)
        {
            _blManager = blManager;
        }

        //[HttpPost("{id}")]
        //public IActionResult Login([FromRoute] int id)
        //{
        //    var client = _blManager.GetPatientById(id);
        //    if (client != null)
        //        return Ok(new { role = "client", data = client });

        //    //var secretary = _secretaryService.FindById(id);
        //    //if (secretary != null)
        //    //    return Ok(new { role = "secretary", data = secretary });

        //    var therapist = _blManager.GetTherapistById(id);
        //    if (therapist != null)
        //        return Ok(new { role = "therapist", data = therapist });

        //    return NotFound("User not found");
        //}
        [HttpPost("{id}")]
        public IActionResult Login([FromRoute] int id)
        {
            var client = _blManager.GetPatientById(id);
            if (client != null)
                return Ok(new { role = "client", data = client });

            var therapist = _blManager._therapistManager.GetTherapistById(id);
            if (therapist != null)
                return Ok(new { role = "therapist", data = therapist });

            return NotFound("User not found");
        }
    }
}


