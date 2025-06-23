using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Exeptions
{

    public class Web_apiException : Exception
    {
        private static readonly string e = "Error in Web API layer. ";
        public Web_apiException() : base(e) { }
        public Web_apiException(string message) : base(e + message) { }
        public Web_apiException(string message, Exception innerException) : base(e + message, innerException) { }
    }

    public class WebAPIValidationException : Web_apiException
    {
        private static readonly string e = "Validation Exception. ";
        public WebAPIValidationException() : base(e) { }
        public WebAPIValidationException(string message) : base(e + message) { }
        public WebAPIValidationException(string message, Exception innerException) : base(e + message, innerException) { }

    }

    public class WebAPIAuthenticationException : Web_apiException
    {
        private static readonly string e = "Authentication Exception. ";
        public WebAPIAuthenticationException() : base(e) { }
        public WebAPIAuthenticationException(string message) : base(e + message) { }
        public WebAPIAuthenticationException(string message, Exception innerException) : base(e + message, innerException) { }

    }

    public class WebAPIAuthorizationException : Web_apiException
    {
        private static readonly string e = "Authorization Exception. ";
        public WebAPIAuthorizationException() : base(e) { }
        public WebAPIAuthorizationException(string message) : base(e + message) { }
        public WebAPIAuthorizationException(string message, Exception innerException) : base(e + message, innerException) { }
    }

    public class WebAPINotFoundException : Web_apiException
    {
        private static readonly string e = "Not Found Exception. ";
        public WebAPINotFoundException() : base(e) { }
        public WebAPINotFoundException(string message) : base(e + message) { }
        public WebAPINotFoundException(string message, Exception innerException) : base(e + message, innerException) { }
    }

    public class WebAPIConflictException : Web_apiException
    {
        private static readonly string e = "Conflict Exception. ";
        public WebAPIConflictException() : base(e) { }
        public WebAPIConflictException(string message) : base(e + message) { }
        public WebAPIConflictException(string message, Exception innerException) : base(e + message, innerException) { }
    }

    public class WebAPITimeoutException : Web_apiException
    {
        private static readonly string e = "Timeout Exception. ";
        public WebAPITimeoutException() : base(e) { }
        public WebAPITimeoutException(string message) : base(e + message) { }
        public WebAPITimeoutException(string message, Exception innerException) : base(e + message, innerException) { }
    }

    public class WebAPIServiceUnavailableException : Web_apiException
    {
        private static readonly string e = "Service Unavailable Exception. ";
        public WebAPIServiceUnavailableException() : base(e) { }
        public WebAPIServiceUnavailableException(string message) : base(e + message) { }
        public WebAPIServiceUnavailableException(string message, Exception innerException) : base(e + message, innerException) { }
    }

    public class WebAPIInternalServerErrorException : Web_apiException
    {
        private static readonly string e = "Internal Server Error Exception. ";
        public WebAPIInternalServerErrorException() : base(e) { }
        public WebAPIInternalServerErrorException(string message) : base(e + message) { }
        public WebAPIInternalServerErrorException(string message, Exception innerException) : base(e + message, innerException) { }
    }
}


