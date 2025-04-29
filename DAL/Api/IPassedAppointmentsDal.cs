using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Api
{
    public interface IPassedAppointmentsDal
    {
        //geting all appointments passed
        Task<List<PassedAppointment>> GetAllPassedApointmentsByMOnthDate(DateOnly month);
        //geting apointment passed by therapist id and month date
        Task<List<PassedAppointment>> GetAllPassedAppointmentsByTherapistIdByMOnthDate(int therapistid, DateOnly month);

        //geting apointment passed by patient id and month date, on default date-3 month ago
        Task<List<PassedAppointment>> GetAllPassedAppointmentsByPatientIdByMOnthDate(int patientid,DateOnly? date);
        //geting apointment passed by date
        Task<List<PassedAppointment>> GetAllPassedAppointmentsByDate(DateOnly date);
        //geting apointment passed by date and therapist id
        Task<List<PassedAppointment>> GetAllPassedAppointmentsByDateAndTherapistId(DateOnly date, int therapistid);

        //geting apointment passed by date and specialization id
        Task<List<PassedAppointment>> GetAllPassedAppointmentsByDateAndSpecialization(DateOnly date, string specialization);

        //geting apointment passed by specialization id -on defalut date-3 month ago
        Task<List<PassedAppointment>> GetAllPassedAppointmentsBySpecializationAndPatientid(int patientid,string specialization);
        //add all apointment passed once a day    
        public void AddAllPassedAppointmentsOnceADay(List<PassedAppointment> apointmentpassed);


        //delete all apointment passed of the last year once a year     

        public void DeleteAllPassedAppointmentsOnceAYear(List<PassedAppointment> apointmentpassed);

    }
}
