using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class AppointmentsPassed
{
    public int AppointmentId { get; set; }

    public int PatientId { get; set; }

    public int TherapistId { get; set; }

    public DateOnly AppointmentDate { get; set; }

    public TimeOnly AppointmentTime { get; set; }

    public string? Status { get; set; }

    public virtual Patient Patient { get; set; } = null!;

    public virtual Therapist Therapist { get; set; } = null!;
}
