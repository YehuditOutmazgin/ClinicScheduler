using BL.Models;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public static class Mapper
    {
        public static Patient MapToPatient(BLPatient bLPatient)
        {
           return  new Patient()
            {
               PatientId = bLPatient.PatientId,
                FirstName = bLPatient.FirstName,
                LastName = bLPatient.LastName,
                PhoneNumber = bLPatient.PhoneNumber,
                Age = bLPatient.Age,

         
            };
        }
        public static Therapist MapToTherapist(BLTherapist bLTherapist)
        {
            return new Therapist()
            {
                TherapistId = bLTherapist.TherapistId,
                FirstName = bLTherapist.FirstName,
                LastName = bLTherapist.LastName,
                PhoneNumber = bLTherapist.PhoneNumber,
                Specialization = bLTherapist.Specialization
            };
        }
        public static AvailableAppointment MapToAvailableAppointment(BLAvailableAppointment blAvailableAppointment)
        {
            return new AvailableAppointment()
            {
                AppointmentId = blAvailableAppointment.AppointmentId,
                TherapistId = blAvailableAppointment.TherapistId,
                AppointmentDate = blAvailableAppointment.AppointmentDate,
                TimeSlot = blAvailableAppointment.TimeSlot,
                DurationMinutes = blAvailableAppointment.DurationMinutes,
                Specialization = blAvailableAppointment.Specialization,
                Therapist = MapToTherapist(blAvailableAppointment.Therapist)

            };
        }
        public static Appointment MapToAppointment(BLAppointment blAppointment)
        {
            return new Appointment()
            {
                AppointmentId = blAppointment.AppointmentId,
                PatientId = blAppointment.PatientId,
                TherapistId = blAppointment.TherapistId,
                AppointmentDate = blAppointment.AppointmentDate,
                AppointmentTime = blAppointment.AppointmentTime,
                Patient = MapToPatient(blAppointment.Patient),
                Therapist = MapToTherapist(blAppointment.Therapist)
            };
        }
        public static PassedAppointment MapToPassedAppointment(BLPassedAppointment blPassedAppointment)
        {
            return new PassedAppointment()
            {
                AppointmentId = blPassedAppointment.AppointmentId,
                PatientId = blPassedAppointment.PatientId,
                TherapistId = blPassedAppointment.TherapistId,
                AppointmentDate = blPassedAppointment.AppointmentDate,
                AppointmentTime = blPassedAppointment.AppointmentTime,
                Status = blPassedAppointment.Status,
                Patient = MapToPatient(blPassedAppointment.Patient),
                Therapist = MapToTherapist(blPassedAppointment.Therapist)
            };
        }
        public static CanceledAppointment MapToCanceledAppointment(BLCanceledAppointment blCanceledAppointment)
        {
            return new CanceledAppointment()
            {
                Id = blCanceledAppointment.Id,
                AppointmentId = blCanceledAppointment.AppointmentId,
                PatientId = blCanceledAppointment.PatientId,
                Appointment= MapToAppointment(blCanceledAppointment.Appointment),
                Patient = MapToPatient(blCanceledAppointment.Patient),
             
           
            };
        }
        public static WorkHour MapToWorkHour(BLWorkHour blWorkHour)
        {
            return new WorkHour()
            {
                Id = blWorkHour.Id,
                TherapistId = blWorkHour.TherapistId,
                StartTime = blWorkHour.StartTime,
                EndTime = blWorkHour.EndTime,
                DayOfWeek = blWorkHour.DayOfWeek,
                Therapist = MapToTherapist(blWorkHour.Therapist)
            };
           
        }
    }
}
