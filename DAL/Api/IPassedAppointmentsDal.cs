using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Api
{
    public interface IPassedAppointmentsDal
    {
        //geting all appointments passed
        Task<List<AppointmentsPassed>> GetAllPassedApointmentsByMOnthDate(DateOnly month);
        //geting apointment passed by therapist id and month date
        Task<List<AppointmentsPassed>> GetAllPassedAppointmentsByTherapistIdByMOnthDate(int therapistid, DateOnly month);

        //geting apointment passed by patient id and month date, on default date-3 month ago
        Task<List<AppointmentsPassed>> GetAllPassedAppointmentsByPatientIdByMOnthDate(int patientid,DateOnly? date);
        //geting apointment passed by date
        Task<List<AppointmentsPassed>> GetAllPassedAppointmentsByDate(DateOnly date);
        //geting apointment passed by date and therapist id
        Task<List<AppointmentsPassed>> GetAllPassedAppointmentsByDateAndTherapistId(DateOnly date, int therapistid);

        //geting apointment passed by date and specialization id
        Task<List<AppointmentsPassed>> GetAllPassedAppointmentsByDateAndSpecialization(DateOnly date, string specialization);

        //geting apointment passed by specialization id -on defalut date-3 month ago
        Task<List<AppointmentsPassed>> GetAllPassedAppointmentsBySpecializationAndPatientid(int patientid,string specialization);
        //add all apointment passed once a day    
        public void AddAllPassedAppointmentsOnceADay(List<AppointmentsPassed> apointmentpassed);


        //delete all apointment passed of the last year once a year     

        public void DeleteAllPassedAppointmentsOnceAYear(List<AppointmentsPassed> apointmentpassed);

    }
}
