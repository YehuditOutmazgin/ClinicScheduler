using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Exeptions;
using System.Diagnostics.Eventing.Reader;
namespace Web_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ErrorsHendlerController : ControllerBase
    {
        private readonly ILogger _logger;
        public ErrorsHendlerController(ILogger<ErrorsHendlerController> logger)
        {
            _logger = logger;
        }
        [HttpGet("/error")]
        [HttpDelete("/error")]
        [HttpPost("/error")]
        [HttpPut("/error")]

        public IActionResult HandleError()
        {
            var exceptionDetails = HttpContext.Features.Get<IExceptionHandlerFeature>();
            // כתיבת השגיאה ללוג
            if (exceptionDetails != null)
            {
                _logger.LogError(exceptionDetails.Error.Message, "error was throwed");
                _logger.LogDebug(exceptionDetails.Error, "");
            }
            if (exceptionDetails?.Error is DALException DALEx)
            {
                _logger.LogWarning("The user send number ont of range.");
                return Problem(
                detail: exceptionDetails?.Error.Message,
                title: "The Number is out of range"
                ); 

            }
            if (exceptionDetails?.Error is NullReferenceException)
            {
                return Problem(
                detail: "Please connet the owner of the website 59869083450",
                title: "An error occurred",
                statusCode: 777
                );
            }
            if (exceptionDetails?.Error is Exception)
            {
                return Problem(
                detail: $"Please check the data you entered. exception details: \n{exceptionDetails.ToString()}",
                title: "An error occurred",
                statusCode: 400
                );
            }
            return Problem(
                detail: "Please restart the website agein",
                title: "An error occurred",
                statusCode: 500
            );
            
        }
    }
}

