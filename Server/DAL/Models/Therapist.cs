using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class Therapist
{
    public int Id { get; set; }

    public int TherapistId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public Specialization Specialization { get; set; }

    public string PhoneNumber { get; set; } = null!;

    public int AppointmentDuration { get; set; }

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    public virtual ICollection<AvailableAppointment> AvailableAppointments { get; set; } = new List<AvailableAppointment>();

    public virtual ICollection<CanceledAppointment> CanceledAppointments { get; set; } = new List<CanceledAppointment>();

    public virtual ICollection<PastAppointment> PastAppointments { get; set; } = new List<PastAppointment>();

    public virtual ICollection<WorkHour> WorkHours { get; set; } = new List<WorkHour>();
}
