using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IProjectRepository
    {
        void Update(Project project);

        Task<bool> SaveAllAsync();
        
        Task<IEnumerable<Project>> GetProjectsAsync();

        Task<Project> GetProjectByIdAsync(int id);
        
        Task<Project> GetProjectAsync(string projectname);

        Task<IEnumerable<ProjectDto>> GetProjectsDtoAsync();

        Task<ProjectDto> GetProjectDtoByIdAsync(int id);

        Task<ProjectDto> GetProjectDtoAsync(string projectname);
    }
}
