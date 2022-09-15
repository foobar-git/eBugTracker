using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using API.HelperFunctions;

namespace API.DTOs
{
    public class RegisterDto
    {
        private string username;

        [Required]                  // marks this property (username) as required
        //public string Username { get; set; }
        public string Username {
            get {
                return FormatName.Format(username);
            }
            set {
                username = value;
            }
        }

        [Required]                  // marks this property (password) as required
        [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; }
    }
}