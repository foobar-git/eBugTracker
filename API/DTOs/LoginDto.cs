using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class LoginDto
    {
        [Required] // marks this property (username) as required
        public string Username { get; set; }


        [Required] // marks this property (password) as required
        public string Password { get; set; }
    }
}