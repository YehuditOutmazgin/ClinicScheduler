using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web_api.Models;

public partial class Patient
{
    [Key]
    [Column("PatientID")]
    public int PatientId { get; set; }

    [StringLength(50)]
    public string FirstName { get; set; } = null!;

    [StringLength(50)]
    public string LastName { get; set; } = null!;

    public int Age { get; set; }

    [StringLength(15)]
    public string PhoneNumber { get; set; } = null!;

    [InverseProperty("Patient")]
    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    [InverseProperty("Patient")]
    public virtual ICollection<CanceledAppointment> CanceledAppointments { get; set; } = new List<CanceledAppointment>();

    [InverseProperty("Patient")]
    public virtual ICollection<PassedAppointment> PassedAppointments { get; set; } = new List<PassedAppointment>();
}
