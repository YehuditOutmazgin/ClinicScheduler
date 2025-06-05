using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace DAL.Models;

public partial class CanceledAppointment:AppointmentBase
{
    //public int AppointmentId { get; set; }

    public int PatientId { get; set; }

    //public int TherapistId { get; set; }

    //public DateOnly AppointmentDate { get; set; }

    //public TimeOnly AppointmentTime { get; set; }

    public string? Note { get; set; }
    [JsonIgnore]
    public virtual Patient Patient { get; set; } = null!;

    //public virtual Therapist Therapist { get; set; } = null!;
}
