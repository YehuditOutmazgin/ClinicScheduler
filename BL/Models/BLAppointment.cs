using System;
using System.Collections.Generic;

namespace BL.Models;

public partial class BLAppointment
{
    public int AppointmentId { get; set; }

    public int PatientId { get; set; }

    public int TherapistId { get; set; }

    public DateOnly AppointmentDate { get; set; }

    public  TimeOnly AppointmentTime { get; set; }
    public string? Status { get; set; }


    public virtual ICollection<BLCanceledAppointment> CanceledAppointments { get; set; } = new List<BLCanceledAppointment>();

    public virtual BLPatient Patient { get; set; } = null!;

    public virtual BLTherapist Therapist { get; set; } = null!;
}
