using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using AutoMapper;

namespace API.Data
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly DataContext _context;

        private readonly IMapper _mapper;
        
        public ProjectRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<Project> GetProjectByIdAsync(int id)
        {
            return await _context.Projects.FindAsync(id);
        }

        public async Task<ProjectDto> GetProjectDtoByIdAsync(int id)
        {
            return await _context.Projects
                .ProjectTo<ProjectDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Project> GetProjectAsync(string projectname)
        {
            return await _context.Projects.Include(bug => bug.BugsAssigned).SingleOrDefaultAsync(project => project.Name == projectname);
        }

        public async Task<IEnumerable<Project>> GetProjectsAsync()
        {
            return await _context.Projects.Include(bug => bug.BugsAssigned).ToListAsync();
        }

        public async Task<IEnumerable<ProjectDto>> GetProjectsDtoAsync()
        {
            return await _context.Projects
                .ProjectTo<ProjectDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<ProjectDto> GetProjectDtoAsync(string projectname)
        {   
            return await _context.Projects
                .Where(p => p.Name == projectname)
                .ProjectTo<ProjectDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            // making sure that 'greater than zero' changes have been saved to the database
            // if something has been changed and saved, the returned value will be > 0.
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Project project)
        {
            // mark 'project' as 'modified'
            _context.Entry(project).State = EntityState.Modified;
        }

        public async Task DeleteProjectAsync(Project project)
        {
            await Task.Run( () => {
                _context.Projects.Remove(project);
            });
        }
    }
}