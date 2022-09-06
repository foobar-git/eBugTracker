using API.Extensions;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
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
        
        //_EF_Migrations__________________________
        public Message Message { get; set; }
        public Comment Comment { get; set; }
        public ICollection<UserImage> UserImage { get; set; }    // one user - one (profile) image
        public Project Project { get; set; }
        //________________________________________

        public int GetMemberSince()
        {
            return DateCreated.CalculateTimeFromUserCreated();
        }
    }
}