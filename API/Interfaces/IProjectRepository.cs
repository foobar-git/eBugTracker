using API.Entities;

namespace API.Interfaces
{
    public interface IProjectRepository
    {
        void Update(Project project);

        Task<bool> SaveAllAsync();
        
        Task<IEnumerable<Project>> GetProjectsAsync();

        Task<Project> GetProjectByIdAsync(int id);
        
        Task<Project> GetProjectByProjectnameAsync(string projectname);
    }
}