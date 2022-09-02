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
        private object error_input;
        private string error_string;
        
        public ErrorController(DataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            error_input = _context.Users.Find(-1);

            if (error_input == null) return NotFound();

            return Ok(error_input);     // but if found, return what is found
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            /*try       // v5
            {
                error_userInputAPI = _context.Users.Find(-1);
                error_string = error_userInputAPI.ToString();   // object to return (should be a null reference exception)

                return error_string;                            // but if found, return what is found
            } catch (Exception ex) {
                return StatusCode(500, "Exception:\n" + ex);
            }*/

            error_input = _context.Users.Find(-1);
            error_string = error_input.ToString();   // object to return (should be a null reference exception)

            return error_string;                      // but if found, return what is found
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("Bad request exception");
        }
    }
}