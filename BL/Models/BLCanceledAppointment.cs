using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BL.Models;

public partial class BLCanceledAppointment:BLAppointmentBase
{

    //public int PatientId { get; set; }



    public string? Note { get; set; }
    public virtual BLPatient Patient { get; set; } = null!;

}
