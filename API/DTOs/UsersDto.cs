using API.Entities;

namespace API.DTOs
{
    public class UsersDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        //====================================================================
        public string ImageUrl { get; set; }
        public int Created { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime LastActive { get; set; }
        public string UserType { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Team { get; set; }
        public string Description { get; set; }
        
        //_EF_Migrations__________________________
        public Message Message { get; set; }
        public Comment Comment { get; set; }
        public ICollection<UserImageDto> UserImage { get; set; }    // one user - one (profile) image
        public Project Project { get; set; }
        //________________________________________
    }
}