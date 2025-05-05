using System;
using System.Collections.Generic;

namespace BL.Models;

public partial class BLPatient
{
    public int PatientId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public int Age { get; set; }

    public string PhoneNumber { get; set; } = null!;

    public virtual ICollection<BLAppointment> Appointments { get; set; } = new List<BLAppointment>();

    public virtual ICollection<BLCanceledAppointment> CanceledAppointments { get; set; } = new List<BLCanceledAppointment>();

    public virtual ICollection<BLPassedAppointment> PassedAppointments { get; set; } = new List<BLPassedAppointment>();
}
