using System.Text.Json.Serialization;

namespace DAL.Models
{
    public class AppointmentBase
    {

        public DateOnly AppointmentDate { get; set; }
        public int AppointmentId { get; set; }

        public TimeOnly AppointmentTime { get; set; }
        [JsonIgnore]
        public virtual Therapist Therapist { get; set; } = null!;

        public int TherapistId { get; set; }
    }
}