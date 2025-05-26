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

        #region get appointments
        #region appointments
        public Task<List<BLAppointment>> GetAllAppointmentsByDateAndTherapistId(int therapistId, DateOnly? date)
            => throw new NotImplementedException();

        public Task<List<BLAppointment>> GetAllAppointmentsByPatientId(int therapistId, DateOnly date, int patientId)
            => throw new NotImplementedException();

        public Task<List<BLAppointment>> GetAllAppointmentsByDate(DateOnly? date)
            => throw new NotImplementedException();

        public Task<List<BLAppointment>> GetAllAppointments()
            => throw new NotImplementedException();

        public Task<List<BLAppointment>> GetAllAppointmentsByPatientIdAndTherapistId(int patientId, int therapistId)
            => throw new NotImplementedException();

        public Task<List<BLAppointment>> GetAppointmentsByTherapistIdAndWeek(string thrapistId, DateOnly? date)
            => throw new NotImplementedException();
        #endregion

        #region available appointments
        public Task<List<BLAvailableAppointment>> GetAvailableAppointmentsForSpecificSpecializationForWeek(string specialization, DateOnly date)
            => throw new NotImplementedException();

        public Task<List<BLAvailableAppointment>> GetAvailableAppointmentsForSpecificTherapistForWeek(int therapistId, DateOnly date)
            => throw new NotImplementedException();
        #endregion

        #region passed appointments
        public Task<List<BLAppointment>> GetPassedAppointmentsByPatientId(int patientId)
            => throw new NotImplementedException();

        public Task<List<BLAppointment>> GetPassedAppointmentsByPatientIdAndTherapistId(int patientId, int therapistId)
            => throw new NotImplementedException();

        public Task<List<BLAppointment>> GetPassedAppointmentsByTherapistAndDate(int therapistId, DateOnly date)
            => throw new NotImplementedException();
        #endregion

        #region cancel appointments
        public Task<List<BLAppointment>> GetCanceleAppointmentsByPatientId(int patientId)
            => throw new NotImplementedException();

        public Task<List<BLAppointment>> GetCanceleAppointmentsByTherapistIdAndDate(int therapistId, DateOnly date)
            => throw new NotImplementedException();

        public Task<List<BLAppointment>> GetCanceleAppointmentsByDate(int therapistId, DateOnly date)
            => throw new NotImplementedException();
        #endregion
        #endregion

        #region set appointments
        #region appointment
        public Task<BLAppointment> SetAppointment(int availAppointmentId)
            => throw new NotImplementedException();
        #endregion

        #region available appointment
        public Task<BLAvailableAppointment> SetAvailableAppointment(BLAvailableAppointment availableAppointment)
            => throw new NotImplementedException();

        public Task<BLAvailableAppointment> SetAvailableAppointmentForPeriod(BLAvailableAppointment availableAppointment)
            => throw new NotImplementedException();
        #endregion

        #region canceled appointment
        //nothing for now
        #endregion

        #region passed appointment
        public Task<List<BLPassedAppointment>> SetPassedAppointments()
            => throw new NotImplementedException();
        #endregion
        #endregion

        #region update appointments
        #region appointment
        #endregion

        #region available appointment
        #endregion

        #region canceled appointment
        #endregion

        #region passed appointment
        #endregion
        #endregion

        #region delete appointments
        #region appointment
        public async Task<BLAppointment> DeleteAppointmentByPatientId(int patientId, int appointmentId)
        {
            if (appointmentId == 0)
                throw new ArgumentNullException(nameof(appointmentId));

            //we neeed to use with the patient id? think about it.
            AppointmentBase appointment = await _appointmentsDal.DeleteAppointment(appointmentId);
            if (appointment == null)
                throw new NullReferenceException(nameof(appointment));
            var newAvailableAppointment = new AvailableAppointment
            {
                TherapistId = appointment.TherapistId,
                AppointmentTime = appointment.AppointmentTime,
                AppointmentDate = appointment.AppointmentDate,
                Specialization = appointment.Therapist.Specialization,

            };

            await _availableAppointmentsDal.AddAppointment(newAvailableAppointment);
            return await Task.FromResult(_mapper.Map<BLAppointment>(appointment));
        }

        #endregion

        #region available appointment
        public Task<BLAvailableAppointment> DeleteAvailableAppointment(int appointmentId)
                => throw new NotImplementedException();
        #endregion

        #region cancele appointment
        public Task<BLCanceledAppointment> DeleteCanceleAppointment(int appointmentId)
            => throw new NotImplementedException();
        #endregion

        #region passed appointment
        public async Task<bool> DeleteOldPassedAppointment(DateOnly? endDate = null)
        {
            if (endDate == null)
            {
                endDate = new DateOnly();
                DateTime dateTime = DateTime.Now;
                dateTime = dateTime.AddYears(-1);
                endDate = DateOnly.FromDateTime(dateTime).AddDays(-1);
            }
            else if (endDate >= DateOnly.FromDateTime(DateTime.Now))
                throw new ArgumentException("TheDate is not correct.", nameof(endDate));

            return await _passedAppointmentsDal.DeleteAllPassedAppointmentsOlderThan(endDate.Value);
        }
        #endregion

        public async Task<bool> DeleteAppointmentForTherapistAndDate(int therapistId, DateOnly date)
        {
            if (date > DateOnly.FromDateTime(DateTime.Now).AddMonths(6))
                throw new ArgumentException("Date cannot be in the future", nameof(date));

            if (therapistId == 0)
                throw new ArgumentNullException(nameof(therapistId));

            List<Appointment> app = await _appointmentsDal.DeleteAppointmentsByTherapistIdAndDay(therapistId, date);
            List<AvailableAppointment> availApp = await _availableAppointmentsDal.RemoveAllAppointmentsByDateAndTherapist(therapistId, date);

            if (app == null && availApp == null)
                throw new NullReferenceException($"some eror in deleting the appointment in this date:{date}");
            if (app.Count == 0 && availApp.Count == 0)
                return false;


            foreach (var appointment in app)
            {
                appointment.Status = "cancel";

                await _canceledAppointmentsDal.AddCanceledAppointment(new CanceledAppointment()
                {
                    AppointmentId = appointment.AppointmentId,
                    PatientId = appointment.PatientId,
                    AppointmentDate = date,
                    TherapistId = appointment.TherapistId,
                });
            }

            return true;
        }

        public Task<bool> DeleteAppointmentForTherapistAndAppointmentId(int therapistId, DateOnly date)
                => throw new NotImplementedException();

        public async Task<bool> DeleteAppointmentsForDate(DateOnly date, string? reason = null)
        {

            if (date > DateOnly.FromDateTime(DateTime.Now).AddMonths(6))
                throw new ArgumentException("Date cannot be in the future", nameof(date));

            List<Appointment> app = await _appointmentsDal.GetAppointmentsByDate(date);
            if (app == null)
                throw new ArgumentNullException(nameof(app));
            if (app.Count == 0)
                return false;
            await _appointmentsDal.DeleteRangeAppointments(app);
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
        //delete appointmet range
        // public Task DeleteRangeAppointments(List<Appointment> appointments);
        #endregion

        #region general

        #endregion
    }
}

