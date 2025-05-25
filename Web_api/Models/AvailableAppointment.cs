using System;
using System.Collections.Generic;

namespace Web_api.Models;

public partial class AvailableAppointment
{
    public int AppointmentId { get; set; }

    public int TherapistId { get; set; }

    public DateOnly AppointmentDate { get; set; }

    public TimeOnly AppointmentTime { get; set; }

    public int DurationMinutes { get; set; }

    public string Specialization { get; set; } = null!;

    public virtual Therapist Therapist { get; set; } = null!;
}
