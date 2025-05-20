using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class Appointment : AppointmentBase
{
    public int PatientId { get; set; }

    public string? Status { get; set; }

    public virtual Patient Patient { get; set; } = null!;
}
