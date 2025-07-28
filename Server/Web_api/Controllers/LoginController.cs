using BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BL.Models;
namespace Web_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        private readonly BLManager _blManager;
        private readonly IConfiguration _configuration;

        public LoginController(BLManager blManager, IConfiguration configuration)
        {
            _blManager = blManager;
            _configuration = configuration;
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
        public IActionResult Login([FromRoute] int id, [FromQuery] string pass)
        {
            // נסיון התחברות כתרפיסט
            var therapist = _blManager._therapistManager.GetTherapistById(id);
            if (therapist.Result != null && therapist.Result.PhoneNumber == pass)
            {
                return Ok(new { role = "therapist", data = therapist });
            }

            // נסיון התחברות כמטופל
            var client = _blManager._patientsManager.GetPatientById(id);
            if (client.Result != null && client.Result.BirthDate.Year.ToString() == pass)
            {
                return Ok(new { role = "patient", data = client });
            }

            // נסיון התחברות כמזכירה מהקונפיג
            string secId = _configuration["Secretary:IdNumber"];
            string secPass = _configuration["Secretary:Password"];

            if (secId == id.ToString() && secPass == pass.ToString())
            {
                return Ok(new
                {
                    role = "secretary",
                    data = new
                    {
                        firstName = _configuration["Secretary:FirstName"],
                        lastName = _configuration["Secretary:LastName"]
                    }
                });
            }

            return NotFound("User not found");
        }

    }
}


