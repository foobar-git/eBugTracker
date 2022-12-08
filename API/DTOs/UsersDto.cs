using API.Entities;

namespace API.DTOs
{
    public class UsersDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        //====================================================================
        public int Created { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public string UserType { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Team { get; set; }
        public string Description { get; set; }
        public string UserImage { get; set; }
        
        //_EF_Migrations__________________________
        //public Message Message { get; set; }
        public ICollection<CommentDto> Comments { get; set; }
        //________________________________________
    }
}