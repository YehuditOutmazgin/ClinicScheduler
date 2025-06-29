namespace DAL.Models
{
    public class AppointmentBase
    {

        public DateTime AppointmentDate { get; set; }
        public int AppointmentId { get; set; }

        public int DurationMinutes { get; set; }

        public Specialization Specialization { get; set; }

        public virtual Therapist Therapist { get; set; } = null!;

        public int TherapistId { get; set; }

        public string TherapistName { get; set; } = null!;
    }
}