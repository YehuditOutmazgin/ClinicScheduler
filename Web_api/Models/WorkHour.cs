using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Web_api.Models;

public partial class WorkHour
{
    [Key]
    public int Id { get; set; }

    [Column("TherapistID")]
    public int TherapistId { get; set; }

    [StringLength(20)]
    public string DayOfWeek { get; set; } = null!;

    public TimeOnly StartTime { get; set; }

    public TimeOnly EndTime { get; set; }

    [ForeignKey("TherapistId")]
    [InverseProperty("WorkHours")]
    public virtual Therapist Therapist { get; set; } = null!;
}
