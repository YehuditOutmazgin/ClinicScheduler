using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Api
{
    public interface IAppointmentsPassedDal
    {
        //geting all appointments passed
        Task<List<AppointmentsPassed>> GetAllPassedApointmentsByMOnthDate(DateOnly month);
        //geting apointment passed by therapist id and month date
        Task<List<AppointmentsPassed>> GetAllAppointmentsPassedByTherapistIdByMOnthDate(int therapistid, DateOnly month);

        //geting apointment passed by patient id and month date, on default date-3 month ago
        Task<List<AppointmentsPassed>> GetAllAppointmentsPassedByPatientIdByMOnthDate(int patientid,DateOnly? date);
        //geting apointment passed by date
        Task<List<AppointmentsPassed>> GetAllAppointmentsPassedByDate(DateOnly date);
        //geting apointment passed by date and therapist id
        Task<List<AppointmentsPassed>> GetAllAppointmentsPassedByDateAndTherapistId(DateOnly date, int therapistid);

        //geting apointment passed by date and specialization id
        Task<List<AppointmentsPassed>> GetAllAppointmentsPassedByDateAndSpecialization(DateOnly date, string specialization);

        //geting apointment passed by specialization id -on defalut date-3 month ago
        Task<List<AppointmentsPassed>> GetAllAppointmentsPassedBySpecializationAndPatientid(int patientid,string specialization);
        //add all apointment passed once a day    
        public void AddAllAppointmentsPassedOnceADay(List<AppointmentsPassed> apointmentpassed);


        //delete all apointment passed of the last year once a year     

        public void DeleteAllAppointmentsPassedOnceAYear(List<AppointmentsPassed> apointmentpassed);

    }
}
