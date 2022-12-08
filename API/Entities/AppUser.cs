using API.Extensions;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        //====================================================================
        public DateTime DateCreated { get; set; } = DateTime.Now;   //  +
        public DateTime LastActive { get; set; } = DateTime.Now;    //  +
        public string UserType { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Team { get; set; }
        public string Description { get; set; }
        public string UserImage { get; set; }
        
        //_EF_Migrations__________________________
        //public Message Message { get; set; }
        public ICollection<Comment> Comments { get; set; }
        //________________________________________

        // public int GetCreated()
        // {
        //     return DateCreated.CalculateTimeFromUserCreated();
        // }
    }
}