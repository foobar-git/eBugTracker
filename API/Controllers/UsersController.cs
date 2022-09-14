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

    public class UsersController : BaseApiController
    {
        /*private readonly DataContext _context;        // v8
        public UsersController(DataContext context)
        {
            _context = context;
        }*/

        //private readonly IUserRepository _userRepository;         // v9
        /*public UsersController(IUserRepository userRepository)    // v9
        {
            _userRepository = userRepository;
        }*/
        
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        
        public UsersController(DataContext context, IUserRepository userRepository, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        /*
        [HttpGet]   // synchronous
        public ActionResult<IEnumerable<AppUser>> GetUsers()
        {
            return _context.Users.ToList();
        }*/
        
        // API:     /api/users/
        //[AllowAnonymous]              // v7
        [HttpGet]   // asynchronous
        //public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()  // v9
        public async Task<ActionResult<IEnumerable<UsersDto>>> GetUsers()
        {
            //return await _context.Users.ToListAsync();        // v8
            //return Ok(await _userRepository.GetUsersAsync());   // v9

            //IEnumerable<AppUser> users = await _userRepository.GetUsersAsync();           // v11
            //IEnumerable<UsersDto> usersToReturn = _mapper.Map<IEnumerable<UsersDto>>(users);  // v11

            IEnumerable<UsersDto> usersToReturn = await _userRepository.GetUsersDtoAsync();

            return Ok(usersToReturn);
        }
        
        // API:     /api/users/id/<int>
        //[Authorize]                   // v7
        [HttpGet("id/{id}")]             // v8
        public async Task<ActionResult<AppUser>> GetUser(int id)  // v8
        {
            return await _context.AppUsers.FindAsync(id);
        }

        [HttpGet("{username}")]
        //public async Task<ActionResult<AppUser>> GetUser(string username) /// v9
        public async Task<ActionResult<UsersDto>> GetUser(string username)
        {
            //return await _userRepository.GetUserByUsernameAsync(FormatUsername.Format(username)); // v9
            //AppUser user = await _userRepository.GetUserByUsernameAsync(FormatUsername.Format(username)); //v11
            return _mapper.Map<UsersDto>(await _userRepository.GetUserDtoAsync(FormatName.Format(username)));
        }
    }
}