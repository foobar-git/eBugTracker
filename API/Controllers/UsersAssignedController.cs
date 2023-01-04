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
    public class UsersAssignedController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IUsersAssignedRepository _usersAssignedRepository;
        private readonly IMapper _mapper;

        public UsersAssignedController(IUsersAssignedRepository usersAssignedRepository, DataContext context, IMapper mapper)
        {
            _usersAssignedRepository = usersAssignedRepository;
            _context = context;
            _mapper = mapper;
        }
        
        // API:     /api/usersassigned
        [HttpGet]   // asynchronous
        public async Task<ActionResult<IEnumerable<UsersAssigned>>> GetUsersAssigned()
        {
            IEnumerable<UsersAssigned> usersAssignedToReturn = await _usersAssignedRepository.GetUsersAssignedAsync();

            return Ok(usersAssignedToReturn);
        }

        [HttpPut("nua/")]            // "nua" for new user assigned
        public async Task<ActionResult> NewUsersAssigned([FromBody]UsersAssigned newUA)
        {
            await _context.UsersAssigned.AddAsync(newUA);

            if (await _usersAssignedRepository.SaveAllAsync()) return Ok();
            //if the save failes:
            return BadRequest("Failed to post new 'users assigned' entry.");
        } 

        /* 
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
        } */
    }
}
