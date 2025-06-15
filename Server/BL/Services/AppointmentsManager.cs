using AutoMapper;
using BL.Api;
using BL.Models;
using DAL.Api;
using DAL.Common;
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
        ITherapistsDal _therapistsDal;
        IWorkHoursDal _workHoursDal;
        IMapper _mapper;///
        IAvailableQueueManager _availableQueueManager;
        public AppointmentManager(IMapper mapper, IAppointmentsDal appointmentsDal, IAvailableAppointmentsDal availableAppointmentsDal, IPassedAppointmentsDal passedAppointmentsDal, ICanceledAppointmentsDal canceledAppointmentsDal, IAvailableQueueManager availableQueueManager, IWorkHoursDal workHoursDal, ITherapistsDal therapistsDal)
        {
            _appointmentsDal = appointmentsDal;
            _availableAppointmentsDal = availableAppointmentsDal;
            _passedAppointmentsDal = passedAppointmentsDal;
            _canceledAppointmentsDal = canceledAppointmentsDal;
            _mapper = mapper;
            _availableQueueManager = availableQueueManager;
            _workHoursDal = workHoursDal;
            _therapistsDal = therapistsDal;
        }


        #region get appointments
        #region appointments
        public async Task<List<BLAppointment>> GetAllAppointmentsByDateAndTherapistId(int therapistId, DateOnly? date)
        {
            return _mapper.Map<List<BLAppointment>>(await _appointmentsDal.GetAppointmentsTherapistAndDate(therapistId, date ?? DateOnly.FromDateTime(DateTime.Now)));
        }
        public async Task<List<BLAppointment>> GetAppointmentsByPatientIdAndThetherapistIdAndDate(int therapistId, DateOnly date, int patientId)
        {
            if (therapistId < 0 || patientId < 0)
                throw new ArgumentNullException("there were error in the inserts id's");
            if (date > DateOnly.FromDateTime(DateTime.Now).AddMonths(6))
                throw new ArgumentException("Date cannot be more than 6 months ahead", nameof(date));
            var apps = await _appointmentsDal.GetAppointmentsByPatientIdAndThetherapistIdAndDate(therapistId, date, patientId);
            if (apps == null)
                throw new NullReferenceException(nameof(apps));

            return await Task.FromResult(_mapper.Map<List<BLAppointment>>(apps));
        }

        public async Task<List<BLAppointment>> GetAllAppointmentsByDate(DateOnly? date)
        {
            if (date > DateOnly.FromDateTime(DateTime.Now).AddMonths(6))
                throw new ArgumentException("Date cannot be more than 6 months ahead", nameof(date));
            var app = await _appointmentsDal.GetAppointmentsByDate(date);
            return await Task.FromResult(_mapper.Map<List<BLAppointment>>(app));
        }

        public async Task<List<BLAppointment>> GetAllAppointmentsByPatientIdAndTherapistId(int patientId, int therapistId)
        {
            if (therapistId < 0 || patientId < 0)
                throw new ArgumentNullException("there were error in the inserts id's");
            var apps = _appointmentsDal.GetAllAppointmentsByPatientIdAndTherapistId(patientId, therapistId);
            if (apps == null) throw new NullReferenceException(nameof(apps));
            return await Task.FromResult(_mapper.Map<List<BLAppointment>>(apps));
        }

        public async Task<List<BLAppointment>> GetAppointmentsByTherapistIdAndWeek(int thrapistId, DateOnly? date)
        {

            if (thrapistId<0)
                throw new ArgumentNullException(nameof(thrapistId));
            if(date == null)
            {
                date = new DateOnly();
            }
            if (date > DateOnly.FromDateTime(DateTime.Now).AddMonths(6))
                throw new ArgumentException("Date cannot be more than 6 months ahead", nameof(date));
            var apps = await _appointmentsDal.GetAppointmentsTherapistAndDate(thrapistId,date);
            if (apps == null)
                throw new NullReferenceException(nameof(apps));

            return await Task.FromResult(_mapper.Map<List<BLAppointment>>(apps));
        }
        #endregion

        #region available appointments
        public async Task<List<BLAvailableAppointment>> GetAvailableAppointmentsForSpecificSpecializationForWeek(string specialization, DateOnly date)
        {
            if (specialization == null)
                throw new ArgumentNullException(nameof(specialization));
            if (date > DateOnly.FromDateTime(DateTime.Now).AddMonths(6))
                throw new ArgumentException("Date cannot be more than 6 months ahead", nameof(date));

            if (!Enum.TryParse<DAL.Common.Specialization>(specialization, true, out var specializationEnum))
                throw new Exception($"The specialization {specialization} is not valid. Please use a valid specialization.");

            var availapp = await _availableAppointmentsDal.GetAppointmentsBySpecializationAndDate(date, specializationEnum);
            if (availapp == null)
                throw new NullReferenceException(nameof(availapp));

            return await Task.FromResult(_mapper.Map<List<BLAvailableAppointment>>(availapp));
        }
        public async Task<List<BLAvailableAppointment>> GetAvailableAppointmentsForSpecificTherapistForWeek(int therapistId, DateOnly date)
        {
            if (therapistId < 0)
                throw new Exception("id was worng");
            if (date == null)
            {
                throw new ArgumentNullException(nameof(date));
            }
            var availapp = await _availableAppointmentsDal.GetAppointmentsByTherapistAndWeek( date, therapistId);
            if (availapp == null)
                throw new NullReferenceException(nameof(availapp));

            return await Task.FromResult(_mapper.Map<List<BLAvailableAppointment>>(availapp));
        }
    
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

        public async Task<List<BLAvailableAppointment>> SetAvailableAppointmentForPeriod()
        {
            int therapistId;
            List<Therapist> therapists = await _therapistsDal.GetAllTherapists();
            List<AvailableAppointment> list = new List<AvailableAppointment>();
            foreach (Therapist therapist in therapists)
            {
                therapistId = therapist.TherapistId;

                List<WorkHour> therapistWorkDays = await _workHoursDal.GetTherapistSchedule(therapistId);

                DateTime startDate = DateTime.Today.AddMonths(2);
                DateTime endDate = startDate.AddMonths(1);


                for (DateTime date = startDate; date < endDate; date = date.AddDays(1))
                {

                    if (date.DayOfWeek == DayOfWeek.Saturday)
                        continue;


                    var workHoursForDay = therapistWorkDays
                        .Where(wh => Enum.TryParse<DayOfWeek>(wh.DayOfWeek, out var dw) && dw == date.DayOfWeek)
                        .ToList();

                    if (!workHoursForDay.Any())
                        continue;


                    if (await _availableQueueManager.IsHolidayAsync(date))
                        continue;


                    foreach (var wh in workHoursForDay)
                    {

                        for (var time = wh.StartTime; time < wh.EndTime; time = time.AddMinutes(45))
                        {

                            AvailableAppointment newAvailable = new AvailableAppointment
                            {
                                AppointmentId = 0, // Assuming AppointmentId is auto-generated
                                TherapistId = therapistId,
                                AppointmentDate = DateOnly.FromDateTime(date),
                                AppointmentTime = time,
                                DurationMinutes = 45,
                                Specialization = _therapistsDal.GetTherapistById(therapistId).Result.Specialization,
                                Therapist = _therapistsDal.GetTherapistById(therapistId).Result
                            };

                            list.Add(newAvailable);
                            await _availableAppointmentsDal.AddAppointment(_mapper.Map<AvailableAppointment>(newAvailable));
                        }
                    }
                }
            }

            foreach (var appt in list)
            {
                appt.AppointmentId = 0; // Make sure it's zero so EF will let SQL Server generate it!
            }

            await _availableAppointmentsDal.AddAppointments(list);
            return _mapper.Map<List<BLAvailableAppointment>>(list);
        }
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


        public async Task<BLAvailableAppointment> DeleteAvailableAppointment(int appointmentId)
        {
            return _mapper.Map<BLAvailableAppointment>(await _availableAppointmentsDal.RemoveAppointment(appointmentId));
        }

        public async Task<BLCanceledAppointment> DeleteCanceleAppointment(int appointmentId)
        {
            return _mapper.Map<BLCanceledAppointment>(await _canceledAppointmentsDal.RemoveCanceledAppointment(appointmentId));
        }

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


    }
}
#endregion
#endregion