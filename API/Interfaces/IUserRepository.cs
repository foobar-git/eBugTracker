using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);

        Task<bool> SaveAllAsync();
        
        Task<IEnumerable<AppUser>> GetUsersAsync();

        Task<AppUser> GetUserByIdAsync(int id);
        
        Task<AppUser> GetUserAsync(string username);

        Task<IEnumerable<UsersDto>> GetUsersDtoAsync();

        Task<UsersDto> GetUserDtoByIdAsync(int id);

        Task<UsersDto> GetUserDtoAsync(string username);
    }
}
