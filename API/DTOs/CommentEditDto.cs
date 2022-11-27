using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CommentEditDto
    {
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public string Content { get; set; }
        public bool Edited { get; set; }
    }
}
