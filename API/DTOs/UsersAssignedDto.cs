using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UsersAssignedDto
    {
        public string Username { get; set; }
        public int UserId { get; set; }
        public string UserType { get; set; }
        public int ProjectId { get; set; }
    }
}