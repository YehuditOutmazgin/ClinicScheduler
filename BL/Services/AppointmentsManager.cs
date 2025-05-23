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
        {
            if(appointmentId==0)
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
                Specialization=appointment.Therapist.Specialization,
           
            };

            await _availableAppointmentsDal.AddAppointment(newAvailableAppointment);  
            return await Task.FromResult(_mapper.Map<BLAppointment>(appointment));
        }
       
        public async Task<bool> DeleteAppointmentsForDate(DateOnly date, string? reason = null)
        {
            
            if (date > DateOnly.FromDateTime(DateTime.Now).AddMonths(6))
                throw new ArgumentException("Date cannot be in the future", nameof(date));

            List<Appointment> app = await _appointmentsDal.GetAppointmentsByDate(date);
            if(app==null)
                throw new ArgumentNullException(nameof(app));
            if(app.Count==0)
                return false;
            await  _appointmentsDal.DeleteRangeAppointments(app);
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

        public async Task<bool> DeleteAppointmentForTherapistAndDate(int therapistId, DateOnly date)
        {
            if (date > DateOnly.FromDateTime(DateTime.Now).AddMonths(6))
                throw new ArgumentException("Date cannot be in the future", nameof(date));

            if (therapistId == 0)
                throw new ArgumentNullException(nameof(therapistId));

            List<Appointment> app = await _appointmentsDal.DeleteAppointmentsByTherapistIdAndDay(therapistId, date);
            List<AvailableAppointment> availApp = await _availableAppointmentsDal.RemoveAllAppointmentsByDateAndTherapist(therapistId,date);

            if (app == null&& availApp==null)
                throw new NullReferenceException($"some eror in deleting the appointment in this date:{date}");
            if (app.Count == 0&&availApp.Count==0)
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

        //public async Task<List<BLAppointment>> GetAllAppointmentsByDate(DateOnly? date)
        //{
        //    return _mapper.Map<List<BLAppointment>>(await .GetAppointmentsByDate(date ?? DateOnly.FromDateTime(DateTime.Now)));
        //}

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

        public Task<bool> DeleteAppointmentForTherapistAndAppointmentId(int therapistId, DateOnly date)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAppointmentForDate(DateOnly date, string? reason = null)
        {
            throw new NotImplementedException();
        }

        public Task DeleteRangeAppointments(List<Appointment> appointments)
        {
            throw new NotImplementedException();
        }

        public Task<List<BLAppointment>> GetAllAppointmentsByDate(DateOnly? date)
        {
            throw new NotImplementedException();
        }
    }
}