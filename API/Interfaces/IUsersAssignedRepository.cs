using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUsersAssignedRepository
    {
        void Update(UsersAssigned usersAssigned);

        Task<bool> SaveAllAsync();
        
        Task<IEnumerable<UsersAssigned>> GetUsersAssignedAsync();

        Task<UsersAssigned> GetUsersAssignedByIdAsync(int id);
        
        Task<UsersAssigned> GetUsersAssignedAsync(string username);
    }
}
