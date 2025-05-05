using System;
using System.Collections.Generic;

namespace BL.Models;

public partial class BLCanceledAppointment
{
    public int Id { get; set; }

    public int AppointmentId { get; set; }

    public int PatientId { get; set; }

    public virtual BLAppointment Appointment { get; set; } = null!;

    public virtual BLPatient Patient { get; set; } = null!;
}
