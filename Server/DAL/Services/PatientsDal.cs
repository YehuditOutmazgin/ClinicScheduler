using DAL.Api;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Services
{
    public class PatientsDal:IPatientsDal
    {
        
            private readonly DB_Manager _dB_Manager;

            public PatientsDal(DB_Manager dbContext)
            {
                _dB_Manager = dbContext;
            }

            public Task AddPatient(Patient patient)
            {
                _dB_Manager.Patients.Add(patient);
                _dB_Manager.SaveChanges();
                return Task.CompletedTask;
            }

        //    public async Task<Patient> DeletePatient(int id)
        //    {
        //        var patient = await _dB_Manager.Patients.FindAsync(id);

        //        if (patient == null)
        //        {
        //            throw new Exception("Patient not found.");
        //        }

        //        var appointments = await _dB_Manager.Appointments.Include(a => a.Therapist)
        //            .Where(pa => pa.PatientId == id)
        //            .ToListAsync();
        //        if (patient.Appointments != null)
        //        {

        //            var availableAppointments = appointments.Select(a => new AvailableAppointment
        //            {
        //                AppointmentId = 0,
        //                AppointmentDate = a.AppointmentDate,
        //                TherapistId = a.TherapistId,
        //                Specialization = a.Therapist.Specialization,
        //                AppointmentTime = a.AppointmentTime,

        //            });
        //            _dB_Manager.AvailableAppointments.AddRange(availableAppointments);
        //            _dB_Manager.Appointments.RemoveRange(appointments);


        //        }
        //        var canceledAppointments = await _dB_Manager.CanceledAppointments
        //.Where(ca => ca.PatientId == id)
        //.ToListAsync();

        //        if (canceledAppointments.Any())
        //        {
        //            _dB_Manager.CanceledAppointments.RemoveRange(canceledAppointments);
        //        }
        //        if (patient.CanceledAppointments != null)
        //             _dB_Manager.CanceledAppointments.RemoveRange(patient.CanceledAppointments);


        //        _dB_Manager.Patients.Remove(patient);

        //        await _dB_Manager.SaveChangesAsync();

        //        return patient;
        //    }
        public async Task<Patient> DeletePatient(int id)
        {
            var patient = await _dB_Manager.Patients.FindAsync(id);

            if (patient == null)
            {
                return null;
            }

            var appointments = await _dB_Manager.Appointments.Include(a => a.Therapist)
                .Where(pa => pa.PatientId == id)
                .ToListAsync();

            //var appointmentIds = appointments.Select(a => a.AppointmentId).ToList();

            //var canceledAppointments = await _dB_Manager.CanceledAppointments
            //    .Where(c => appointmentIds.Contains(c.AppointmentId))
            //    .ToListAsync();

            if (appointments.Any())
            {
                // Pseudocode:
                // For each appointment being deleted, create an AvailableAppointment with all relevant fields:
                // - AppointmentDate, TherapistId, Specialization, DurationMinutes, TherapistName
                // - Set AppointmentId to 0 (or let DB auto-generate if needed)
                // - Copy DurationMinutes from Appointment
                // - Copy TherapistName from Appointment or Therapist

                var availableAppointments = appointments.Select(a => new AvailableAppointment
                {
                    AppointmentId = 0, // Let DB generate if needed
                    AppointmentDate = a.AppointmentDate,
                    TherapistId = a.TherapistId,
                    Specialization = a.Therapist.Specialization,
                    DurationMinutes = a.DurationMinutes,
                    TherapistName = a.TherapistName ?? (a.Therapist != null ? $"{a.Therapist.FirstName} {a.Therapist.LastName}" : string.Empty)
                });

                //_dB_Manager.CanceledAppointments.RemoveRange(canceledAppointments);

                // שלב 2: מחיקת הפגישות עצמן
                _dB_Manager.Appointments.RemoveRange(appointments);

                _dB_Manager.AvailableAppointments.AddRange(availableAppointments);
                await _dB_Manager.SaveChangesAsync();

            }

            var PastAppointments = await _dB_Manager.PastAppointments
                .Where(p => p.PatientId == id)
                .ToListAsync();

            _dB_Manager.PastAppointments.RemoveRange(PastAppointments);
            await _dB_Manager.SaveChangesAsync();


            var canceledAppointments = await _dB_Manager.CanceledAppointments
                .Where(p => p.PatientId == id)
                .ToListAsync();

            _dB_Manager.CanceledAppointments.RemoveRange(canceledAppointments);
            await _dB_Manager.SaveChangesAsync();


            _dB_Manager.Patients.Remove(patient);

            await _dB_Manager.SaveChangesAsync();

            return patient;
        }

        public Task<List<Patient>> GetAllPatients()
            {
                var patients = _dB_Manager.Patients.ToList();
                return Task.FromResult(patients);
            }

            public Task<List<Appointment>> GetPatientAppointments(int patientId)
            {
                var appointments = _dB_Manager.Appointments
                    .Where(a => a.PatientId == patientId).Include(a=>a.Therapist)


                    .ToList();
                return Task.FromResult(appointments);
            }

            public async Task<Patient> GetPatientById(int id)
            {
                Patient patient = await _dB_Manager.Patients.FindAsync(id);
            //if(patient==null)
            return await Task.FromResult(patient);
            }

            public Task UpdatePatient(Patient patient)
            {
                Patient existingPatient = _dB_Manager.Patients.Find(patient.PatientId);
                if (existingPatient != null)
                {
                    existingPatient.FirstName = patient.FirstName;
                    existingPatient.LastName = patient.LastName;
                    existingPatient.BirthDate = patient.BirthDate;
                    existingPatient.PhoneNumber = patient.PhoneNumber;
                    _dB_Manager.SaveChanges();
                }
                return Task.CompletedTask;
            }

        }

}
