using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IBugImageRepository
    {
        void Update(BugImage bugImage);

        //void DeleteBugImageAsync(Bug bug);

        Task<bool> SaveAllAsync();
        
        Task<IEnumerable<BugImage>> GetBugImagesAsync();

        Task<BugImage> GetBugImageByIdAsync(int id);

        Task<IEnumerable<BugImageDto>> GetBugImagesDtoAsync();

        Task<BugImageDto> GetBugImageDtoByIdAsync(int id);
    }
}
