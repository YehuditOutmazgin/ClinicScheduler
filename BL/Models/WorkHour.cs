using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class WorkHour
{
    public int Id { get; set; }

    public int TherapistId { get; set; }

    public string DayOfWeek { get; set; } = null!;

    public TimeOnly StartTime { get; set; }

    public TimeOnly EndTime { get; set; }

    public virtual Therapist Therapist { get; set; } = null!;
}
