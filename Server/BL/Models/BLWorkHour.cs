using DAL.Models;
using System;
using System.Collections.Generic;

namespace BL.Models;

public partial class BLWorkHour
{
    public int Id { get; set; }

    public int TherapistId { get; set; }

    public string DayOfWeek { get; set; } = null!;

    public TimeOnly StartTime { get; set; }

    public TimeOnly EndTime { get; set; }

    public virtual Therapist Therapist { get; set; } = null!;
}
