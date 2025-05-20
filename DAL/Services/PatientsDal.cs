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
                throw new Exception("Patient not found.");
            }

            var appointments = await _dB_Manager.Appointments.Include(a => a.Therapist)
                .Where(pa => pa.PatientId == id)
                .ToListAsync();

            if (appointments.Any())
            {
                var availableAppointments = appointments.Select(a => new AvailableAppointment
                {
                    AppointmentId = 0,
                    AppointmentDate = a.AppointmentDate,
                    TherapistId = a.TherapistId,
                    Specialization = a.Therapist.Specialization,
                    AppointmentTime = a.AppointmentTime,

                });
                var appointmentIds = appointments.Select(a => a.AppointmentId).ToList();

                var canceledAppointments = _dB_Manager.CanceledAppointments
                    .Where(c => appointmentIds.Contains(c.AppointmentId))
                    .ToList();
                var passedAppointments = _dB_Manager.PassedAppointments
                .Where(p => p.PatientId == id)
                .ToList();

                _dB_Manager.PassedAppointments.RemoveRange(passedAppointments);

                _dB_Manager.CanceledAppointments.RemoveRange(canceledAppointments);

                // שלב 2: מחיקת הפגישות עצמן
                _dB_Manager.Appointments.RemoveRange(appointments);

                _dB_Manager.AvailableAppointments.AddRange(availableAppointments);
            }
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
                    .Where(a => a.PatientId == patientId)
                    .ToList();
                return Task.FromResult(appointments);
            }

            public Task<Patient> GetPatientById(int id)
            {
                Patient patient = _dB_Manager.Patients.Find(id);
                return Task.FromResult(patient);
            }

            public Task UpdatePatient(Patient patient)
            {
                Patient existingPatient = _dB_Manager.Patients.Find(patient.PatientId);
                if (existingPatient != null)
                {
                    existingPatient.FirstName = patient.FirstName;
                    existingPatient.LastName = patient.LastName;
                    existingPatient.Age = patient.Age;
                    existingPatient.PhoneNumber = patient.PhoneNumber;
                    _dB_Manager.SaveChanges();
                }
                return Task.CompletedTask;
            }

        }

}
