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

        [HttpDelete("dua/{pid}/{uid}")]     // "dua" for delete users assigned (one entry)
        public async Task<ActionResult<IEnumerable<UsersAssigned>>> DeleteUA(int pid, int uid)
        {
            IEnumerable<UsersAssigned> usersAssignedToReturn = await _usersAssignedRepository.GetUsersAssignedAsync();
            
            var uaUser = usersAssignedToReturn.Where(ua => ua.ProjectId.Equals(pid) && ua.UserId.Equals(uid));
            int uaId = uaUser.ElementAt(0).Id;

            var ua = await _usersAssignedRepository.GetUsersAssignedByIdAsync(uaId);
            if (ua != null)
            {
                _usersAssignedRepository.DeleteUsersAssignedAsync(ua);
            }
            if (await _usersAssignedRepository.SaveAllAsync()) return Ok();
            //if the update failes:
            return BadRequest("Failed to remove user from project.");
        }
    }
}
