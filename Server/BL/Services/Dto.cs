using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{

    public class Dto
    {
        public int id { get; init; }
        public string Role { get; set; } // "patient" או "therapist"
        public string FName { get; set; }
        public string LName { get; set; }

        public string phoneNumbr { get; set; }
    }

}
