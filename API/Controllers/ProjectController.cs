using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.HelperFunctions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    [AllowAnonymous]
    public class ProjectController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IProjectRepository _projectRepository;

        public ProjectController(IProjectRepository projectRepository, DataContext context)
        {
            _projectRepository = projectRepository;
            _context = context;
        }

        /*
        [HttpGet]   // synchronous
        public ActionResult<IEnumerable<AppUser>> GetUsers()
        {
            return _context.Users.ToList();
        }*/
        
        // API:     /api/projects/test/
        [HttpGet]   // asynchronous
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            IEnumerable<Project> projectsToReturn = await _projectRepository.GetProjectAsync();

            return Ok(projectsToReturn);
        }

        // API:     /api/projects/
        // [HttpGet]   // asynchronous
        // //public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        // public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        // {
        //     return await _context.Projects.ToListAsync();
        // }
        
        // API:     /api/projects/id/<int>
        [HttpGet("id/{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)  // v8
        {
            return await _context.Projects.FindAsync(id);
        }

        // [HttpGet("{projectname}")]
        // public async Task<ActionResult<AppUser>> GetUser(string username) // v9
        // public async Task<ActionResult<Project>> GetProject(string projectname)
        // {
        //     return await _projectRepository.GetProjectByProjectnameAsync(FormatName.Format(projectname)); // v9
        //     //AppUser user = await _userRepository.GetUserByUsernameAsync(FormatUsername.Format(username)); //v11
        // }
    }
}