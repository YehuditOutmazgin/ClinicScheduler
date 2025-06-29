using System;
using System.Collections.Generic;
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

    public virtual DbSet<PastAppointment> PastAppointments { get; set; }

    public virtual DbSet<Patient> Patients { get; set; }

    public virtual DbSet<Therapist> Therapists { get; set; }

    public virtual DbSet<WorkHour> WorkHours { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            string projectRoot = Path.GetFullPath(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"..\..\..\..\"));
            AppDomain.CurrentDomain.SetData("DataDirectory", projectRoot);

            string connectionString = @"Data Source=(LocalDB)\MSSQLLocalDB;
                                    AttachDbFilename=|DataDirectory|\DAL\Data\ClinicDB.mdf;
                                    Integrated Security=True;
                                    Connect Timeout=30";
            optionsBuilder.UseSqlServer(connectionString);
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.HasKey(e => e.AppointmentId).HasName("PK__tmp_ms_x__8ECDFCA2922A0C43");

            entity.Property(e => e.AppointmentId)
                .ValueGeneratedNever()
                .HasColumnName("AppointmentID");
            entity.Property(e => e.AppointmentDate).HasColumnType("datetime");
            entity.Property(e => e.PatientId).HasColumnName("PatientID");
            entity.Property(e => e.Specialization)
                  .HasConversion<string>();
            entity.Property(e => e.Status)
                .HasMaxLength(15)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS");
            entity.Property(e => e.TherapistId).HasColumnName("TherapistID");
            entity.Property(e => e.TherapistName).IsUnicode(true)
                .HasMaxLength(25)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS");

            entity.HasOne(d => d.Patient).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.PatientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Appointme__Patie__35DCF99B");

            entity.HasOne(d => d.Therapist).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.TherapistId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Appointme__Thera__36D11DD4");
        });

        modelBuilder.Entity<AvailableAppointment>(entity =>
        {
            entity.HasKey(e => e.AppointmentId).HasName("PK__tmp_ms_x__8ECDFCA264EB2ED0");

            entity.Property(e => e.AppointmentId).HasColumnName("AppointmentID");
            entity.Property(e => e.AppointmentDate).HasColumnType("datetime");
            entity.Property(e => e.Specialization)
                  .HasConversion<string>();
            entity.Property(e => e.TherapistId).HasColumnName("TherapistID");
            entity.Property(e => e.TherapistName)
                .HasMaxLength(25).IsUnicode(true)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS");

            entity.HasOne(d => d.Therapist).WithMany(p => p.AvailableAppointments)
                .HasForeignKey(d => d.TherapistId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Available__Thera__1758727B");
        });

        modelBuilder.Entity<CanceledAppointment>(entity =>
        {
            entity.HasKey(e => e.AppointmentId).HasName("PK__tmp_ms_x__8ECDFCA23D326644");

            entity.Property(e => e.AppointmentId)
                .ValueGeneratedNever()
                .HasColumnName("AppointmentID");
            entity.Property(e => e.AppointmentDate).HasColumnType("datetime");
            entity.Property(e => e.Note).UseCollation("SQL_Latin1_General_CP1_CI_AS");
            entity.Property(e => e.PatientId).HasColumnName("PatientID");
            entity.Property(e => e.Specialization)
                  .HasConversion<string>();
            entity.Property(e => e.TherapistId).HasColumnName("TherapistID");
            entity.Property(e => e.TherapistName).IsUnicode(true)
                .HasMaxLength(25)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS");

            entity.HasOne(d => d.Patient).WithMany(p => p.CanceledAppointments)
                .HasForeignKey(d => d.PatientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CanceledA__Patie__37C5420D");

            entity.HasOne(d => d.Therapist).WithMany(p => p.CanceledAppointments)
                .HasForeignKey(d => d.TherapistId)
                .HasConstraintName("FK__CanceledA__Thera__38B96646");
        });

        modelBuilder.Entity<PastAppointment>(entity =>
        {
            entity.HasKey(e => e.AppointmentId).HasName("PK__tmp_ms_x__8ECDFCA2CB4685A3");

            entity.Property(e => e.AppointmentId)
                .ValueGeneratedNever()
                .HasColumnName("AppointmentID");
            entity.Property(e => e.AppointmentDate).HasColumnType("datetime");
            entity.Property(e => e.PatientId).HasColumnName("PatientID");
            entity.Property(e => e.Specialization)
                  .HasConversion<string>();
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS");
            entity.Property(e => e.TherapistId).HasColumnName("TherapistID");
            entity.Property(e => e.TherapistName).IsUnicode(true)
                .HasMaxLength(25)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS");

            entity.HasOne(d => d.Patient).WithMany(p => p.PastAppointments)
                .HasForeignKey(d => d.PatientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PastAppoi__Patie__3D7E1B63");

            entity.HasOne(d => d.Therapist).WithMany(p => p.PastAppointments)
                .HasForeignKey(d => d.TherapistId)
                .HasConstraintName("FK__PastAppoi__Thera__3E723F9C");
        });

        modelBuilder.Entity<Patient>(entity =>
        {
            entity.HasKey(e => e.PatientId).HasName("PK__tmp_ms_x__970EC346B6A4BD0C");

            entity.Property(e => e.PatientId)
                .ValueGeneratedNever()
                .HasColumnName("PatientID");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50).IsUnicode(true)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS");
            entity.Property(e => e.LastName)
                .HasMaxLength(50).IsUnicode(true)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(true)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS");
        });

        modelBuilder.Entity<Therapist>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tmp_ms_x__3214EC2718E11720");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.FirstName).IsUnicode(true)
                .HasMaxLength(50)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS");
            entity.Property(e => e.LastName).IsUnicode(true)
                .HasMaxLength(50)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(true)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS");
            entity.Property(e => e.Specialization)
                  .HasConversion<string>();
            entity.Property(e => e.TherapistId).HasColumnName("TherapistID");
        });

        modelBuilder.Entity<WorkHour>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tmp_ms_x__3214EC07412110F6");

            entity.Property(e => e.DayOfWeek)
                .HasMaxLength(20)
                .UseCollation("SQL_Latin1_General_CP1_CI_AS");
            entity.Property(e => e.TherapistId).HasColumnName("TherapistID");

            entity.HasOne(d => d.Therapist).WithMany(p => p.WorkHours)
                .HasForeignKey(d => d.TherapistId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__WorkHours__Thera__5D2BD0E6");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
