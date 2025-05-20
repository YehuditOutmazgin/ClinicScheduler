using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class Therapist
{
    public int TherapistId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public int Specialization { get; set; }

    public string PhoneNumber { get; set; } = null!;

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    public virtual ICollection<AvailableAppointment> AvailableAppointments { get; set; } = new List<AvailableAppointment>();

    public virtual ICollection<CanceledAppointment> CanceledAppointments { get; set; } = new List<CanceledAppointment>();

    public virtual ICollection<PassedAppointment> PassedAppointments { get; set; } = new List<PassedAppointment>();

    public virtual ICollection<WorkHour> WorkHours { get; set; } = new List<WorkHour>();
}
