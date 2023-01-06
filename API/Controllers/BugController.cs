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
        private readonly IWebHostEnvironment _environment;

        public BugController(IBugRepository bugRepository, IWebHostEnvironment environment, DataContext context, IMapper mapper)
        {
            _bugRepository = bugRepository;
            _environment = environment;
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

        // API:     /api/bug/"bugname"
        [HttpGet("{bugname}")]
        public async Task<ActionResult<BugDto>> GetBug(string bugname)
        {
            return await _bugRepository.GetBugDtoAsync(FormatName.Format(bugname));
        }

        // v30
        /* [HttpDelete("db/{id}")]     // "db" for delete bug
        public async Task<ActionResult> DeleteBug(int id)
        {
            var bug = await _bugRepository.GetBugByIdAsync(id);
            if (bug != null)
            {
                _bugRepository.DeleteBugAsync(bug);
            }
            if (await _bugRepository.SaveAllAsync()) return Ok();
            //if the update failes:
            return BadRequest("Failed to delete bug.");
        } */

        // API:     /api/bug/db/"project_id"/"bug_id"
        [HttpDelete("db/{pid}/{bid}")]
        public async Task<ActionResult> DeleteBug([FromRoute]int pid, [FromRoute]int bid)
        {
            string dirChar = "//";                                  // identifier for directories
            if (OperatingSystem.IsWindows()) dirChar = "\\";
            string fileUploadDirectory = dirChar + "api" + dirChar + "upload" + dirChar + pid + dirChar;
            string bugDirectory = bid + dirChar;
            string pathToDir = _environment.WebRootPath + fileUploadDirectory + bugDirectory;
            
            var bug = await _bugRepository.GetBugByIdAsync(bid);
            if (bug != null)
            {
                if (Directory.Exists(pathToDir))
                {
                    System.IO.Directory.Delete(pathToDir, true);
                }
                await _bugRepository.DeleteBugAsync(bug);
            }
            
            if (await _bugRepository.SaveAllAsync()) return Ok();
            //if the update failes:
            return BadRequest("Failed to delete bug.");
        }

        // API:     /api/bug/<int>
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

        // v30
        /* [HttpPut("nb/")]            // "nb" for new bug
        public async Task<ActionResult> NewBug([FromBody]Bug newBug)
        {
            await _context.Bugs.AddAsync(newBug);

            if (await _bugRepository.SaveAllAsync()) return Ok();
            //if the save failes:
            return BadRequest("Failed to post new bug entry.");
        } */

        // API:     /api/bug/nb/"project_id"
        [HttpPut("nb/{pid}/")]
        public async Task<ActionResult> NewBug([FromRoute]int pid, [FromBody]Bug newBug)
        {
            string dirChar = "//";                                  // identifier for directories
            if (OperatingSystem.IsWindows()) dirChar = "\\";
            string fileUploadDirectory = dirChar + "api" + dirChar + "upload" + dirChar;
            string projectDirectory = pid + dirChar;

            await _context.Bugs.AddAsync(newBug);
            if (await _bugRepository.SaveAllAsync())
            {
                string bugDirectory = newBug.Id + dirChar;
                string pathToDir = _environment.WebRootPath + fileUploadDirectory + projectDirectory + bugDirectory;
                
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
            
            //if the save failes:
            return BadRequest("Failed to post new bug entry.");
        }
    }
}
