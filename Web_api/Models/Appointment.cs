using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web_api.Models;

public partial class Appointment
{
    [Key]
    [Column("AppointmentID")]
    public int AppointmentId { get; set; }

    [Column("PatientID")]
    public int PatientId { get; set; }

    [Column("TherapistID")]
    public int TherapistId { get; set; }

    public DateOnly AppointmentDate { get; set; }

    public TimeOnly AppointmentTime { get; set; }

    [StringLength(15)]
    public string? Status { get; set; }

    [ForeignKey("PatientId")]
    [InverseProperty("Appointments")]
    public virtual Patient Patient { get; set; } = null!;

    [ForeignKey("TherapistId")]
    [InverseProperty("Appointments")]
    public virtual Therapist Therapist { get; set; } = null!;
}
