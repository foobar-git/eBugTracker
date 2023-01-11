using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IBugRepository
    {
        void Update(Bug bug);

        Task DeleteBugAsync(Bug bug);

        Task<bool> SaveAllAsync();
        
        Task<IEnumerable<Bug>> GetBugsAsync();

        Task<Bug> GetBugByIdAsync(int id);
        
        Task<Bug> GetBugAsync(string bugname);

        Task<IEnumerable<BugDto>> GetBugsDtoAsync();

        Task<BugDto> GetBugDtoByIdAsync(int id);

        Task<BugDto> GetBugDtoAsync(string bugname);
    }
}
