using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class BugEditDto
    {
        public string Name { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public DateTime DateResolved { get; set; } = DateTime.Now;
        public string Description { get; set; }
        public string ImageURL { get; set; }
        public bool Edited { get; set; }
        public bool IsResolved { get; set; }
        public bool IsActive { get; set; }
    }
}
