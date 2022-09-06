using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using API.HelperFunctions;

namespace API.DTOs
{
    public class LoginDto
    {
        private string username;

        [Required] // marks this property (username) as required
        public string Username {
            get {
                return FormatUsername.Format(username);
            }
            set {
                username = value;
            }
        }

        [Required] // marks this property (password) as required
        public string Password { get; set; }
    }
}