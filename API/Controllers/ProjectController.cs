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
        private readonly IWebHostEnvironment _environment;

        public ProjectController(IProjectRepository projectRepository, DataContext context, IMapper mapper, IWebHostEnvironment environment)
        {
            _projectRepository = projectRepository;
            _context = context;
            _mapper = mapper;
            _environment = environment;
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
            //if the update fails:
            return BadRequest("Failed to edit project.");
        }

        // API:     /api/project/dp/"project_id"/                   // "dp" for delete project
        [HttpDelete("dp/{id}")]
        public async Task<ActionResult> DeleteProject([FromRoute]int id)
        {
            string dirChar = "//";                                  // identifier for directories
            if (OperatingSystem.IsWindows()) dirChar = "\\";
            string fileUploadDirectory = dirChar + "api" + dirChar + "upload" + dirChar;
            string projectDirectory = id + dirChar;
            string pathToDir = _environment.WebRootPath + fileUploadDirectory + projectDirectory;
            
            var project = await _projectRepository.GetProjectByIdAsync(id);
            if (project != null)
            {
                if (Directory.Exists(pathToDir))
                {
                    System.IO.Directory.Delete(pathToDir, true);
                }
                await _projectRepository.DeleteProjectAsync(project);
            }
            
            if (await _projectRepository.SaveAllAsync()) return Ok();
            //if the update fails:
            return BadRequest("Failed to delete project.");
        }

        // API:     /api/project/np/                                // "np" for new project
        [HttpPut("np/")]
        public async Task<ActionResult> NewProject([FromBody]Project newProject)
        {
            string dirChar = "//";                                  // identifier for directories
            if (OperatingSystem.IsWindows()) dirChar = "\\";
            string fileUploadDirectory = dirChar + "api" + dirChar + "upload" + dirChar;

            await _context.Projects.AddAsync(newProject);
            if (await _projectRepository.SaveAllAsync())
            {
                string projectDirectory = newProject.Id + dirChar;
                string pathToDir = _environment.WebRootPath + fileUploadDirectory + projectDirectory;
                
                if (!Directory.Exists(pathToDir))
                {
                    System.IO.Directory.CreateDirectory(pathToDir);
                    return Ok();
                }
                else 
                {
                    return BadRequest("Directory already exists.");
                }
            }
            
            //if the save fails:
            return BadRequest("Failed to create a new project.");
        }
    }
}
