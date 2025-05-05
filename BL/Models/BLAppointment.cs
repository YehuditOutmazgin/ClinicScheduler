using System;
using System.Collections.Generic;

namespace BL.Models;

public partial class BLAppointment
{
    public int AppointmentId { get; set; }

    public int PatientId { get; set; }

    public int TherapistId { get; set; }

    public DateOnly AppointmentDate { get; set; }

    public TimeOnly AppointmentTime { get; set; }

    public virtual ICollection<CanceledAppointment> CanceledAppointments { get; set; } = new List<CanceledAppointment>();

    public virtual Patient Patient { get; set; } = null!;

    public virtual Therapist Therapist { get; set; } = null!;
}
