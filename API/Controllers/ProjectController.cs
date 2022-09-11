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

    [Authorize]
    public class ProjectController : BaseApiController
    {
        private readonly DataContext _context;        // v8
        public ProjectController(DataContext context)
        {
            _context = context;
        }

        // private readonly IProjectRepository _projectRepository;         // v9
        // private readonly DataContext _context;
        // public ProjectController(IProjectRepository projectRepository, DataContext context)    // v9
        // {
        //     _projectRepository = projectRepository;
        //     _context = context;
        // }

        /*
        [HttpGet]   // synchronous
        public ActionResult<IEnumerable<AppUser>> GetUsers()
        {
            return _context.Users.ToList();
        }*/
        
        // API:     /api/...
        //[AllowAnonymous]              // v7
        /*[HttpGet("test")]   // asynchronous
        //public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()  // v9
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            return Ok(await _projectRepository.GetProjectsAsync());   // v9
        }*/
        
        // API:     /api/projects/<int>
        //[Authorize]                   // v7
        [HttpGet("id/{id}")]             // v8
        public async Task<ActionResult<Project>> GetProjects(int id)  // v8
        {
            //return await _context.Projects.FindAsync(id);
            return await _context.Projects.FindAsync(id);
        }

        /*[HttpGet("{projectname}")]//
        //public async Task<ActionResult<AppUser>> GetUser(string username) // v9
        public async Task<ActionResult<Project>> GetProjects(string projectname)
        {
            return await _projectRepository.GetProjectByProjectnameAsync(FormatName.Format(projectname)); // v9
            //AppUser user = await _userRepository.GetUserByUsernameAsync(FormatUsername.Format(username)); //v11
        }*/
    }
}