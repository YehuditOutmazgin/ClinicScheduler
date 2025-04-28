using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Api
{
    internal interface ITherapistDal
    {

        Task<Therapist> GetTherapistById(int id);
        Task AddTherapist(Therapist therapist);
        Task UpdateTherapist(Therapist therapist);
        Task DeleteTherapist(int id);
        Task<List<Therapist>> GetAllTherapists();


    }
}
