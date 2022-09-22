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
        
        // API:     /api/project
        [HttpGet]   // asynchronous
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjects()
        {
            IEnumerable<ProjectDto> projectsToReturn = await _projectRepository.GetProjectsDtoAsync();

            return Ok(projectsToReturn);
        }
        
        // API:     /api/projects/id/<int>
        [HttpGet("id/{id}")]
        // public async Task<ActionResult<Project>> GetProject(int id)  // v8
        // {
        //     return await _context.Projects.FindAsync(id);
        // }
        public async Task<ActionResult<ProjectDto>> GetProject(int id)  // v8
        {
            return await _projectRepository.GetProjectDtoByIdAsync(id);
        }

        [HttpGet("{projectname}")]
        public async Task<ActionResult<ProjectDto>> GetProject(string projectname)
        {
            return await _projectRepository.GetProjectDtoAsync(FormatName.Format(projectname));
        }
    }
}
