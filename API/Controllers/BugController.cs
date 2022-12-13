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
    public class BugController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IBugRepository _bugRepository;
        private readonly IMapper _mapper;

        public BugController(IBugRepository bugRepository, DataContext context, IMapper mapper)
        {
            _bugRepository = bugRepository;
            _context = context;
            _mapper = mapper;
        }
        
        // API:     /api/bug
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

        [HttpDelete("db/{id}")]     // "db" for delete bug
        public async Task<ActionResult> DeleteBug(int id)
        {
            var comment = await _bugRepository.GetBugByIdAsync(id);
            if (comment != null)
            {
                _bugRepository.DeleteBugAsync(comment);
            }
            if (await _bugRepository.SaveAllAsync()) return Ok();
            //if the update failes:
            return BadRequest("Failed to delete comment.");
        }

        [HttpPut("id/{id}")]
        public async Task<ActionResult> EditBug([FromBody]BugEditDto editBug, [FromRoute]int id)
        {
            var bug = await _bugRepository.GetBugByIdAsync(id);
            if (bug != null)
            {
                _mapper.Map(editBug, bug);
                _bugRepository.Update(bug);
            }
            if (await _bugRepository.SaveAllAsync()) return Ok();
            //if the update failes:
            return BadRequest("Failed to edit bug.");
        }

        [HttpPut("nb/")]            // "nb" for new bug
        public async Task<ActionResult> NewBug([FromBody]Bug newBug)
        {
            await _context.Bugs.AddAsync(newBug);

            if (await _bugRepository.SaveAllAsync()) return Ok();
            //if the save failes:
            return BadRequest("Failed to post new bug entry.");
        }
    }
}
