using BL.Models;
using System;
using System.Collections.Generic;
using DAL.Models;
namespace BL.Models;

public partial class BLTherapist
{
    public int Id { get; set; }

    public int TherapistId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public Specialization Specialization { get; set; }

    public string PhoneNumber { get; set; } = null!;

    public int AppointmentDuration { get; set; }

    //public virtual ICollection<BLAppointment> Appointments { get; set; } = new List<BLAppointment>();

    //public virtual ICollection<BLAvailableAppointment> AvailableAppointments { get; set; } = new List<BLAvailableAppointment>();

    //public virtual ICollection<BLCanceledAppointment> CanceledAppointments { get; set; } = new List<BLCanceledAppointment>();

    //public virtual ICollection<BLPassedAppointment> PastAppointments { get; set; } = new List<BLPassedAppointment>();

    //public virtual ICollection<BLAppointment> WorkHours { get; set; } = new List<BLAppointment>();
}
