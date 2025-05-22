using DAL.Common;
using System;
using System.Collections.Generic;

namespace BL.Models;

public partial class BLAvailableAppointment
{
    public int AppointmentId { get; set; }

    public int TherapistId { get; set; }

    public DateOnly AppointmentDate { get; set; }

    public TimeOnly Time { get; set; }

    public int DurationMinutes { get; set; }

    public Specialization Specialization { get; set; }

    public virtual BLTherapist Therapist { get; set; } = null!;
}
