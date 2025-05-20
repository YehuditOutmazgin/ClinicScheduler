using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace DAL.Models;

public partial class Appointment : AppointmentBase
{
    public int PatientId { get; set; }

    public string? Status { get; set; }
    [JsonIgnore]
    public virtual Patient Patient { get; set; } = null!;
}
