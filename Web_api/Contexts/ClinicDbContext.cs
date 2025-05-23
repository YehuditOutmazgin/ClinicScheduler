using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Web_api.Models;

namespace Web_api.Contexts;

public partial class ClinicDbContext : DbContext
{
    public ClinicDbContext()
    {
    }

    public ClinicDbContext(DbContextOptions<ClinicDbContext> options)
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
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=C:\\Tzip_project\\ClinicScheduler\\DAL\\Data\\ClinicDB.mdf;Integrated Security=True;Connect Timeout=30;Encrypt=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.HasKey(e => e.AppointmentId).HasName("PK__tmp_ms_x__8ECDFCA29761D564");

            entity.HasOne(d => d.Patient).WithMany(p => p.Appointments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Appointme__Patie__51300E55");

            entity.HasOne(d => d.Therapist).WithMany(p => p.Appointments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Appointme__Thera__68D28DBC");
        });

        modelBuilder.Entity<AvailableAppointment>(entity =>
        {
            entity.HasKey(e => e.AppointmentId).HasName("PK__tmp_ms_x__8ECDFCA26860CDA0");

            entity.HasOne(d => d.Therapist).WithMany(p => p.AvailableAppointments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Available__Thera__7AF13DF7");
        });

        modelBuilder.Entity<CanceledAppointment>(entity =>
        {
            entity.HasKey(e => e.AppointmentId).HasName("PK__tmp_ms_x__8ECDFCA2546861E7");

            entity.Property(e => e.AppointmentId).ValueGeneratedNever();

            entity.HasOne(d => d.Patient).WithMany(p => p.CanceledAppointments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CanceledA__Patie__0E04126B");

            entity.HasOne(d => d.Therapist).WithMany(p => p.CanceledAppointments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CanceledA__Thera__0EF836A4");
        });

        modelBuilder.Entity<PassedAppointment>(entity =>
        {
            entity.HasKey(e => e.AppointmentId).HasName("PK__tmp_ms_x__8ECDFCA2306CC965");

            entity.Property(e => e.AppointmentId).ValueGeneratedNever();

            entity.HasOne(d => d.Patient).WithMany(p => p.PassedAppointments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PassedApp__Patie__640DD89F");

            entity.HasOne(d => d.Therapist).WithMany(p => p.PassedAppointments)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PassedApp__Thera__6501FCD8");
        });

        modelBuilder.Entity<Patient>(entity =>
        {
            entity.HasKey(e => e.PatientId).HasName("PK__Patients__970EC34695D48E27");
        });

        modelBuilder.Entity<Therapist>(entity =>
        {
            entity.HasKey(e => e.TherapistId).HasName("PK__tmp_ms_x__4D621912942A1C8E");

            entity.Property(e => e.PhoneNumber).IsFixedLength();
        });

        modelBuilder.Entity<WorkHour>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__tmp_ms_x__3214EC07412110F6");

            entity.HasOne(d => d.Therapist).WithMany(p => p.WorkHours)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__WorkHours__Thera__65F62111");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
