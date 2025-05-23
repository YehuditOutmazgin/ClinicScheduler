using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web_api.Models;

public partial class AvailableAppointment
{
    [Key]
    [Column("AppointmentID")]
    public int AppointmentId { get; set; }

    [Column("TherapistID")]
    public int TherapistId { get; set; }

    public DateOnly AppointmentDate { get; set; }

    public TimeOnly AppointmentTime { get; set; }

    public int DurationMinutes { get; set; }

    [StringLength(50)]
    public string Specialization { get; set; } = null!;

    [ForeignKey("TherapistId")]
    [InverseProperty("AvailableAppointments")]
    public virtual Therapist Therapist { get; set; } = null!;
}
