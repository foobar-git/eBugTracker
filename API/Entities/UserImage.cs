using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("User_Image")]   // EF name created table: 'User_Images' instead of 'Photo'
    public class UserImage
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }    // TODO EDIT

        //_EF_Migrations__________________________
        public AppUser AppUser { get; set; }    // one user - one (profile) image
        //________________________________________
    }
}