using BL.Models;
using DAL.Common;
using System;
using System.Collections.Generic;

namespace BL.Models;

public partial class BLTherapist
{
    public int TherapistId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public Specialization Specialization { get; set; }

    public string PhoneNumber { get; set; } = null!;

    //public virtual ICollection<BLAppointment> Appointments { get; set; } = new List<BLAppointment>();

    //public virtual ICollection<BLAvailableAppointment> AvailableAppointments { get; set; } = new List<BLAvailableAppointment>();

    //public virtual ICollection<BLCanceledAppointment> CanceledAppointments { get; set; } = new List<BLCanceledAppointment>();

    //public virtual ICollection<BLPassedAppointment> PassedAppointments { get; set; } = new List<BLPassedAppointment>();

    //public virtual ICollection<BLAppointment> WorkHours { get; set; } = new List<BLAppointment>();
}
