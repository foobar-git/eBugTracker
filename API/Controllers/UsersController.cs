using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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

    public class UsersController : BaseApiController
    {   
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        
        public UsersController(DataContext context, IUserRepository userRepository, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _userRepository = userRepository;
        }
        
        // API:     /api/users/
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsersDto>>> GetUsers()
        {
            IEnumerable<UsersDto> usersToReturn = await _userRepository.GetUsersDtoAsync();
            return Ok(usersToReturn);
        }
        
        // API:     /api/users/id/<int>
        [HttpGet("id/{id}")]
        public async Task<ActionResult<UsersDto>> GetUser(int id)  // v8
        {
            return await _userRepository.GetUserDtoByIdAsync(id);
        }

        // API:     /api/users/"username"
        [HttpGet("{username}")]
        public async Task<ActionResult<UsersDto>> GetUser(string username)
        {
            return _mapper.Map<UsersDto>(await _userRepository.GetUserDtoAsync(FormatName.Format(username)));
        }

        // API:     /api/users/
        [HttpPut]
        public async Task<ActionResult> UpdateUser(UserUpdateDto userUpdate)
        {
            // returns the username for the user from the token
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepository.GetUserAsync(username);

            _mapper.Map(userUpdate, user);
            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            //if the update fails:
            return BadRequest("Failed to update user.");
        }

        // API:     /api/users/id/<int>
        [HttpPut("id/{id}")]
        public async Task<ActionResult> UpdateUser([FromBody]UserUpdateDto editUser, [FromRoute]int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);

            _mapper.Map(editUser, user);
            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync()) return Ok();

            //if the update fails:
            return BadRequest("Failed to update user.");
        }
    }
}
