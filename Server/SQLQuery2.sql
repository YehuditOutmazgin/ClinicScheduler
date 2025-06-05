UPDATE AvailableAppointments
SET Specialization = CASE Specialization
    WHEN 1 THEN 'SpeechTherapy'
    WHEN 2 THEN 'OccupationalTherapy'
    WHEN 3 THEN 'PhysicalTherapy'
    WHEN 4 THEN 'Psychology'
    WHEN 5 THEN 'SocialWork'
    WHEN 6 THEN 'BehavioralTherapy'
    WHEN 7 THEN 'EducationalTherapy'
    ELSE CAST(Specialization AS NVARCHAR(50))
END;
