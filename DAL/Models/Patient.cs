using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class Patient
{
    public int PatientId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public int Age { get; set; }

    public string PhoneNumber { get; set; } = null!;

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    public virtual ICollection<AppointmentsPassed> AppointmentsPasseds { get; set; } = new List<AppointmentsPassed>();
}
