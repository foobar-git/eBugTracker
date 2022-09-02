using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        private string username;

        [Required]                  // marks this property (username) as required
        //public string Username { get; set; }
        public string Username {
            get {
                return FormatUsername(username);
            }
            set {
                username = value;
            }
        }

        [Required]                  // marks this property (password) as required
        [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; }


        // helper function for username formatting
        private string FormatUsername(string uname)
        {   // ? is checking if 'uname' is null
            if (uname?.Length > 0)
            {
                uname = uname.ToLower();
                uname = (char.ToUpper(uname[0])).ToString() + uname.Substring(1);
                Console.WriteLine(uname);
                return uname;
            } else {
                Console.WriteLine(uname);
                return null;
            }
        }
    }
}