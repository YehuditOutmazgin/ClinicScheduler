using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Exeptions
{
    using System;

    namespace Exceptions
    {

        public class DALException : Exception
        {
            private static readonly string e = "Error in DAL layer. ";
            public DALException() : base(e) { }
            public DALException(string message) : base(e + message) { }
            public DALException(string message, Exception innerException) : base(e + message, innerException) { }
        }

        public class DALNotFoundException : DALException
        {
            private static readonly string e = "Not Found Exception. ";
            public DALNotFoundException() : base(e) { }
            public DALNotFoundException(string message) : base(e + message) { }
        }

        public class DALValidationException : DALException
        {
            private static readonly string e = "Validation Exception. ";
            public DALValidationException() : base(e) { }
            public DALValidationException(string message) : base(e + message) { }
        }

        public class DALConcurrencyException : DALException
        {
            private static readonly string e = "Concurrency Exception. ";
            public DALConcurrencyException() : base(e) { }
            public DALConcurrencyException(string message) : base(e + message) { }
        }

        public class DALAuthorizationException : DALException
        {
            private static readonly string e = "Authorization Exception. ";
            public DALAuthorizationException() : base(e) { }
            public DALAuthorizationException(string message) : base(e + message) { }
        }

        public class DALDataAccessException : DALException
        {
            private static readonly string e = "Data Access Exception. ";
            public DALDataAccessException() : base(e) { }
            public DALDataAccessException(string message) : base(e + message) { }
        }

        public class DALRuntimeException : DALException
        {
            private static readonly string e = "Runtime Exception. ";
            public DALRuntimeException() : base(e) { }
            public DALRuntimeException(string message) : base(e + message) { }
        }

        public class DALDependencyException : DALException
        {
            private static readonly string e = "Dependency Exception. ";
            public DALDependencyException() : base(e) { }
            public DALDependencyException(string message) : base(e + message) { }
        }

        public class DALTimeoutException : DALException
        {
            private static readonly string e = "Timeout Exception. ";
            public DALTimeoutException() : base(e) { }
            public DALTimeoutException(string message) : base(e + message) { }
        }

        public class DALKeyNotFoundException : DALException
        {
            private static readonly string e = "Key Not Found Exception. ";
            public DALKeyNotFoundException() : base(e) { }
            public DALKeyNotFoundException(string message) : base(e + message) { }
        }
    }
}

