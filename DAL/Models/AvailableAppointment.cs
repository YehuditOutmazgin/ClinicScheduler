using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class AvailableAppointment:AppointmentBase
{
    //public int AppointmentId { get; set; }

    //public int TherapistId { get; set; }

    //public DateOnly AppointmentDate { get; set; }

    //public TimeOnly AppointmentTime { get; set; }

    public int DurationMinutes { get; set; }

    public int Specialization { get; set; }

    //public virtual Therapist Therapist { get; set; } = null!;
}
