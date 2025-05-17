using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Api
{
    public interface ITherapistsDal
    {

        Task<Therapist> GetTherapistById(int id);
        Task <Therapist> AddTherapist(Therapist therapist);
        Task<Therapist> UpdateTherapist(Therapist therapist);
        Task<Therapist> DeleteTherapist(int id);
        Task<List<Therapist>> GetAllTherapists();
        Task<Therapist> GetTherapistByName(string firstName, string lastName);





    }
}
