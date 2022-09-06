using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        /*
        [HttpGet]   // synchronous
        public ActionResult<IEnumerable<AppUser>> GetUsers()
        {
            return _context.Users.ToList();
        }*/
        
        // API:     /api/users
        //[AllowAnonymous]              // v7
        [HttpGet]   // asynchronous
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }
        
        // API:     /api/users/<int>
        //[Authorize]                   // v7
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _context.Users.FindAsync(id);
        }
    }
}