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

        /*public UserRepository(DataContext context)    // v11
        {
            _context = context;
        }*/
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

        public async Task<Project> GetProjectByProjectnameAsync(string projectname)
        {
            return await _context.Projects.Include(bug => bug.BugsAssigned)
                .SingleOrDefaultAsync(project => project.Name == projectname);
        }

        public async Task<IEnumerable<Project>> GetProjectAsync()
        {
            return await _context.Projects.Include(bug => bug.BugsAssigned).ToListAsync();
        }

        // public async Task<UsersDto> GetProjectAsync(string username)
        // {
        //     /*return await _context.Users               // v11
        //         .Where(u => u.UserName == username)
        //         .Select(user => new UsersDto
        //         {
        //             // manualy mapping the porperties that we need form the database
        //             //Id = user.Id,
        //             //Username = user.UserName,
        //             //...
        //             //. . .
        //         }).SingleOrDefaultAsync();*/
        // }

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
    }
}