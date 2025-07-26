using AutoMapper;
using BL.Api;
using BL.Models;
using BL.service;
using DAL.Api;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;
using DAL.Api;
namespace BL.Services
{
    public class AppointmentManager : IAppointmentsManager
    {
        #region Fields
        IPatientsManager _patientManager;
        ITherapistManager _therapistManager;
        IAppointmentsDal _appointmentsDal;
        IAvailableAppointmentsDal _availableAppointmentsDal;
        IPastAppointmentsDal _PastAppointmentsDal;
        ICanceledAppointmentsDal _canceledAppointmentsDal;
        IMapper _mapper;
        IWorkHoursDal _workHoursDal;
        IHolidayService _holidayService;
        ITherapistsDal _therapistsDal;
        #endregion
        public AppointmentManager(IMapper mapper, IAppointmentsDal appointmentsDal, IAvailableAppointmentsDal availableAppointmentsDal, IPastAppointmentsDal PastAppointmentsDal, ICanceledAppointmentsDal canceledAppointmentsDal, IHolidayService holidayService, IWorkHoursDal workHoursDal, ITherapistsDal therapistsDal, IPatientsManager patientManager, ITherapistManager therapistManager)
        {
            _appointmentsDal = appointmentsDal;
            _availableAppointmentsDal = availableAppointmentsDal;
            _PastAppointmentsDal = PastAppointmentsDal;
            _canceledAppointmentsDal = canceledAppointmentsDal;
            _mapper = mapper;
            _holidayService = holidayService;
            _workHoursDal = workHoursDal;
            _therapistsDal = therapistsDal;
            _patientManager = patientManager;
            _therapistManager = therapistManager;
        }

        // BL layer
        public async Task<BLAppointment> ScheduleAppointment(int patientId, int appointmentId)
        {
            AvailableAppointment? freeSlot =
                await _availableAppointmentsDal.RemoveAppointment(appointmentId);

            if (freeSlot is null)
                throw new KeyNotFoundException(
                    $"No available appointment with ID {appointmentId}.");

            Appointment booked = new Appointment
            {
                AppointmentId = freeSlot.AppointmentId,
                AppointmentDate = freeSlot.AppointmentDate,
                TherapistId = freeSlot.TherapistId,
                PatientId = patientId,
                Status = "Scheduled",
                DurationMinutes = freeSlot.DurationMinutes,
                Specialization = freeSlot.Specialization,
                TherapistName = freeSlot.TherapistName,


            };
            await _appointmentsDal.AddAppointment(booked);
            return _mapper.Map<BLAppointment>(booked);
        }


        public async Task<BLAppointment> GetAppointmentById(int appointmentId)
        {
            var appointment = await _appointmentsDal.GetAppointmentById(appointmentId);
            if (appointment == null)
            {
                throw new NullReferenceException($"Appointment with ID {appointmentId} was not found.");
            }
            return _mapper.Map<BLAppointment>(appointment);
        }
        public async Task<List<BLAppointment>> GetAllAppointmentsByDateAndTherapistId(int therapistId, DateOnly date)
        {
            return _mapper.Map<List<BLAppointment>>(await _appointmentsDal.GetAppointmentsTherapistAndDate(therapistId, date));
        }
        public async Task<List<BLAppointment>> GetAppointmentsByPatientIdAndThetherapistIdAndDate(int therapistId, DateOnly date, int patientId)
        {
            if (therapistId < 0 || patientId < 0)
                throw new ArgumentNullException("there were error in the inserts id's");
            if (date > DateOnly.FromDateTime(DateTime.Now).AddMonths(6))
                throw new ArgumentException("Date cannot be more than 6 months ahead", nameof(date));
            var apps = await _appointmentsDal.GetAppointmentsByPatientIdAndTherapistIdAndDate(therapistId, date, patientId);
            if (apps == null)
                throw new NullReferenceException(nameof(apps));

            return await Task.FromResult(_mapper.Map<List<BLAppointment>>(apps));
        }

        public async Task<List<BLAppointment>> GetAllAppointmentsByDate(DateOnly date)
        {
            if (date > DateOnly.FromDateTime(DateTime.Now).AddMonths(6))
                throw new ArgumentException("Date cannot be more than 6 months ahead", nameof(date));
            var app = await _appointmentsDal.GetAppointmentsByDate(getDate(date));
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

        public async Task<List<BLAppointment>> GetAppointmentsByTherapistIdAndWeek(int thrapistId, DateOnly date)
        {

            if (thrapistId < 0)
                throw new ArgumentNullException(nameof(thrapistId));

            if (date > DateOnly.FromDateTime(DateTime.Now).AddMonths(6))
                throw new ArgumentException("Date cannot be more than 6 months ahead", nameof(date));
            var apps = await _appointmentsDal.GetAppointmentsTherapistAndDate(thrapistId, date);
            if (apps == null)
                throw new NullReferenceException(nameof(apps));
            return await Task.FromResult(_mapper.Map<List<BLAppointment>>(apps));
        }

        public Task<List<BLPastAppointment>> GetPastAppointmentsByPatientId(int patientId)
        {
            if (patientId < 0)
                throw new ArgumentNullException(nameof(patientId));
            return _PastAppointmentsDal.GetAllPastAppointmentsByPatientId(patientId)
                .ContinueWith(task => _mapper.Map<List<BLPastAppointment>>(task.Result));
        }

        public Task<List<BLAppointment>> GetPastAppointmentsByPatientIdAndTherapistId(int patientId, int therapistId)
            => throw new NotImplementedException();

        public async Task<List<BLPastAppointment>> GetPastAppointmentsByTherapistIdAndDate(int therapistId, DateOnly date)
        {
            if (therapistId < 0)
                throw new ArgumentNullException(nameof(therapistId));
            if (date > DateOnly.FromDateTime(DateTime.Now))
                throw new ArgumentException("Date cannot be in the future", nameof(date));
            var PastAppointments = await _PastAppointmentsDal.GetAllPastAppointmentsByTherapistIdAndDate(therapistId, date);
            return _mapper.Map<List<BLPastAppointment>>(PastAppointments);
        }

        public async Task<List<BLPastAppointment>> GetPastAppointmentsByTherapistInDateRange(int therapistId, DateOnly start, DateOnly end)
        {
            if (therapistId < 0)
                throw new ArgumentNullException(nameof(therapistId));
            if (start > end)
                throw new ArgumentException("Start date cannot be after end date", nameof(start));
            var PastAppointments = await _PastAppointmentsDal.GetAllPastAppointmentsByTherapistIdAndRangeDate(therapistId, start, end);
            return _mapper.Map<List<BLPastAppointment>>(PastAppointments);
        }

        #region available appointments
        public async Task<List<BLAvailableAppointment>> GetAvailableAppointmentsForSpecificSpecializationForWeek(string specialization, DateOnly date)
        {
            if (specialization == null)
                throw new ArgumentNullException(nameof(specialization));
            if (date > DateOnly.FromDateTime(DateTime.Now).AddMonths(6))
                throw new ArgumentException("Date cannot be more than 6 months ahead", nameof(date));

            var availapp = await _availableAppointmentsDal.GetAppointmentsBySpecializationAndDate(date, _mapper.Map<DAL.Models.Specialization>(specialization));
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
            var availapp = await _availableAppointmentsDal.GetAppointmentsByTherapistAndWeek(date, therapistId);

            if (availapp == null)
                return null;

            return await Task.FromResult(_mapper.Map<List<BLAvailableAppointment>>(availapp));
        }

        #endregion


        #region cancel appointments

        /// <summary>
        /// Rebecca implement this functions if you have any questions about the implementation or the function, contact me by phone:0548535515
        /// </summary>
        /// <returns></returns>
        public async Task<List<BLCanceledAppointment>> GetCanceleAppointmentsByPatientId(int patientId)
        {
            var apps = await _canceledAppointmentsDal.GetCanceledAppointmentsByPatientId(patientId);
            if (apps == null)
                throw new NullReferenceException(nameof(apps));
            return await Task.FromResult(_mapper.Map<List<BLCanceledAppointment>>(apps));
        }

        public async Task<List<BLCanceledAppointment>> GetAllCanceleAppointments()
        {
            var apps = await _canceledAppointmentsDal.GetAllCanceledAppointments();
            if (apps == null)
                throw new NullReferenceException(nameof(apps));
            return await Task.FromResult(_mapper.Map<List<BLCanceledAppointment>>(apps));
        }

        //-----------------------------------------------------------------

        public Task<List<BLAppointment>> GetCanceleAppointmentsByTherapistIdAndDate(int therapistId, DateOnly date)
            => throw new NotImplementedException();

        public Task<List<BLAppointment>> GetCanceleAppointmentsByDate(int therapistId, DateOnly date)
            => throw new NotImplementedException();
        #endregion

        #region set appointments
        #region appointment
        public Task<BLAppointment> SetAppointment(int availAppointmentId)
            => throw new NotImplementedException();
        #endregion

        #region available appointment
        public async Task<BLAvailableAppointment> SetAvailableAppointment(BLAvailableAppointment availableAppointment)
        {
            return _mapper.Map<BLAvailableAppointment>(await _availableAppointmentsDal.AddAppointment(_mapper.Map<AvailableAppointment>(availableAppointment)));

        }


        public async Task<bool> SetAvailableAppointmentForPeriod()
        {
            List<Therapist> therapists = await _therapistsDal.GetAllTherapists();
            List<AvailableAppointment> list = new List<AvailableAppointment>();
            //DateTime startDate = DateTime.Today.AddMonths(2);
            //change it according the monthes you want from.
            DateTime startDate = DateTime.Today.AddDays(1);
            DateTime endDate = startDate.AddMonths(1);
            List<DateTime> noWorkDays = await _holidayService.GetNoWorkDaysAsync(startDate, endDate);
            foreach (Therapist therapist in therapists)
            {

                int therapistId = therapist.Id;
                List<WorkHour> therapistWorkDays = await _workHoursDal.GetTherapistSchedule(therapistId);
                if (therapistWorkDays == null || therapistWorkDays.Count == 0)
                {
                    continue;
                }
                for (DateTime date = startDate; date < endDate; date = date.AddDays(1))
                {
                    if (noWorkDays.Contains(date))
                        continue;

                    var workHoursForDay = therapistWorkDays
                        .Where(wh => Enum.TryParse<DayOfWeek>(wh.DayOfWeek, out var dw) && dw == date.DayOfWeek)
                        .ToList();


                    if (!workHoursForDay.Any())
                        continue;



                    foreach (var wh in workHoursForDay)
                    {
                        for (var time = wh.StartTime; time < wh.EndTime; time = time.AddMinutes(therapist.AppointmentDuration))
                        {
                            DateTime appointmentDateTime = new DateTime(date.Year, date.Month, date.Day, time.Hour, time.Minute, 0);

                            AvailableAppointment newAvailable = new AvailableAppointment
                            {
                                AppointmentId = 0, // Assuming AppointmentId is auto-generated
                                TherapistId = therapistId,
                                AppointmentDate = appointmentDateTime,
                                TherapistName = $"{therapist.FirstName} {therapist.LastName}",
                                DurationMinutes = therapist.AppointmentDuration,
                                Specialization = (await _therapistsDal.GetTherapistById(therapistId)).Specialization,
                                Therapist = await _therapistsDal.GetTherapistById(therapistId)
                            };

                            list.Add(newAvailable);
                        }
                    }
                }
            }

            foreach (var appt in list)
            {
                appt.AppointmentId = 0; // Make sure it's zero so EF will let SQL Server generate it!
            }

            return await _availableAppointmentsDal.AddAppointments(list);
            //return _mapper.Map<List<BLAvailableAppointment>>(list);
        }

        #endregion

        #region canceled appointment
        //nothing for now
        #endregion

        #region passed appointment
        public Task<List<BLPastAppointment>> SetPastAppointments()
            => throw new NotImplementedException();


        /// <summary>
        /// Rebecca add this function if you have any questions about the implementation or the function, contact me by phone:0548535515
        /// </summary>
        /// <returns></returns>
        public async Task<BLAppointment> SetAppointmentStatus(int appointmentId, bool isConfirm)
        {
            var appointment = await _appointmentsDal.SetAppointmentStatus(appointmentId, isConfirm);
            if (appointment == null)
            {
                throw new ArgumentException($"Appointment with ID {appointmentId} was not found.");
            }
            return _mapper.Map<BLAppointment>(appointment);
        }
        //--------------------------------------------------------------------
        #endregion

        #region available appointment
        #endregion

        #region canceled appointment
        #endregion

        #region passed appointment
        #endregion
        #endregion

        #region delete appointments
        public async Task<BLAppointment> DeleteAppointment(int patientId, int appointmentId)
        {
            var patient = await _patientManager.GetPatientById(patientId);
            if (patient == null)
                throw new InvalidDataException("invalid patient id");
            var appoint = await _appointmentsDal.GetAppointmentById(appointmentId);
            if (appoint == null || appoint.PatientId != patientId)
                throw new InvalidDataException("invalid appointment");
            var therapist = await _therapistManager.GetTherapistById(appoint.TherapistId);
            if (therapist == null)
                throw new KeyNotFoundException("therapist not found");
            AvailableAppointment app = new()
            {
                AppointmentId = appoint.AppointmentId,
                AppointmentDate = appoint.AppointmentDate,
                TherapistId = appoint.TherapistId,
                DurationMinutes = appoint.DurationMinutes,
                Specialization = _mapper.Map<DAL.Models.Specialization>(therapist.Specialization),
                TherapistName = appoint.TherapistName
            };
            await _availableAppointmentsDal.AddAppointment(app);
            return _mapper.Map<BLAppointment>(await _appointmentsDal.DeleteAppointment(appointmentId));
        }
        #region appointment

        public async Task<BLAppointment> DeleteAppointmentByPatient(int patientId, int appointmentId)
        {
            var patient = await _patientManager.GetPatientById(patientId);
            if (patient == null)
                throw new InvalidDataException("invalid patient id");
            var appoint = await _appointmentsDal.DeleteAppointment(appointmentId);
            if (appoint == null || appoint.PatientId != patientId)
                throw new InvalidDataException("invalid appointment");
            if (patientId != appoint.PatientId)
                throw new InvalidDataException("the patient dont has appointment with this id");

            var app = new AvailableAppointment
            {
                AppointmentId = 0,
                AppointmentDate = appoint.AppointmentDate,
                TherapistId = appoint.TherapistId,
                DurationMinutes = appoint.DurationMinutes,
                Specialization = appoint.Specialization,
                TherapistName = appoint.TherapistName
            };
            await _availableAppointmentsDal.AddAppointment(app);
            return _mapper.Map<BLAppointment>(appoint);
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
                throw new ArgumentException("Date cannot be more than 6 months in the future.", nameof(date));

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
                    AppointmentDate = appointment.AppointmentDate,
                    TherapistId = appointment.TherapistId,
                    DurationMinutes = appointment.DurationMinutes,
                    Specialization = appointment.Specialization,
                    TherapistName = appointment.TherapistName,
                    Note = "appointment deleted"
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
            var app = await _canceledAppointmentsDal.RemoveCanceledAppointment(appointmentId);
            if (app == null)
                throw new KeyNotFoundException("Appointment with the specified ID does not exist in the system.");

            return _mapper.Map<BLCanceledAppointment>(app);
        }

        public async Task<bool> DeleteOldPassedAppointment(DateOnly endDate)
        {
             if (endDate >= DateOnly.FromDateTime(DateTime.Now))
                throw new ArgumentException("TheDate is not correct.", nameof(endDate));

            return await _PastAppointmentsDal.DeleteAllPastAppointmentsOlderThan(endDate);
        }

        #region get

        public async Task<List<BLAppointment>> GetAllAppointments()
        {
            return _mapper.Map<List<BLAppointment>>(await _appointmentsDal.GetAllAppointments());
        }
        public async Task<List<BLAppointment>> GetAllAppointmentsByPatientId(int patientId)
        {
            return _mapper.Map<List<BLAppointment>>(await _appointmentsDal.GetAppointmentsByPatientId(patientId));
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

        #endregion





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
        #endregion
        #endregion

        #region general
        public async Task<DateTime> NextBusinessDay()
        {
            int adding = 1;
            while (await _holidayService.IsHolidayAsync(DateTime.Now.AddDays(adding)))
            {
                adding++;
            }
            return DateTime.Now.AddDays(adding);
        }
        #endregion
        private DateOnly getDate(DateOnly? date)
        {
            if (date.HasValue)
            {
                return date.Value;
            }
            return DateOnly.FromDateTime(DateTime.Now);
        }

    }
}