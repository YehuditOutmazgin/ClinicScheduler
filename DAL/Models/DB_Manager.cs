using System;
using System.Collections.Generic;
using DAL.Common;
using Microsoft.EntityFrameworkCore;

namespace DAL.Models;

public partial class DB_Manager : DbContext
{
    public DB_Manager()
    {
    }

    public DB_Manager(DbContextOptions<DB_Manager> options)
        : base(options)
    {
    }

    public virtual DbSet<Appointment> Appointments { get; set; }

    public virtual DbSet<AvailableAppointment> AvailableAppointments { get; set; }

    public virtual DbSet<CanceledAppointment> CanceledAppointments { get; set; }

    public virtual DbSet<PassedAppointment> PassedAppointments { get; set; }

    public virtual DbSet<Patient> Patients { get; set; }

    public virtual DbSet<Therapist> Therapists { get; set; }

    public virtual DbSet<WorkHour> WorkHours { get; set; }



    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            string fullPath = @"C:\Tzip_project\ClinicScheduler\DAL\Data\ClinicDB.mdf";

            string connectionString = $@"Data Source=(LocalDB)\MSSQLLocalDB;
                                 AttachDbFilename={fullPath};
                                 Integrated Security=True;
                                 Connect Timeout=30";

            optionsBuilder.UseSqlServer(connectionString);
        }
    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.HasKey(e => e.AppointmentId).HasName("PK__tmp_ms_x__8ECDFCA29761D564");

            entity.Property(e => e.AppointmentId).HasColumnName("AppointmentID");
            entity.Property(e => e.PatientId).HasColumnName("PatientID");
            entity.Property(e => e.Status)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.TherapistId).HasColumnName("TherapistID");

            entity.HasOne(d => d.Patient).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.PatientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Appointme__Patie__51300E55");

            entity.HasOne(d => d.Therapist).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.TherapistId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Appointme__Thera__68D28DBC");
  
        });

        modelBuilder.Entity<AvailableAppointment>(entity =>
        {
            entity.Property(e => e.Specialization)
      .HasConversion<string>();
            entity.HasKey(e => e.AppointmentId).HasName("PK__tmp_ms_x__8ECDFCA26860CDA0");

            entity.Property(e => e.AppointmentId).HasColumnName("AppointmentID");
            entity.Property(e => e.TherapistId).HasColumnName("TherapistID");

            entity.HasOne(d => d.Therapist).WithMany(p => p.AvailableAppointments)
                .HasForeignKey(d => d.TherapistId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Available__Thera__7AF13DF7");
        });

        modelBuilder.Entity<CanceledAppointment>(entity =>
        {
            entity.HasKey(e => e.AppointmentId).HasName("PK__tmp_ms_x__8ECDFCA2BD27A4BF");

            entity.Property(e => e.AppointmentId)
                .ValueGeneratedNever()
                .HasColumnName("AppointmentID");
            entity.Property(e => e.Note).HasColumnType("text");
            entity.Property(e => e.PatientId).HasColumnName("PatientID");
            entity.Property(e => e.TherapistId).HasColumnName("TherapistID");

            entity.HasOne(d => d.Patient).WithMany(p => p.CanceledAppointments)
                .HasForeignKey(d => d.PatientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CanceledA__Patie__5C6CB6D7");

            entity.HasOne(d => d.Therapist).WithMany(p => p.CanceledAppointments)
                .HasForeignKey(d => d.TherapistId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CanceledA__Thera__69C6B1F5");
        });

        modelBuilder.Entity<PassedAppointment>(entity =>
        {
            entity.HasKey(e => e.AppointmentId).HasName("PK__tmp_ms_x__8ECDFCA2306CC965");

            entity.Property(e => e.AppointmentId)
                .ValueGeneratedNever()
                .HasColumnName("AppointmentID");
            entity.Property(e => e.PatientId).HasColumnName("PatientID");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.TherapistId).HasColumnName("TherapistID");

            entity.HasOne(d => d.Patient).WithMany(p => p.PassedAppointments)
                .HasForeignKey(d => d.PatientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PassedApp__Patie__640DD89F");

            entity.HasOne(d => d.Therapist).WithMany(p => p.PassedAppointments)
                .HasForeignKey(d => d.TherapistId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PassedApp__Thera__6501FCD8");
        });

        modelBuilder.Entity<Patient>(entity =>
        {
            entity.HasKey(e => e.PatientId).HasName("PK__Patients__970EC34695D48E27");

            entity.Property(e => e.PatientId).HasColumnName("PatientID");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(15)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Therapist>(entity =>
        {
            entity.Property(t => t.Specialization)
            .HasConversion(
                v => v.ToString(),                    // מ־enum למחרוזת ב־DB
                v => (Specialization)Enum.Parse(typeof(Specialization), v));

            entity.HasKey(e => e.TherapistId).HasName("PK__tmp_ms_x__4D621912942A1C8E");

            entity.Property(e => e.TherapistId).HasColumnName("TherapistID");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(10)
                .IsFixedLength();
        });

        modelBuilder.Entity<WorkHour>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tmp_ms_x__3214EC07412110F6");

            entity.Property(e => e.DayOfWeek)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.TherapistId).HasColumnName("TherapistID");

            entity.HasOne(d => d.Therapist).WithMany(p => p.WorkHours)
                .HasForeignKey(d => d.TherapistId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__WorkHours__Thera__65F62111");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
