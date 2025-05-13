using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Api;
using BL.Models;
using BL.Services;
namespace BL
{
    public class BLManager
    {
        private readonly IAppointmentsManager _appointmentsManager;
        private readonly IPatientsManager _patientsManager;
        private readonly ITherapistManager _therapistManager;
        public BLManager(IAppointmentsManager appointmentsManager, IPatientsManager patientsManager, ITherapistManager therapistManager)
        {
            _appointmentsManager = appointmentsManager;
            _therapistManager = therapistManager;
            _patientsManager = patientsManager;
        }

        //patient


            // Patient-related methods
            public async Task<List<BLPatient>> GetAllPatients()
            {
                return await _patientsManager.GetAllPatients();
            }

            public async Task<BLPatient> GetPatientById(int patientId)
            {
                return await _patientsManager.GetPatientById(patientId);
            }

            public async Task AddPatient(BLPatient patient)
            {
                await _patientsManager.AddPatient(patient);
            }

            public async Task DeletePatientAsync(int patientId)
            {
                await _patientsManager.DeletePatient(patientId);
            }

            public async Task UpdatePatientAsync(BLPatient patient)
            {
                await _patientsManager.UpdatePatient(patient);
            }

            // Appointment-related methods
            /// <summary>
            ///  public async Task<List<BLAppointment>> GetAllAppointmentsAsync()
            ///    {
            ///        return await _appointmentsManager.GetAllAppointments();
            ///}

            ///public async Task<BLAppointment> GetAppointmentByIdAsync(int appointmentId)
            ///{
            ///    return await _appointmentsManager.GetAppointmentById(appointmentId);
            ///}

            ///public async Task AddAppointmentAsync(BLAppointment appointment)
            ///{
            ///   await _appointmentsManager.AddAppointment(appointment);
            ///}

            ///public async Task CancelAppointmentAsync(int appointmentId)
            ///{
            ///    await _appointmentsManager.CancelAppointment(appointmentId);
            ///}
            ///</summary>
            /// <returns></returns>

            #region Therapist
            // Therapist-related methods
            public async Task<List<BLTherapist>> GetAllTherapistsAsync()
            {
                return await _therapistManager.GetAllTherapists();
            }

            public async Task<BLTherapist> GetTherapistByIdAsync(int therapistId)
            {
                return await _therapistManager.GetTherapistById(therapistId);
            }

            public async Task AddTherapistAsync(BLTherapist therapist)
            {
                await _therapistManager.AddTherapist(therapist);
            }

            public async Task UpdateTherapistAsync(BLTherapist therapist)
            {
                await _therapistManager.UpdateTherapist(therapist);
            }

            public async Task DeleteTherapistAsync(int therapistId)
            {
                await _therapistManager.DeleteTherapist(therapistId);
            }
            #endregion
        }
    }


