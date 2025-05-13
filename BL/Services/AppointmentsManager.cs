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
        public AppointmentManager(IAppointmentsDal appointmentsDal, IAvailableAppointmentsDal availableAppointmentsDal, IPassedAppointmentsDal passedAppointmentsDal, ICanceledAppointmentsDal canceledAppointmentsDal)
        {
            _appointmentsDal = appointmentsDal;
            _availableAppointmentsDal = availableAppointmentsDal;
            _passedAppointmentsDal = passedAppointmentsDal;
            _canceledAppointmentsDal = canceledAppointmentsDal;
        }
        public async Task<BLAppointment> DeleteAppointmentByPatientId(int patientId, int appointmentId)
        {
            Appointment appointment = await _appointmentsDal.DeleteAppointment(appointmentId);
            if (appointment == null)
                throw new NullReferenceException(nameof(appointment));
            return await Task.FromResult(_mapper.Map<BLAppointment>(appointment));
        }

        public async Task<bool> DeleteAppointmentForDate(DateOnly date,string? reason=null)
        {
            List<Appointment> app = await _appointmentsDal.GetAppointmentsByDate(date);
            //List<BLAppointment> appointments = _mapper.Map<List<BLAppointment>>(await _appointmentsDal.DeleteAppointmentsByDate(date));
            //if (appointments == null)
            //return false;
            foreach (var appointment in app)
            {
                appointment.Status="cancel";

                await _canceledAppointmentsDal.AddCanceledAppointment(new CanceledAppointment()
                {
                    AppointmentId = appointment.AppointmentId,
                    PatientId = appointment.PatientId,
                    Note= reason
                });
            }
            return true;
        }


        public Task<bool> DeleteAppointmentForTherapistAndAppointmentId(int therapistId, DateOnly date)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAppointmentForTherapistAndDate(int therapistId, DateOnly date)
        {
            throw new NotImplementedException();
        }

        public Task<BLAvailableAppointment> DeleteAvailableAppointment(int appointmentId)
        {
            throw new NotImplementedException();
        }

        public Task<BLCanceledAppointment> DeleteCanceleAppointment(int appointmentId)
        {
            throw new NotImplementedException();
        }

        public bool DeleteOldPassedAppointment()
        {
            throw new NotImplementedException();
        }

        public async Task<List<BLAppointment>> GetAllAppointments()
        {
            return _mapper.Map<List<BLAppointment>>( await _appointmentsDal.GetAllAppointments());
        }

        public Task<List<BLAppointment>> GetAllAppointmentsByDate()
        {
            throw new NotImplementedException();
        }

        public Task<List<BLAppointment>> GetAllAppointmentsByDateAndTherapistId(int therapistId, DateOnly date)
        {
            throw new NotImplementedException();
        }

        public Task<List<BLAppointment>> GetAllAppointmentsByPatientId(int therapistId, DateOnly date, int patientId)
        {
            throw new NotImplementedException();
        }

        public Task<List<BLAppointment>> GetAllAppointmentsByPatientIdAndTherapistId(int patientId, int therapistId)
        {
            throw new NotImplementedException();
        }

        public Task<List<BLAvailableAppointment>> GetAvailableAppointmentsForSpecificSpecializationForWeek(string specialization, DateOnly date)
        {
            throw new NotImplementedException();
        }

        public Task<List<BLAvailableAppointment>> GetAvailableAppointmentsForSpecificTherapistForWeek(int therapistId, DateOnly date)
        {
            throw new NotImplementedException();
        }

        public Task<List<BLAppointment>> GetCanceleAppointmentsByDate(int therapistId, DateOnly date)
        {
            throw new NotImplementedException();
        }

        public Task<List<BLAppointment>> GetCanceleAppointmentsByPatientId(int patientId)
        {
            throw new NotImplementedException();
        }

        public Task<List<BLAppointment>> GetCanceleAppointmentsByTherapistIdAndDate(int therapistId, DateOnly date)
        {
            throw new NotImplementedException();
        }

        public Task<List<BLAppointment>> GetPassedAppointmentsByPatientId(int patientId)
        {
            throw new NotImplementedException();
        }

        public Task<List<BLAppointment>> GetPassedAppointmentsByPatientIdAndTherapistId(int patientId, int therapistId)
        {
            throw new NotImplementedException();
        }

        public Task<List<BLAppointment>> GetPassedAppointmentsByTherapistAndDate(int therapistId, DateOnly date)
        {
            throw new NotImplementedException();
        }

        public Task<BLAppointment> SetAppointment(int availAppointmentId)
        {
            throw new NotImplementedException();
        }

        public Task<BLAvailableAppointment> SetAvailableAppointment(BLAvailableAppointment availableAppointment)
        {
            throw new NotImplementedException();
        }

        public Task<BLAvailableAppointment> SetAvailableAppointmentForPeriod(BLAvailableAppointment availableAppointment)
        {
            throw new NotImplementedException();
        }

        public Task<List<BLPassedAppointment>> SetPassedAppointments()
        {
            throw new NotImplementedException();
        }
    }
}
