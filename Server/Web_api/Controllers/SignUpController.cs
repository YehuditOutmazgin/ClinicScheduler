using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BL;
using BL.Services;
using BL.Models;
namespace Web_api.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class SignUpController : ControllerBase
	{

		private readonly BLManager _bLManager;

		public SignUpController(BLManager bLManager)
		{
			_bLManager = bLManager;
		}

		[HttpPost()]
		public async Task<IActionResult> SignUp([FromBody] Dto dto)
		{
				if (dto == null)
					return BadRequest();

				if (dto.Role == "patient")
				{
					var bLPatient = new BLPatient { FirstName=dto.FName,LastName=dto.LName,PatientId=dto.id,PhoneNumber=dto.phoneNumbr};
					await _bLManager.AddPatient(bLPatient);
				   
					return Ok();
				}
				else if (dto.Role == "therapist")
				{
					var blTherapist = new BLTherapist { FirstName = dto.FName, LastName = dto.LName, TherapistId = dto.id, PhoneNumber = dto.phoneNumbr };
					 await _bLManager.AddTherapist(blTherapist);
	
					return Ok(User);
				}
				return BadRequest("Unknown role");
			}
		}
}
