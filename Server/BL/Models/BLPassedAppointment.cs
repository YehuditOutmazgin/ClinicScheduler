using BL.Models;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BL.Models;

public partial class BLPassedAppointment : BLAppointmentBase
{

    //public int PatientId { get; set; }

    public string? Status { get; set; }

    public virtual BLPatient Patient { get; set; } = null!;

    //public virtual Therapist Therapist { get; set; } = null!;
}
