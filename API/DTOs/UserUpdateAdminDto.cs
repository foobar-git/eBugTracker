using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UserUpdateAdminDto
    {
        public string Username { get; set; }
        public string ImageUrl { get; set; }
        //public int Created { get; set; }
        public string UserType { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Team { get; set; }
        public string Description { get; set; }
    }
}