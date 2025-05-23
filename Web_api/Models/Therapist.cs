using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web_api.Models;

public partial class Therapist
{
    [Key]
    [Column("TherapistID")]
    public int TherapistId { get; set; }

    [StringLength(50)]
    public string FirstName { get; set; } = null!;

    [StringLength(50)]
    public string LastName { get; set; } = null!;

    [StringLength(50)]
    public string Specialization { get; set; } = null!;

    [StringLength(10)]
    public string PhoneNumber { get; set; } = null!;

    [InverseProperty("Therapist")]
    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    [InverseProperty("Therapist")]
    public virtual ICollection<AvailableAppointment> AvailableAppointments { get; set; } = new List<AvailableAppointment>();

    [InverseProperty("Therapist")]
    public virtual ICollection<CanceledAppointment> CanceledAppointments { get; set; } = new List<CanceledAppointment>();

    [InverseProperty("Therapist")]
    public virtual ICollection<PassedAppointment> PassedAppointments { get; set; } = new List<PassedAppointment>();

    [InverseProperty("Therapist")]
    public virtual ICollection<WorkHour> WorkHours { get; set; } = new List<WorkHour>();
}
