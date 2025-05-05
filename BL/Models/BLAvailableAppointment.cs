using System;
using System.Collections.Generic;

namespace BL.Models;

public partial class BLAvailableAppointment
{
    public int AppointmentId { get; set; }

    public int TherapistId { get; set; }

    public DateOnly AppointmentDate { get; set; }

    public TimeOnly TimeSlot { get; set; }

    public int DurationMinutes { get; set; }

    public int Specialization { get; set; }

    public virtual BLTherapist Therapist { get; set; } = null!;
}
