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
    public class BugController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IBugRepository _bugRepository;

        public BugController(IBugRepository bugRepository, DataContext context)
        {
            _bugRepository = bugRepository;
            _context = context;
        }
        
        // API:     /api/project
        [HttpGet]   // asynchronous
        public async Task<ActionResult<IEnumerable<BugDto>>> GetBugs()
        {
            IEnumerable<BugDto> bugsToReturn = await _bugRepository.GetBugsDtoAsync();

            return Ok(bugsToReturn);
        }
        
        // API:     /api/bug/id/<int>
        [HttpGet("id/{id}")]
        // public async Task<ActionResult<Bug>> GetBug(int id)  // v8
        // {
        //     return await _context.Bugs.FindAsync(id);
        // }
        public async Task<ActionResult<BugDto>> GetBug(int id)
        {
            return await _bugRepository.GetBugDtoByIdAsync(id);
        }

        [HttpGet("{bugname}")]
        public async Task<ActionResult<BugDto>> GetBug(string bugname)
        {
            return await _bugRepository.GetBugDtoAsync(FormatName.Format(bugname));
        }
    }
}
