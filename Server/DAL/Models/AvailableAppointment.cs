using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class AvailableAppointment
{
    public int AppointmentId { get; set; }

    public int TherapistId { get; set; }

    public string TherapistName { get; set; } = null!;

    public DateTime AppointmentDate { get; set; }

    public int DurationMinutes { get; set; }

    public Specialization Specialization { get; set; }

    public virtual Therapist Therapist { get; set; } = null!;
}
