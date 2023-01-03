using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.HelperFunctions;
using API.Interfaces;
using AutoMapper;
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
        private readonly IMapper _mapper;

        public ProjectController(IProjectRepository projectRepository, DataContext context, IMapper mapper)
        {
            _projectRepository = projectRepository;
            _context = context;
            _mapper = mapper;
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

        // API:     /api/projects/"projectname"
        [HttpGet("{projectname}")]
        public async Task<ActionResult<ProjectDto>> GetProject(string projectname)
        {
            return await _projectRepository.GetProjectDtoAsync(FormatName.Format(projectname));
        }

        // API:     /api/projects/id/<int>
        [HttpPut("id/{id}")]
        public async Task<ActionResult> EditProject([FromBody]ProjectEditDto editProject, [FromRoute]int id)
        {
            var project = await _projectRepository.GetProjectByIdAsync(id);
            if (project != null)
            {
                _mapper.Map(editProject, project);
                _projectRepository.Update(project);
            }
            if (await _projectRepository.SaveAllAsync()) return Ok();
            //if the update failes:
            return BadRequest("Failed to edit project.");
        }
    }
}
