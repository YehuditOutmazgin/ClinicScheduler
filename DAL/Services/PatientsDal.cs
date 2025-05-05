using DAL.Api;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Services
{
    internal class PatientsDal:IPatientsDal
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

            public Task DeletePatient(int id)
            {
                var patient = _dB_Manager.Patients.Find(id);
                if (patient != null)
                {
                    _dB_Manager.Patients.Remove(patient);
                    _dB_Manager.SaveChanges();
                }
                return Task.CompletedTask;
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
