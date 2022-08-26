using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ErrorController : BaseApiController
    {
        private readonly DataContext _context;
        public ErrorController(DataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret() {
            return "secret text";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound() {
            var foo = _context.Users.Find(-1);

            if (foo == null) return NotFound();

            return Ok(foo); // but if found, return what is found
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError() {
            var foo = _context.Users.Find(-1);
            var bar = foo.ToString();           // object to return (should be a null reference exception)

            return bar; // but if found, return what is found
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest() {
            return BadRequest("Bad request exception");
        }
    }
}