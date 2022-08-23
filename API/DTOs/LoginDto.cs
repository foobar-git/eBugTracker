using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class LoginDto
    {
        private string username;

        [Required] // marks this property (username) as required
        public string Username {
            get {
                return FormatUsername(username);
            }
            set {
                username = value;
            }
        }

        [Required] // marks this property (password) as required
        public string Password { get; set; }


        // helper function for username formatting
        private string FormatUsername(string uname)
        {
            if (username.Length > 0)
            {
                uname = uname.ToLower();
                uname = (char.ToUpper(uname[0])).ToString() + uname.Substring(1);
                return uname;
            } else {
                return null;
            }
        }
    }
}