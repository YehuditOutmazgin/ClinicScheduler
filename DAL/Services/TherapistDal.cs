using DAL.Api;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Services
{
    internal class TherapistDal:ITherapistDal
    {
 
            private readonly DB_Manager _DB_Manager;
            public async Task AddTherapist(Therapist therapist)
            {
                if (therapist == null)
                {
                    throw new ArgumentNullException(nameof(therapist), "Therapist cannot be null.");
                }
                _DB_Manager.Therapists.Add(therapist);
                await _DB_Manager.SaveChangesAsync();
            }

            public async Task DeleteTherapist(int id)
            {
                var therapist = await _DB_Manager.Therapists.FindAsync(id);

                if (therapist == null)
                {
                    throw new KeyNotFoundException($"Therapist with ID {id} was not found.");
                }

                _DB_Manager.Therapists.Remove(therapist);

                await _DB_Manager.SaveChangesAsync();
            }
            public async Task<List<Therapist>> GetAllTherapists()
            {
                return await _DB_Manager.Therapists.ToListAsync();
            }

            public async Task<Therapist> GetTherapistById(int id)
            {
                var therapist = await _DB_Manager.Therapists.FindAsync(id);

                if (therapist == null)
                {
                    throw new KeyNotFoundException($"Therapist with ID {id} was not found.");
                }

                return therapist;
            }

            public async Task UpdateTherapist(Therapist therapist)
            {
                if (therapist == null)
                {
                    throw new ArgumentNullException(nameof(therapist), "Therapist cannot be null.");
                }

                var existingTherapist = await _DB_Manager.Therapists.FindAsync(therapist.TherapistId);
                if (existingTherapist == null)
                {
                    throw new KeyNotFoundException($"Therapist with ID {therapist.TherapistId} was not found.");
                }

                _DB_Manager.Entry(existingTherapist).CurrentValues.SetValues(therapist);

                await _DB_Manager.SaveChangesAsync();
            }
        }
    }


