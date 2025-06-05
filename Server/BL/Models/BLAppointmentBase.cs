using System.Text.Json.Serialization;

namespace BL.Models
{
    public class BLAppointmentBase
    {

        public DateOnly AppointmentDate { get; set; }
        public int AppointmentId { get; set; }

        public TimeOnly AppointmentTime { get; set; }
        public virtual BLTherapist Therapist { get; set; } = null!;

        public int TherapistId { get; set; }
    }
}