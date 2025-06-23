using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Exeptions
{

    public class BLException : Exception
    {
        private static readonly string e = "Error in BL layer. ";
        public BLException() : base(e) { }
        public BLException(string message) : base(e + message) { }
        public BLException(string message, Exception innerException) : base(e + message, innerException) { }
    }

    public class InvalidBLOperationException : BLException
    {
        private static readonly string e = "Invalid BL Operation Exception. ";
        public InvalidBLOperationException() : base(e) { }
        public InvalidBLOperationException(string message) : base(e + message) { }
        public InvalidBLOperationException(string message, Exception innerException) : base(e + message, innerException) { }

    }

    public class BLNotFoundException : BLException
    {
        private static readonly string e = "Not Found Exception. ";
        public BLNotFoundException() : base(e) { }
        public BLNotFoundException(string message) : base(e + message) { }
        public BLNotFoundException(string message, Exception innerException) : base(e + message, innerException) { }

    }

    public class BLValidationException : BLException
    {
        private static readonly string e = "Validation Exception. ";
        public BLValidationException() : base(e) { }
        public BLValidationException(string message) : base(e + message) { }
        public BLValidationException(string message, Exception innerException) : base(e + message, innerException) { }
    }

    public class BLConcurrencyException : BLException
    {
        private static readonly string e = "Concurrency Exception. ";
        public BLConcurrencyException() : base(e) { }
        public BLConcurrencyException(string message) : base(e + message) { }
        public BLConcurrencyException(string message, Exception innerException) : base(e + message, innerException) { }
    }

    public class BLAuthorizationException : BLException
    {
        private static readonly string e = "Authorization Exception. ";
        public BLAuthorizationException() : base(e) { }
        public BLAuthorizationException(string message) : base(e + message) { }
        public BLAuthorizationException(string message, Exception innerException) : base(e + message, innerException) { }
    }

    public class BLDataAccessException : BLException
    {
        private static readonly string e = "Data Access Exception. ";
        public BLDataAccessException() : base(e) { }
        public BLDataAccessException(string message) : base(e + message) { }
        public BLDataAccessException(string message, Exception innerException) : base(e + message, innerException) { }
    }

    public class BLRuntimeException : BLException
    {
        private static readonly string e = "Runtime Exception. ";
        public BLRuntimeException() : base(e) { }
        public BLRuntimeException(string message) : base(e + message) { }
        public BLRuntimeException(string message, Exception innerException) : base(e + message, innerException) { }
    }

    public class BLDependencyException : BLException
    {
        private static readonly string e = "Dependency Exception. ";
        public BLDependencyException() : base(e) { }
        public BLDependencyException(string message) : base(e + message) { }
        public BLDependencyException(string message, Exception innerException) : base(e + message, innerException) { }
    }

    public class BLTimeoutException : BLException
    {
        private static readonly string e = "Timeout Exception. ";
        public BLTimeoutException() : base(e) { }
        public BLTimeoutException(string message) : base(e + message) { }
        public BLTimeoutException(string message, Exception innerException) : base(e + message, innerException) { }
    }

    public class BLKeyNotFoundException : BLException
    {
        private static readonly string e = "Key Not Found Exception. ";
        public BLKeyNotFoundException() : base(e) { }
        public BLKeyNotFoundException(string message) : base(e + message) { }
        public BLKeyNotFoundException(string message, Exception innerException) : base(e + message, innerException) { }
    }

}


