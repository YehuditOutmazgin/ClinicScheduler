using AutoMapper;
using BL.Api;
using BL.Models;
using DAL.Api;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace BL.Services
{
    public class AppointmentManager : IAppointmentsManager
    {
        IAppointmentsDal _appointmentsDal;
        IAvailableAppointmentsDal _availableAppointmentsDal;
        IPassedAppointmentsDal _passedAppointmentsDal;
        ICanceledAppointmentsDal _canceledAppointmentsDal;
        IPatientsDal _patientsDal;
        IMapper _mapper;///
        public AppointmentManager(IMapper mapper, IAppointmentsDal appointmentsDal, IAvailableAppointmentsDal availableAppointmentsDal, IPassedAppointmentsDal passedAppointmentsDal, ICanceledAppointmentsDal canceledAppointmentsDal)
        {
            _appointmentsDal = appointmentsDal;
            _availableAppointmentsDal = availableAppointmentsDal;
            _passedAppointmentsDal = passedAppointmentsDal;
            _canceledAppointmentsDal = canceledAppointmentsDal;
            _mapper = mapper;
        }
        public async Task<BLAppointment> DeleteAppointmentByPatientId(int patientId, int appointmentId)
        {//we neeed to use with the patient id? think about it.
            Appointment appointment = await _appointmentsDal.DeleteAppointment(appointmentId);
            if (appointment == null)
                throw new NullReferenceException(nameof(appointment));
            return await Task.FromResult(_mapper.Map<BLAppointment>(appointment));
        }

        public async Task<bool> DeleteAppointmentForDate(DateOnly date, string? reason = null)
        {
            List<Appointment> app = await _appointmentsDal.GetAppointmentsByDate(date);
            //List<BLAppointment> appointments = _mapper.Map<List<BLAppointment>>(await _appointmentsDal.DeleteAppointmentsByDate(date));
            //if (appointments == null)
            //return false;
            foreach (var appointment in app)
            {
                appointment.Status = "cancel";

                await _canceledAppointmentsDal.AddCanceledAppointment(new CanceledAppointment()
                {
                    AppointmentId = appointment.AppointmentId,
                    PatientId = appointment.PatientId,
                    Note = reason
                });
            }
            return true;
        }


        public async Task<bool> DeleteAppointmentForTherapistAndAppointmentId(int therapistId, DateOnly date)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DeleteAppointmentForTherapistAndDate(int therapistId, DateOnly date)
        {
            throw new NotImplementedException();
        }

        public async Task<BLAvailableAppointment> DeleteAvailableAppointment(int appointmentId)
        {
            throw new NotImplementedException();
        }

        public async Task<BLCanceledAppointment> DeleteCanceleAppointment(int appointmentId)
        {
            throw new NotImplementedException();
        }

        public bool DeleteOldPassedAppointment()
        {
            throw new NotImplementedException();
        }

        public async Task<List<BLAppointment>> GetAllAppointments()
        {
            return _mapper.Map<List<BLAppointment>>(await _appointmentsDal.GetAllAppointments());
        }
        public async Task<List<BLAppointment>> GetAllAppointmentsSet()
        {
            return _mapper.Map<List<BLAppointment>>(await _appointmentsDal.GetAllAppointmentsSet());
        }
        public async Task<List<BLAppointment>> GetAllAppointmentsCanceled()
        {
            return _mapper.Map<List<BLAppointment>>(await _appointmentsDal.GetAllAppointmentsCanceled());
        }

        public async Task<List<BLAppointment>> GetAllAppointmentsByDate(DateOnly? date)
        {
            return _mapper.Map<List<BLAppointment>>(await _appointmentsDal.GetAppointmentsByDate(date ?? DateOnly.FromDateTime(DateTime.Now)));
        }

        public async Task<List<BLAppointment>> GetAllAppointmentsByDateAndTherapistId(int therapistId, DateOnly? date)
        {
            return _mapper.Map<List<BLAppointment>>(await _appointmentsDal.GetAppointmentsByTherapistIdAndDate(therapistId, date ?? DateOnly.FromDateTime(DateTime.Now)));
        }

        public async Task<List<BLAppointment>> GetAllAppointmentsByPatientId(int therapistId, DateOnly date, int patientId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<BLAppointment>> GetAllAppointmentsByPatientIdAndTherapistId(int patientId, int therapistId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<BLAvailableAppointment>> GetAvailableAppointmentsForSpecificSpecializationForWeek(string specialization, DateOnly date)
        {
            throw new NotImplementedException();
        }

        public async Task<List<BLAvailableAppointment>> GetAvailableAppointmentsForSpecificTherapistForWeek(int therapistId, DateOnly date)
        {
            throw new NotImplementedException();
        }

        public async Task<List<BLAppointment>> GetCanceleAppointmentsByDate(int therapistId, DateOnly date)
        {
            throw new NotImplementedException();
        }

        public async Task<List<BLAppointment>> GetCanceleAppointmentsByPatientId(int patientId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<BLAppointment>> GetCanceleAppointmentsByTherapistIdAndDate(int therapistId, DateOnly date)
        {
            throw new NotImplementedException();
        }

        public async Task<List<BLAppointment>> GetPassedAppointmentsByPatientId(int patientId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<BLAppointment>> GetPassedAppointmentsByPatientIdAndTherapistId(int patientId, int therapistId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<BLAppointment>> GetPassedAppointmentsByTherapistAndDate(int therapistId, DateOnly date)
        {
            throw new NotImplementedException();
        }

        public async Task<BLAppointment> SetAppointment(int availAppointmentId)
        {
            throw new NotImplementedException();
        }

        public async Task<BLAvailableAppointment> SetAvailableAppointment(BLAvailableAppointment availableAppointment)
        {
            throw new NotImplementedException();
        }

        public async Task<BLAvailableAppointment> SetAvailableAppointmentForPeriod(BLAvailableAppointment availableAppointment)
        {
            throw new NotImplementedException();
        }

        public async Task<List<BLPassedAppointment>> SetPassedAppointments()
        {
            throw new NotImplementedException();
        }
    }
}