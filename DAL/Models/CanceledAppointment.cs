using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class CanceledAppointment
{
    public int Id { get; set; }

    public int AppointmentId { get; set; }

    public int PatientId { get; set; }
    public string? Note { get; set; }

    public virtual Appointment Appointment { get; set; } = null!;

    public virtual Patient Patient { get; set; } = null!;
}
